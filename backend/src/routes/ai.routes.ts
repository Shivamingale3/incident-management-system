import { Router } from 'express';
import { createRateLimiter } from '../middlewares/rateLimiting.middleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import suggestSeverityValidationSchema from '../validationSchemas/suggestSeverity.schema.js';
import { suggestSeverityController } from '../controller/ai.controller.js';

const aiRouter = Router();

aiRouter.post(
  '/incident/suggest-severity',
  createRateLimiter('SUGGEST_SEVERITY'),
  validationMiddleware(suggestSeverityValidationSchema, 'body'),
  suggestSeverityController,
);

export default aiRouter;
