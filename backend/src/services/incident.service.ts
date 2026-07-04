import { db } from '../config/db.js';
import type { AddNewIncidentData } from '../types/incident.types.js';
import incidentIdGenerator from '../utils/incidentIdGenerator.js';
import { HttpException } from '../exceptions/http.exception.js';
import { logger } from '../utils/logger.js';
import type { Incident } from '@prisma/client';
import { IncidentSeverity, IncidentStatus } from '../constants/incident.constants.js';

export async function createNewIncident(incidentData: AddNewIncidentData): Promise<Incident> {
  try {
    if (!incidentData.title) {
      throw new HttpException(400, 'Incident title is required');
    }

    const incidentId = incidentIdGenerator();

    const newIncident = await db.incident.create({
      data: {
        incidentId,
        title: incidentData.title,
        description: incidentData.description ?? null,
        service: incidentData.service ?? null,
        severity: incidentData.severity ?? IncidentSeverity.LOW,
        status: incidentData.status ?? IncidentStatus.OPEN,
        assignee: incidentData.assignee ?? null,
      },
    });

    return newIncident;
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    logger.error(
      `Error creating new incident: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw new HttpException(500, 'Internal Server Error: Failed to create new incident');
  }
}
