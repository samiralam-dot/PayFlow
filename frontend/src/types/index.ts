export type PaymentStatus =
  | 'CREATED'
  | 'INITIATED'
  | 'PROCESSING'
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUND_PENDING'
  | 'PARTIALLY_REFUNDED'
  | 'REFUNDED';

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

export type PaymentProvider = 'razorpay' | 'mock_provider';

export interface Transaction {
  id: string;
  paymentId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number; // in paise or minor units
  currency: string;
  paymentMethod: PaymentMethod;
  provider: PaymentProvider;
  status: PaymentStatus;
  createdAt: string;
  errorMessage?: string;
  fee: number;
  tax: number;
}

export interface MetricOverview {
  totalVolume: number;
  totalTransactions: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  successRate: number;
  averageTransactionValue: number;
  availableBalance: number;
  pendingSettlement: number;
}

export interface VolumeDataPoint {
  timestamp: string;
  volume: number;
  successCount: number;
  failedCount: number;
}

export interface MethodDistribution {
  name: string;
  value: number;
  percentage: number;
}
