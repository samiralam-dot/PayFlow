import mongoose from 'mongoose';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  const app = createApp();

  // Try connecting to MongoDB if URI is available
  try {
    logger.info(`Attempting connection to MongoDB at ${env.MONGODB_URI.split('@').pop()}...`);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });
    logger.info('Connected successfully to MongoDB database.');
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    logger.warn(`MongoDB not immediately reachable (${errorMsg}). System will run with memory/mock fallback for Phase 1.`);
  }

  const server = app.listen(env.PORT, () => {
    logger.info(`PayFlow V4 API Engine running on http://localhost:${env.PORT}`);
    logger.info(`OpenAPI / Swagger documentation available at http://localhost:${env.PORT}/api-docs`);
    logger.info(`Prometheus Metrics available at http://localhost:${env.PORT}/metrics`);
    logger.info(`Health check available at http://localhost:${env.PORT}/health`);
  });

  const handleShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Gracefully shutting down PayFlow server...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
      }
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Forced shutdown due to timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
};

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
