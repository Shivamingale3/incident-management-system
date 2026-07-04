import z from 'zod';

export const addIncidentValidationSchema = z.object({
  title: z
    .string('Title is required')
    .min(1, 'Title is too short, must be at least 1 characters')
    .max(100, 'Title is too long, must not exceed 100 characters'),
  incidentId: z
    .string('Incident ID is missing')
    .startsWith('INC', 'Invalid Incident ID')
    .nonoptional(),
  description: z
    .string('Description must be a string')
    .min(5, 'Description is too short, must be at least 5 characters')
    .max(500, 'Description is too long, must not exceed 500 characters')
    .nullish(),

  service: z
    .string('Service must be a string')
    .min(1, 'Service name must be at least 1 characters')
    .max(100, 'Service name must not exceed 100 characters')
    .nullish(),

  severity: z
    .enum(
      ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      'Severity must be one of the following: LOW, MEDIUM, HIGH, or CRITICAL',
    )
    .optional(),

  status: z
    .enum(
      ['OPEN', 'INVESTIGATING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
      'Status must be one of the following: OPEN, INVESTIGATING, IN_PROGRESS, RESOLVED, CLOSED',
    )
    .optional(),

  assignee: z
    .string('Assignee must be a string')
    .min(1, 'Assignee name must be at least 1 character')
    .max(100, 'Assignee name must not exceed 100 characters')
    .nullish(),
});
