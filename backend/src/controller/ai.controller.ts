import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../lib/apiResponse.js';
import { aiService } from '../services/ai.service.js';

interface SuggestSeverityBody {
  title: string;
  description: string | null;
  service: string | null;
}

export async function suggestSeverityController(
  req: Request<unknown, unknown, SuggestSeverityBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = req.body;
    const response = await aiService.suggestSeverity(data);

    res.json(ApiResponse.success('Severity suggested successfully!', response));
  } catch (error) {
    next(error);
  }
}
