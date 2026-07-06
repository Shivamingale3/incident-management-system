import { describe, it, expect } from 'vitest';
import envSchema from '../../src/validationSchemas/env.schema.js';
import { addIncidentValidationSchema } from '../../src/validationSchemas/addIncident.schema.js';
import { getIncidentsByFilterValidationSchema } from '../../src/validationSchemas/getIncidentFilters.schema.js';
import getIncidentByIdValidationSchema from '../../src/validationSchemas/getIncidentById.schema.js';
import getIncidentAiInsightsSchema from '../../src/validationSchemas/getIncidentAiInsights.schema.js';
import suggestSeverityValidationSchema from '../../src/validationSchemas/suggestSeverity.schema.js';
import updateIncidentStatusValidationSchema from '../../src/validationSchemas/updateIncidentStatus.schema.js';
import updateIncidentSeverityValidationSchema from '../../src/validationSchemas/updateIncidentSeverity.schema.js';

describe('envSchema', () => {
  it('parses valid env with all required vars', () => {
    const result = envSchema.parse({
      APP_PORT: '5000',
      APP_ENV: 'development',
      DATABASE_URL: 'file:./dev.db',
      GEMINI_API_KEY: 'k',
      GEMINI_MODEL: 'gemini-2.0-flash',
    });
    expect(result.APP_PORT).toBe(5000); // coerced to number
    expect(result.APP_ENV).toBe('development');
  });

  it('coerces string APP_PORT to number', () => {
    const result = envSchema.parse({
      APP_PORT: '3000',
      APP_ENV: 'test',
      DATABASE_URL: 'file:./t.db',
      GEMINI_API_KEY: 'k',
      GEMINI_MODEL: 'm',
    });
    expect(result.APP_PORT).toBe(3000);
    expect(typeof result.APP_PORT).toBe('number');
  });

  it('rejects unknown APP_ENV value', () => {
    const result = envSchema.safeParse({
      APP_ENV: 'staging',
      DATABASE_URL: 'file:./t.db',
      GEMINI_API_KEY: 'k',
      GEMINI_MODEL: 'm',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing GEMINI_API_KEY', () => {
    const result = envSchema.safeParse({
      APP_ENV: 'development',
      DATABASE_URL: 'file:./t.db',
      GEMINI_MODEL: 'm',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing DATABASE_URL', () => {
    const result = envSchema.safeParse({
      APP_ENV: 'development',
      GEMINI_API_KEY: 'k',
      GEMINI_MODEL: 'm',
    });
    expect(result.success).toBe(false);
  });
});

describe('addIncidentValidationSchema', () => {
  const validInput = {
    title: 'API outage',
    incidentId: 'INC-ABC123',
    description: '<p>something broke</p>',
    service: 'api',
    severity: 'HIGH',
    status: 'OPEN',
    assignee: 'on-call',
  };

  it('parses a fully valid input', () => {
    const result = addIncidentValidationSchema.parse(validInput);
    expect(result.title).toBe('API outage');
    expect(result.incidentId).toBe('INC-ABC123');
    expect(result.severity).toBe('HIGH');
    expect(result.status).toBe('OPEN');
  });

  it('rejects empty title', () => {
    const r = addIncidentValidationSchema.safeParse({ ...validInput, title: '' });
    expect(r.success).toBe(false);
  });

  it('rejects title over 100 chars', () => {
    const r = addIncidentValidationSchema.safeParse({
      ...validInput,
      title: 'x'.repeat(101),
    });
    expect(r.success).toBe(false);
  });

  it('rejects incidentId that does not start with INC', () => {
    const r = addIncidentValidationSchema.safeParse({
      ...validInput,
      incidentId: 'ABC-123',
    });
    expect(r.success).toBe(false);
  });

  it('rejects invalid severity enum', () => {
    const r = addIncidentValidationSchema.safeParse({
      ...validInput,
      severity: 'URGENT',
    });
    expect(r.success).toBe(false);
  });

  it('rejects invalid status enum', () => {
    const r = addIncidentValidationSchema.safeParse({
      ...validInput,
      status: 'DONE',
    });
    expect(r.success).toBe(false);
  });

  it('accepts missing optional severity/status', () => {
    const r = addIncidentValidationSchema.safeParse({
      title: 't',
      incidentId: 'INC-1',
    });
    expect(r.success).toBe(true);
  });

  it('treats blank description (after stripHtml) as null', () => {
    const r = addIncidentValidationSchema.parse({
      ...validInput,
      description: '<p></p>',
    });
    expect(r.description).toBeNull();
  });

  it('rejects non-null description whose cleaned content is < 5 chars', () => {
    const r = addIncidentValidationSchema.safeParse({
      ...validInput,
      description: '<p>ab</p>',
    });
    expect(r.success).toBe(false);
  });

  it('accepts description with exactly 5 cleaned chars', () => {
    const r = addIncidentValidationSchema.safeParse({
      ...validInput,
      description: '<p>abcde</p>',
    });
    expect(r.success).toBe(true);
  });
});

describe('getIncidentsByFilterValidationSchema', () => {
  it('applies default pageNo=1 and pageSize=10 when omitted', () => {
    const r = getIncidentsByFilterValidationSchema.parse({});
    expect(r.pageNo).toBe(1);
    expect(r.pageSize).toBe(10);
  });

  it('coerces string pageSize to number', () => {
    const r = getIncidentsByFilterValidationSchema.parse({ pageSize: '50' });
    expect(r.pageSize).toBe(50);
    expect(typeof r.pageSize).toBe('number');
  });

  it('coerces string pageNo to number', () => {
    const r = getIncidentsByFilterValidationSchema.parse({ pageNo: '3' });
    expect(r.pageNo).toBe(3);
  });

  it('rejects pageSize < 1', () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ pageSize: '0' });
    expect(r.success).toBe(false);
  });

  it('rejects pageSize > 100', () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ pageSize: '101' });
    expect(r.success).toBe(false);
  });

  it('rejects pageSize NaN', () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ pageSize: 'abc' });
    expect(r.success).toBe(false);
  });

  it('rejects pageNo < 1', () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ pageNo: '0' });
    expect(r.success).toBe(false);
  });

  it('rejects invalid status enum', () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ status: 'DONE' });
    expect(r.success).toBe(false);
  });

  it('rejects invalid severity enum', () => {
    const r = getIncidentsByFilterValidationSchema.safeParse({ severity: 'URGENT' });
    expect(r.success).toBe(false);
  });

  it('accepts valid status + severity + searchQuery', () => {
    const r = getIncidentsByFilterValidationSchema.parse({
      status: 'OPEN',
      severity: 'LOW',
      searchQuery: 'db',
    });
    expect(r.status).toBe('OPEN');
    expect(r.severity).toBe('LOW');
    expect(r.searchQuery).toBe('db');
  });
});

