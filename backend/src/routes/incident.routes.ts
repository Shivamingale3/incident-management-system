import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { addIncidentValidationSchema } from '../validations/addIncident.schema.js';
import {
  addNewIncidentController,
  getAllIncidentsByFilterController,
} from '../controller/incident.controller.js';
import { getIncidentsByFilterValidationSchema } from '../validations/getIncidentFilters.schema.js';

const incidentRouter = Router();

incidentRouter.get(
  '/filter',
  validationMiddleware(getIncidentsByFilterValidationSchema, 'query'),
  getAllIncidentsByFilterController,
);

incidentRouter.post(
  '/',
  validationMiddleware(addIncidentValidationSchema),
  addNewIncidentController,
);

export default incidentRouter;
