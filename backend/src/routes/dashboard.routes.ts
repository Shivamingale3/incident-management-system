import { Router } from 'express';

const dashboardRouter = Router();

dashboardRouter.get('/', (_req, res) => {
  res.json({
    status: 'success',
    message: 'Dashboard',
  });
});

export default dashboardRouter;
