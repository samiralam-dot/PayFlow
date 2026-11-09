import { Router } from 'express';

export const apiV1Router = Router();

apiV1Router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'PayFlow V4 API Engine is operational',
    version: '4.0.0',
    correlationId: req.correlationId,
    timestamp: new Date().toISOString()
  });
});
