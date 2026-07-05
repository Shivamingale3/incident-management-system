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

export class AIService {
  async generate(prompt: string): Promise<string> {
    try {
      const response = await gemini.models.generateContent({
        model: env.GEMINI_MODEL,
        contents: prompt,
      });

      return response.text ?? '';
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 429) {
          throw new HttpException(429, 'AI service rate limit exceeded. Please try again later.');
        }
        throw new HttpException(
          502,
          'AI service is currently unavailable. Please try again later.',
        );
      }
      throw error;
    }
  }

  async suggestSeverity(input: {
    title: string;
    description?: string | null;
    service?: string | null;
  }): Promise<{
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
    reason: string;
  }> {
    const response = await this.generate(suggestSeverityPrompt(input));

    return parseAIResponse<{
      severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
      reason: string;
    }>(response);
  }

  async getIncidentAiInsights(incidentId: string): Promise<IncidentAiInsights> {
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
  ): Promise<IncidentAiInsights> {
    const response = await this.generate(
      getIncidentAiInsightsPrompt(title, description, service, severity, status),
    );

    const insights = parseAIResponse<IncidentAiInsights>(response);
    await updateIncidentAiInsights(incidentId, insights);
    return insights;
  }
}

export const aiService = new AIService();
