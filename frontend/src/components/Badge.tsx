import React from 'react';
import { PaymentStatus } from '../types';

interface BadgeProps {
  status: PaymentStatus | string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const getStyles = (st: string) => {
    switch (st.toUpperCase()) {
      case 'SUCCESS':
      case 'COMPLETED':
      case 'ACTIVE':
      case 'SETTLED':
        return 'bg-emerald-50 text-[#16A36A] border-emerald-200';
      case 'INITIATED':
      case 'PROCESSING':
      case 'PENDING':
      case 'REFUND_PENDING':
        return 'bg-amber-50 text-[#F4A340] border-amber-200';
      case 'FAILED':
      case 'CANCELLED':
      case 'EXPIRED':
        return 'bg-rose-50 text-[#DC3545] border-rose-200';
      case 'REFUNDED':
      case 'PARTIALLY_REFUNDED':
        return 'bg-indigo-50 text-[#0070E0] border-indigo-200';
      case 'CREATED':
      default:
        return 'bg-slate-50 text-[#64748B] border-slate-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${getStyles(
        status
      )} transition-colors duration-150`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          ['SUCCESS', 'SETTLED', 'ACTIVE'].includes(status.toUpperCase())
            ? 'bg-[#16A36A]'
            : ['PROCESSING', 'PENDING', 'INITIATED'].includes(status.toUpperCase())
            ? 'bg-[#F4A340] animate-pulse'
            : ['FAILED', 'CANCELLED'].includes(status.toUpperCase())
            ? 'bg-[#DC3545]'
            : 'bg-[#0070E0]'
        }`}
      />
      {status.replace(/_/g, ' ')}
    </span>
  );
};
