import type { NextFunction, Request, Response } from 'express';
import type {
  AddNewIncidentData,
  GetIncidentsByFilter,
  IncidentSeverityType,
  IncidentStatusType,
} from '../types/incident.types.js';
import {
  createNewIncident,
  getAllIncidentsByFilter,
  updateIncidentSeverity,
  updateIncidentStatus,
} from '../services/incident.service.js';
import { ApiResponse } from '../lib/apiResponse.js';

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
    const filters = request.query as unknown as GetIncidentsByFilter;
    const result = await getAllIncidentsByFilter(filters);
    response.status(200).json(ApiResponse.success('Incidents fetched successfully', result));
  } catch (error) {
    next(error);
  }
}

export async function updateIncidentStatusController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { incidentId, status } = request.params;
    await updateIncidentStatus(incidentId as string, status as IncidentStatusType);
    response.status(200).json(ApiResponse.success('Incident status updated successfully', null));
  } catch (error) {
    next(error);
  }
}

export async function updateIncidentSeverityController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { incidentId, severity } = request.params;
    await updateIncidentSeverity(incidentId as string, severity as IncidentSeverityType);
    response.status(200).json(ApiResponse.success('Incident status updated successfully', null));
  } catch (error) {
    next(error);
  }
}
