import type { NextFunction, Request, Response } from 'express';
import type { AddNewIncidentData } from '../types/incident.types.js';
import { createNewIncident } from '../services/incident.service.js';

export async function addNewIncidentController(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = request.body as AddNewIncidentData;
    const newIncident = await createNewIncident(data);

    response.status(201).json({
      message: 'Incident added successfully',
      incident: newIncident,
    });
  } catch (error) {
    next(error);
  }
}
