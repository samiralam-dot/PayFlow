import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare global {
  namespace Express {
    interface Request {
      correlationId: string;
    }
  }
}

export const correlationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const correlationId = (req.header('X-Correlation-Id') || uuidv4()) as string;
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-Id', correlationId);
  next();
};
