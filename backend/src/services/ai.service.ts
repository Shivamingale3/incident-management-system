import { ApiError } from '@google/genai';
import { env } from '../config/env.config.js';
import gemini from '../config/gemini.config.js';
import { HttpException } from '../exceptions/http.exception.js';
import { getIncidentAiInsightsPrompt, suggestSeverityPrompt } from '../lib/aiPrompts.js';
import { parseAIResponse } from '../utils/ai.utils.js';
import type { IncidentSeverityType, IncidentStatusType } from '../types/incident.types.js';
import type { IncidentAiInsights } from '../interfaces/incident.interfaces.js';
import {
  getCachedIncidentAiInsights,
  getIncidentById,
  updateIncidentAiInsights,
} from './incident.service.js';

function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'AbortError' ||
      // @google/genai wraps the abort as a DOMException with name 'AbortError'
      // through AbortSignal; the SDK may also surface a generic Error with the
      // abort message — cover both shapes.
      error.message.toLowerCase().includes('aborted'))
  );
}

/**
 * The @google/genai SDK, when its internal p-retry loop encounters a
 * retryable HTTP status (429, 5xx), throws a plain `Error` whose message
 * is shaped like `Retryable HTTP Error: <statusText>` BEFORE any `ApiError`
 * wrapping happens. We match those by statusText so the user sees a
 * structured 429/502 JSON response instead of an opaque 500.
 */
function classifySdkHttpError(error: unknown): HttpException | null {
  if (!(error instanceof Error)) return null;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const message = error.message ?? '';
  if (!message.includes('Retryable HTTP Error')) return null;

  if (message.includes('Too Many Requests')) {
    return new HttpException(429, 'AI service rate limit exceeded. Please try again later.');
  }
  // Any other retryable upstream status (Bad Gateway, Service Unavailable, etc.)
  return new HttpException(502, 'AI service is currently unavailable. Please try again later.');
}

export class AIService {
  /**
   * Calls Gemini with the given prompt. The optional `signal` lets callers
   * cancel the in-flight request when the upstream client disconnects —
   * preventing orphaned Gemini calls that would otherwise keep consuming
   * the rate-limit bucket at Google's side and produce surprise 429s on the
   * user's next attempt.
   */
  async generate(prompt: string, signal?: AbortSignal): Promise<string> {
    try {
      const response = await gemini.models.generateContent({
        model: env.GEMINI_MODEL,
        contents: prompt,
        ...(signal ? { config: { abortSignal: signal } } : {}),
      });

      return response.text ?? '';
    } catch (error) {
      // Client disconnected (nginx 504'd, user navigated away, etc.).
      // Surface a 499 (nginx convention for "client closed request") so
      // logs make the cause obvious; the response is a no-op since the
      // socket is already gone.
      if (isAbortError(error)) {
        throw new HttpException(499, 'Client closed request');
      }

      // Classic @google/genai ApiError path (status code already parsed).
      if (error instanceof ApiError) {
        if (error.status === 429) {
          throw new HttpException(429, 'AI service rate limit exceeded. Please try again later.');
        }
        throw new HttpException(
          502,
          'AI service is currently unavailable. Please try again later.',
        );
      }

      // SDK "Retryable HTTP Error: <statusText>" plain-Error path
      // (thrown from inside p-retry's runFetch before ApiError wrapping).
      const sdkHttpError = classifySdkHttpError(error);
      if (sdkHttpError) {
        throw sdkHttpError;
      }
      throw error;
    }
  }

  async suggestSeverity(
    input: {
      title: string;
      description?: string | null;
      service?: string | null;
    },
    signal?: AbortSignal,
  ): Promise<{
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
    reason: string;
  }> {
    const response = await this.generate(suggestSeverityPrompt(input), signal);

    return parseAIResponse<{
      severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
      reason: string;
    }>(response);
  }

  async getIncidentAiInsights(
    incidentId: string,
    signal?: AbortSignal,
  ): Promise<IncidentAiInsights> {
    let insights = await getCachedIncidentAiInsights(incidentId);
    if (insights !== null) {
      return insights;
    }
    const incident = await getIncidentById(incidentId);
    insights = await this.generateIncidentAiInsights(
      incident.id,
      incident.title,
      incident.description,
      incident.service,
      incident.severity as IncidentSeverityType,
      incident.status as IncidentStatusType,
      signal,
    );
    return insights;
  }

  async generateIncidentAiInsights(
    incidentId: string,
    title: string,
    description: string | null,
    service: string | null,
    severity: IncidentSeverityType,
    status: IncidentStatusType,
    signal?: AbortSignal,
  ): Promise<IncidentAiInsights> {
    const response = await this.generate(
      getIncidentAiInsightsPrompt(title, description, service, severity, status),
      signal,
    );

    const insights = parseAIResponse<IncidentAiInsights>(response);
    await updateIncidentAiInsights(incidentId, insights);
    return insights;
  }
}

export const aiService = new AIService();
