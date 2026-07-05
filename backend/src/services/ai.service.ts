import { ApiError } from '@google/genai';
import { env } from '../config/env.config.js';
import gemini from '../config/gemini.config.js';
import { HttpException } from '../exceptions/http.exception.js';
import { suggestSeverityPrompt } from '../lib/aiPrompts.js';
import { parseAIResponse } from '../utils/ai.utils.js';

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
          throw new HttpException(
            429,
            'AI service rate limit exceeded. Please try again later.',
          );
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
}

export const aiService = new AIService();
