import type { addIncidentValidationSchema } from '../validations/incident.schema.js';
import type z from 'zod';
import { type IncidentSeverity, type IncidentStatus } from '../constants/incident.constants.js';

export type AddNewIncidentData = z.infer<typeof addIncidentValidationSchema>;

export type IncidentSeverityType = (typeof IncidentSeverity)[keyof typeof IncidentSeverity];

export type IncidentStatusType = (typeof IncidentStatus)[keyof typeof IncidentStatus];
