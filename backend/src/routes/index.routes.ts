import { Router } from 'express';
import dashboardRouter from './dashboard.routes.js';
import healthRouter from './health.routes.js';

export const router = Router();

router.use('/health', healthRouter);
router.use('/dashboard', dashboardRouter);
