import client from 'prom-client';

// Create a Registry
export const register = new client.Registry();

// Add default metrics
client.collectDefaultMetrics({
  register,
  prefix: 'payflow_'
});

// Custom payment metrics
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'payflow_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

export const paymentTransactionsTotal = new client.Counter({
  name: 'payflow_payment_transactions_total',
  help: 'Total number of payment transactions processed',
  labelNames: ['provider', 'status', 'currency']
});

export const paymentLatencyHistogram = new client.Histogram({
  name: 'payflow_payment_processing_latency_seconds',
  help: 'Latency of payment provider processing in seconds',
  labelNames: ['provider', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(paymentTransactionsTotal);
register.registerMetric(paymentLatencyHistogram);
