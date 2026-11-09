import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/payflow'),
  JWT_SECRET: z.string().default('payflow-ultra-secure-jwt-secret-key-32charsmin'),
  JWT_REFRESH_SECRET: z.string().default('payflow-ultra-secure-refresh-jwt-secret-key'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  KAFKA_BROKERS: z.string().default('localhost:9092'),
  RAZORPAY_KEY_ID: z.string().default('rzp_test_mock_id'),
  RAZORPAY_KEY_SECRET: z.string().default('rzp_test_mock_secret'),
  WEBHOOK_SECRET: z.string().default('whsec_payflow_default_secret_key')
});

export const env = envSchema.parse(process.env);
