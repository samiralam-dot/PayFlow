import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `The requested path '${req.method} ${req.originalUrl}' does not exist on this server.`
    },
    correlationId: req.correlationId || 'unknown',
    timestamp: new Date().toISOString()
  });
};
