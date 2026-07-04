import type { NextFunction, Request, Response } from 'express';
import type { AddNewIncidentData } from '../types/incident.types.js';
import { createNewIncident, getAllIncidentsByFilter } from '../services/incident.service.js';
import { ApiResponse } from '../lib/apiResponse.js';
import { getIncidentsByFilterValidationSchema } from '../validations/getIncidentFilters.schema.js';

export async function addNewIncidentController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = request.body as AddNewIncidentData;
    await createNewIncident(data);
    response.status(201).json(ApiResponse.success('Incident created successfully', null));
  } catch (error) {
    next(error);
  }
}

export async function getAllIncidentsByFilterController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const filters = getIncidentsByFilterValidationSchema.parse(request.query);
    const result = await getAllIncidentsByFilter(filters);
    response.status(200).json(ApiResponse.success('Incidents fetched successfully', result));
  } catch (error) {
    next(error);
  }
}
