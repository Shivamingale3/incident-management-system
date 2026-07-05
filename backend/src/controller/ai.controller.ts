import type { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../lib/apiResponse.js';
import { aiService } from '../services/ai.service.js';
import type { SuggestSeverityBody } from '../interfaces/incident.interfaces.js';
import { getIncidentById } from '../services/incident.service.js';
import type { IncidentSeverityType, IncidentStatusType } from '../types/incident.types.js';

export async function suggestSeverityController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = req.body as SuggestSeverityBody;
    const response = await aiService.suggestSeverity(data);

    res.json(ApiResponse.success('Severity suggested successfully!', response));
  } catch (error) {
    next(error);
  }
}

export async function getIncidentAiInsightsController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { incidentId } = req.params as { incidentId: string };
    const response = await aiService.getIncidentAiInsights(incidentId);

    res.json(ApiResponse.success('Severity suggested successfully!', response));
  } catch (error) {
    next(error);
  }
}

export async function regenerateIncidentAiInsightsController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { incidentId } = req.params as { incidentId: string };
    const incident = await getIncidentById(incidentId);
    const response = await aiService.generateIncidentAiInsights(
      incident.id,
      incident.title,
      incident.description,
      incident.service,
      incident.severity as IncidentSeverityType,
      incident.status as IncidentStatusType,
    );

    res.json(ApiResponse.success('Severity suggested successfully!', response));
  } catch (error) {
    next(error);
  }
}
