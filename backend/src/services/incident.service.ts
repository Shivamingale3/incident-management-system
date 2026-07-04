import { db } from '../config/db.js';
import type { AddNewIncidentData, GetIncidentsByFilter } from '../types/incident.types.js';
import { HttpException } from '../exceptions/http.exception.js';
import { logger } from '../utils/logger.js';
import { type Incident, type Prisma } from '@prisma/client';
import { IncidentSeverity, IncidentStatus } from '../constants/incident.constants.js';
import type { GetIncidentsByFilterResponse } from '../interfaces/incident.interfaces.js';

export async function createNewIncident(incidentData: AddNewIncidentData): Promise<Incident> {
  try {
    if (!incidentData.title) {
      throw new HttpException(400, 'Incident title is required');
    }

    const existingIncidentId = await db.incident.findUnique({
      where: { incidentId: incidentData.incidentId },
      select: { id: true },
    });

    if (existingIncidentId) {
      throw new HttpException(409, 'Incident with this ID already exists');
    }

    const newIncident = await db.incident.create({
      data: {
        incidentId: incidentData.incidentId,
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

export async function getAllIncidentsByFilter(
  filters: GetIncidentsByFilter,
): Promise<GetIncidentsByFilterResponse> {
  const { pageNo, pageSize, searchQuery, status, severity } = filters;
  const skip = (pageNo - 1) * pageSize;

  const conditions: Prisma.IncidentWhereInput[] = [];

  if (searchQuery) {
    const searchTerm = searchQuery.trim();
    conditions.push({
      OR: [
        { title: { contains: searchTerm } },
        { description: { contains: searchTerm } },
        { incidentId: { contains: searchTerm } },
      ],
    });
  }

  if (status) {
    conditions.push({ status });
  }

  if (severity) {
    conditions.push({ severity });
  }

  const where: Prisma.IncidentWhereInput = conditions.length > 0 ? { AND: conditions } : {};

  try {
    const [incidents, total] = await Promise.all([
      db.incident.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      db.incident.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data: incidents,
      page: pageNo,
      totalPages,
      total,
      pageSize,
    };
  } catch (error) {
    logger.error(
      `Error fetching incidents: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw new HttpException(500, 'Internal Server Error: Failed to fetch incidents');
  }
}
