import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { correlationMiddleware } from './middleware/correlation.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { healthRouter } from './modules/health/health.router.js';
import { swaggerRouter } from './modules/apiDocs/swagger.js';
import { apiV1Router } from './modules/api.router.js';
import { httpRequestDurationMicroseconds } from './modules/health/metrics.js';

export const createApp = (): Express => {
  const app = express();

  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false // Allows Swagger UI to load resources smoothly
  }));

  // CORS Configuration
  app.use(cors({
    origin: (origin, callback) => {
      // In dev, allow localhost or specified origins
      if (!origin || origin.startsWith('http://localhost') || origin === env.CORS_ORIGIN) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for local dev
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Correlation-Id', 'Idempotency-Key', 'X-Api-Key']
  }));

  // JSON Body Parser with limit
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Correlation ID middleware
  app.use(correlationMiddleware);

  // Prometheus request duration middleware
  app.use((req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
      end({
        method: req.method,
        route: req.route?.path || req.path,
        code: res.statusCode.toString()
      });
    });
    next();
  });

  // Request Logging with correlation ID
  app.use(
    morgan((tokens, req, res) => {
      return JSON.stringify({
        correlationId: req.correlationId,
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTimeMs: tokens['response-time'](req, res),
        contentLength: tokens.res(req, res, 'content-length'),
        timestamp: new Date().toISOString()
      });
    })
  );

  // System & Health Endpoints
  app.use('/', healthRouter);

  // Swagger Documentation
  app.use('/', swaggerRouter);

  // API v1 Routing
  app.use('/api/v1', apiV1Router);

  // 404 Handler
  app.use(notFoundHandler);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
