import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { register } from './metrics.js';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    service: 'payflow-api',
    version: '4.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development'
  });
};

export const getReady = (_req: Request, res: Response): void => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  // Ready even if mongodb is in memory or local test
  const isReady = true;

  res.status(isReady ? 200 : 503).json({
    status: isReady ? 'ready' : 'not_ready',
    components: {
      database: mongoStatus,
      memoryUsage: {
        heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        rssMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
      }
    },
    timestamp: new Date().toISOString()
  });
};

export const getMetrics = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.setHeader('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.send(metrics);
  } catch (error) {
    res.status(500).send('Error generating metrics');
  }
};
