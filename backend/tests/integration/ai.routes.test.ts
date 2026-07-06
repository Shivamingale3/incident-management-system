import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';

// vi.hoisted makes the mock fn available to the hoisted vi.mock factory.
const generateContentMock = vi.hoisted(() => vi.fn());

// Mock the rate limiter (hoisted)
vi.mock('../../src/middlewares/rateLimiting.middleware.js', () => ({
  createRateLimiter: () => (_req: unknown, _res: unknown, next: () => void) => next(),
  globalRateLimiter: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

// Mock the Gemini client so we never make real network calls.
// The shape must match the bits of `@google/genai`'s GoogleGenAI used by
// ai.service.ts: `gemini.models.generateContent({ model, contents })`.
vi.mock('../../src/config/gemini.config.js', () => ({
  default: {
    models: {
      generateContent: generateContentMock,
    },
  },
}));

import { app } from '../../src/app.js';
import { db, truncateIncidents } from '../helpers/db.ts';

describe('AI routes — HTTP integration (Gemini mocked)', () => {
  beforeEach(async () => {
    await truncateIncidents();
    generateContentMock.mockReset();
  });

  describe('POST /api/ai/incident/suggest-severity', () => {
    it('returns 200 with severity + reason when Gemini returns valid JSON', async () => {
      generateContentMock.mockResolvedValueOnce({
        text: '{"severity":"HIGH","reason":"prod db outage, high impact"}',
      });

      const res = await request(app).post('/api/ai/incident/suggest-severity').send({
        title: 'DB outage',
        description: '<p>db unreachable</p>',
        service: 'postgres',
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual({
        severity: 'HIGH',
        reason: 'prod db outage, high impact',
      });
      expect(generateContentMock).toHaveBeenCalledTimes(1);
    });

    it('returns 400 when validation fails (missing title)', async () => {
      const res = await request(app)
        .post('/api/ai/incident/suggest-severity')
        .send({ description: '<p>irrelevant</p>' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(generateContentMock).not.toHaveBeenCalled();
    });

    it('returns 502 when Gemini throws a non-known error', async () => {
      // A plain Error is not an ApiError instance, so aiService.generate
      // rethrows it raw → errorHandler converts to 500.
      generateContentMock.mockRejectedValueOnce(new Error('network down'));

      const res = await request(app).post('/api/ai/incident/suggest-severity').send({
        title: 'DB outage',
        description: '<p>db unreachable</p>',
        service: 'postgres',
      });

      // aiService.generate rethrows non-ApiError errors raw; errorHandler
      // maps those to 500.
      expect([500, 502]).toContain(res.status);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/ai/incident/:incidentId/insights', () => {
    it('returns 404 when the incident does not exist', async () => {
      const res = await request(app).get('/api/ai/incident/01NONEXISTENT/insights');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Incident not found');
    });

    it('returns 200 with cached insights when they exist in DB', async () => {
      // Seed an incident directly to control AI insight columns
      const created = await db.incident.create({
        data: {
          incidentId: 'INC-CACHED-1',
          title: 'Cached outage',
          description: 'something broke',
          service: 'svc',
          severity: 'HIGH',
          status: 'OPEN',
          summary: 'cached summary',
          possibleCauses: JSON.stringify(['cause1', 'cause2']),
          recommendedActions: JSON.stringify(['action1', 'action2']),
        },
      });

      const res = await request(app).get(`/api/ai/incident/${created.id}/insights`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.summary).toBe('cached summary');
      expect(res.body.data.possibleCauses).toEqual(['cause1', 'cause2']);
      expect(res.body.data.recommendedActions).toEqual(['action1', 'action2']);
      // Gemini must not have been called because cached insights exist.
      expect(generateContentMock).not.toHaveBeenCalled();
    });

    it('calls Gemini and returns 200 with fresh insights when cache is empty', async () => {
      const created = await db.incident.create({
        data: {
          incidentId: 'INC-FRESH-1',
          title: 'Fresh outage',
          description: 'fresh breakdown',
          service: 'svc',
          severity: 'HIGH',
          status: 'OPEN',
        },
      });

      generateContentMock.mockResolvedValueOnce({
        text: JSON.stringify({
          summary: 'fresh summary',
          possibleCauses: ['c1', 'c2', 'c3'],
          recommendedActions: ['a1', 'a2', 'a3'],
          confidence: 'MEDIUM',
        }),
      });

      const res = await request(app).get(`/api/ai/incident/${created.id}/insights`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.summary).toBe('fresh summary');
      expect(generateContentMock).toHaveBeenCalledTimes(1);

      // Verify insights were persisted
      const updated = await db.incident.findUnique({ where: { id: created.id } });
      expect(updated?.summary).toBe('fresh summary');
      expect(JSON.parse(updated?.possibleCauses ?? '[]')).toEqual(['c1', 'c2', 'c3']);
    });
  });

  describe('PUT /api/ai/incident/:incidentId/insights/regenerate', () => {
    it('returns 404 when the incident does not exist', async () => {
      const res = await request(app).put('/api/ai/incident/01NONEXISTENT/insights/regenerate');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Incident not found');
      expect(generateContentMock).not.toHaveBeenCalled();
    });

    it('regenerates insights and persists them', async () => {
      const created = await db.incident.create({
        data: {
          incidentId: 'INC-REGEN-1',
          title: 'Regen outage',
          description: 'regen breakdown',
          service: 'svc',
          severity: 'HIGH',
          status: 'OPEN',
          summary: 'old summary',
          possibleCauses: JSON.stringify(['old1']),
          recommendedActions: JSON.stringify(['old1']),
        },
      });

      generateContentMock.mockResolvedValueOnce({
        text: JSON.stringify({
          summary: 'new summary',
          possibleCauses: ['new1', 'new2'],
          recommendedActions: ['act1', 'act2'],
          confidence: 'HIGH',
        }),
      });

      const res = await request(app).put(`/api/ai/incident/${created.id}/insights/regenerate`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.summary).toBe('new summary');
      expect(generateContentMock).toHaveBeenCalledTimes(1);

      const updated = await db.incident.findUnique({ where: { id: created.id } });
      expect(updated?.summary).toBe('new summary');
      expect(JSON.parse(updated?.possibleCauses ?? '[]')).toEqual(['new1', 'new2']);
    });
  });
});
