import type { addIncidentValidationSchema } from '../validations/addIncident.schema.js';
import type z from 'zod';
import { type IncidentSeverity, type IncidentStatus } from '../constants/incident.constants.js';
import type { getIncidentsByFilterValidationSchema } from '../validations/getIncidentFilters.schema.js';

export type AddNewIncidentData = z.infer<typeof addIncidentValidationSchema>;

export type IncidentSeverityType = (typeof IncidentSeverity)[keyof typeof IncidentSeverity];

export type IncidentStatusType = (typeof IncidentStatus)[keyof typeof IncidentStatus];

export type GetIncidentsByFilter = z.infer<typeof getIncidentsByFilterValidationSchema>;
