import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import {
  Route,
  Scale,
  ShieldCheck,
  Webhook,
  Activity,
  Layers,
  ArrowRight,
  Database,
  Terminal,
  Cpu
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    {
      icon: Route,
      title: 'Smart Payment Routing Engine',
      description:
        'Dynamically route transactions across multiple payment processors based on real-time latency, provider health checks, success probability, and custom merchant rules.',
      tags: ['Latency-based', 'Provider Failover', 'Rule Matrix']
    },
    {
      icon: Scale,
      title: 'Double-Entry Financial Ledger',
      description:
        'Complete debit/credit accounting with immutable journal entries. Prevents phantom balances, reconciles processor settlement batches, and tracks platform fees with zero mathematical discrepancy.',
      tags: ['GAAP Compliant', 'Immutable Journal', 'Automated Reconciliation']
    },
    {
      icon: Webhook,
      title: 'Webhook Reliability Center',
      description:
        'At-least-once delivery with HMAC-SHA256 signatures, exponential backoff scheduling, dead-letter storage, manual replay triggers, and real-time delivery telemetry.',
      tags: ['HMAC-SHA256', 'Exponential Backoff', 'Dead-Letter Queue']
    },
    {
      icon: Activity,
      title: 'Payment Simulator & Chaos Engine',
      description:
        'Test edge cases without risking real funds: trigger bank timeouts, simulated gateway outages, duplicate webhooks, out-of-order notifications, and race conditions.',
      tags: ['Bank Timeout Injection', 'Duplicate Webhooks', 'Safe Sandbox']
    },
    {
      icon: Database,
      title: 'Strict Idempotency & Concurrency',
      description:
        'Guaranteed single-execution semantics powered by MongoDB unique compound constraints, atomic state transactions, and optimistic concurrency locks.',
      tags: ['Idempotency Keys', 'Atomic Updates', 'Race Condition Proof']
    },
    {
      icon: ShieldCheck,
      title: 'Non-Custodial Security Architecture',
      description:
        'Built with strict multi-tenant merchant data isolation, JWT refresh token rotation, salted password hashing, and zero retention of sensitive CVV data.',
      tags: ['Tenant Isolation', 'Zero CVV Storage', 'RBAC Security']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#0070E0] uppercase tracking-wider">
          Enterprise Features
        </span>
        <h1 className="text-4xl font-extrabold text-[#172B4D] tracking-tight">
          Everything You Need to Orchestrate Global Payments
        </h1>
        <p className="text-slate-600 text-base">
          Explore the modular building blocks powering PayFlow's fault-tolerant financial architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="bg-white rounded-2xl border border-[#E2EAF3] p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0070E0] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#172B4D]">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
              </div>

              <div className="pt-6 border-t border-[#E2EAF3] mt-6 flex flex-wrap gap-2">
                {feat.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#F4F8FC] text-slate-600 border border-[#E2EAF3]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#003087] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Inspect the System Architecture</h2>
          <p className="text-sm text-blue-200">
            See how API Gateway, MongoDB, Ledger Engine, and Razorpay interact step-by-step.
          </p>
        </div>
        <Link to="/architecture">
          <Button variant="outline" className="bg-white text-[#003087] hover:bg-blue-50 border-white shrink-0">
            Open Interactive Explorer
          </Button>
        </Link>
      </div>
    </div>
  );
};