describe('getIncidentByIdValidationSchema', () => {
  it('accepts a non-empty id', () => {
    const r = getIncidentByIdValidationSchema.parse({ id: '01ABC' });
    expect(r.id).toBe('01ABC');
  });

  it('rejects missing id', () => {
    const r = getIncidentByIdValidationSchema.safeParse({});
    expect(r.success).toBe(false);
  });
});

describe('getIncidentAiInsightsSchema', () => {
  it('accepts a non-empty incidentId', () => {
    const r = getIncidentAiInsightsSchema.parse({ incidentId: '01ABC' });
    expect(r.incidentId).toBe('01ABC');
  });

  it('rejects missing incidentId', () => {
    const r = getIncidentAiInsightsSchema.safeParse({});
    expect(r.success).toBe(false);
  });
});

describe('suggestSeverityValidationSchema', () => {
  const valid = {
    title: 'DB down',
    description: '<p>production is down</p>',
    service: 'postgres',
  };

  it('parses a valid body', () => {
    const r = suggestSeverityValidationSchema.parse(valid);
    expect(r.title).toBe('DB down');
    expect(r.service).toBe('postgres');
  });

  it('rejects empty title', () => {
    const r = suggestSeverityValidationSchema.safeParse({ ...valid, title: '' });
    expect(r.success).toBe(false);
  });

  it('rejects title > 100 chars', () => {
    const r = suggestSeverityValidationSchema.safeParse({
      ...valid,
      title: 'x'.repeat(101),
    });
    expect(r.success).toBe(false);
  });

  it('rejects description cleaned content < 5 chars', () => {
    const r = suggestSeverityValidationSchema.safeParse({
      ...valid,
      description: '<p>ab</p>',
    });
    expect(r.success).toBe(false);
  });

  it('accepts missing optional service', () => {
    const r = suggestSeverityValidationSchema.safeParse({
      title: 'DB down',
      description: '<p>production is down</p>',
    });
    expect(r.success).toBe(true);
  });
});

describe('updateIncidentStatusValidationSchema', () => {
  it('parses a valid status update', () => {
    const r = updateIncidentStatusValidationSchema.parse({
      incidentId: '01ABC',
      status: 'RESOLVED',
    });
    expect(r.incidentId).toBe('01ABC');
    expect(r.status).toBe('RESOLVED');
  });

  it('trims whitespace on incidentId', () => {
    const r = updateIncidentStatusValidationSchema.parse({
      incidentId: '  01ABC  ',
      status: 'OPEN',
    });
    expect(r.incidentId).toBe('01ABC');
  });

  it('rejects empty incidentId', () => {
    const r = updateIncidentStatusValidationSchema.safeParse({
      incidentId: '',
      status: 'OPEN',
    });
    expect(r.success).toBe(false);
  });

  it('rejects invalid status enum', () => {
    const r = updateIncidentStatusValidationSchema.safeParse({
      incidentId: '01ABC',
      status: 'DONE',
    });
    expect(r.success).toBe(false);
  });
});

describe('updateIncidentSeverityValidationSchema', () => {
  it('parses a valid severity update', () => {
    const r = updateIncidentSeverityValidationSchema.parse({
      incidentId: '01ABC',
      severity: 'CRITICAL',
    });
    expect(r.incidentId).toBe('01ABC');
    expect(r.severity).toBe('CRITICAL');
  });

  it('rejects empty incidentId', () => {
    const r = updateIncidentSeverityValidationSchema.safeParse({
      incidentId: '',
      severity: 'LOW',
    });
    expect(r.success).toBe(false);
  });

  it('rejects invalid severity enum', () => {
    const r = updateIncidentSeverityValidationSchema.safeParse({
      incidentId: '01ABC',
      severity: 'URGENT',
    });
    expect(r.success).toBe(false);
  });
});
