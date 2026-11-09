import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'PayFlow V4 API Documentation',
    version: '4.0.0',
    description: 'Next-Generation Payment Orchestration & Financial Infrastructure Platform REST API.',
    contact: {
      name: 'PayFlow API Support',
      url: 'https://payflow.dev'
    }
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local Development Server'
    }
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Service Health Check',
        tags: ['System'],
        responses: {
          '200': {
            description: 'Service is healthy'
          }
        }
      }
    },
    '/ready': {
      get: {
        summary: 'Service Readiness Probe',
        tags: ['System'],
        responses: {
          '200': {
            description: 'Service and database are ready'
          }
        }
      }
    },
    '/metrics': {
      get: {
        summary: 'Prometheus Metrics',
        tags: ['System'],
        responses: {
          '200': {
            description: 'Prometheus exposition text format'
          }
        }
      }
    },
    '/api/v1/auth/register': {
      post: {
        summary: 'Register Merchant Account',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8 },
                  businessName: { type: 'string' }
                },
                required: ['email', 'password', 'businessName']
              }
            }
          }
        },
        responses: {
          '201': { description: 'Merchant registered successfully' },
          '400': { description: 'Validation error' }
        }
      }
    },
    '/api/v1/orders': {
      post: {
        summary: 'Create Payment Order',
        tags: ['Orders'],
        responses: {
          '201': { description: 'Order created' }
        }
      }
    },
    '/api/v1/payments': {
      post: {
        summary: 'Initiate Payment',
        tags: ['Payments'],
        responses: {
          '201': { description: 'Payment initiated' }
        }
      }
    }
  }
};

export const swaggerRouter = Router();
swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
swaggerRouter.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});
