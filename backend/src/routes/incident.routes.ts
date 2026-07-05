import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { addIncidentValidationSchema } from '../validationSchemas/addIncident.schema.js';
import {
  addNewIncidentController,
  getAllIncidentsByFilterController,
  getIncidentByIdController,
  updateIncidentSeverityController,
  updateIncidentStatusController,
} from '../controller/incident.controller.js';
import { getIncidentsByFilterValidationSchema } from '../validationSchemas/getIncidentFilters.schema.js';
import updateIncidentStatusValidationSchema from '../validationSchemas/updateIncidentStatus.schema.js';
import updateIncidentSeverityValidationSchema from '../validationSchemas/updateIncidentSeverity.schema.js';
import getIncidentByIdValidationSchema from '../validationSchemas/getIncidentById.schema.js';

const incidentRouter = Router();

incidentRouter.get(
  '/filter',
  validationMiddleware(getIncidentsByFilterValidationSchema, 'query'),
  getAllIncidentsByFilterController,
);

incidentRouter.get(
  '/:id',
  validationMiddleware(getIncidentByIdValidationSchema, 'params'),
  getIncidentByIdController,
);

incidentRouter.patch(
  '/:incidentId/status/:status',
  validationMiddleware(updateIncidentStatusValidationSchema, 'params'),
  updateIncidentStatusController,
);

incidentRouter.patch(
  '/:incidentId/severity/:severity',
  validationMiddleware(updateIncidentSeverityValidationSchema, 'params'),
  updateIncidentSeverityController,
);

incidentRouter.post(
  '/',
  validationMiddleware(addIncidentValidationSchema),
  addNewIncidentController,
);

export default incidentRouter;
