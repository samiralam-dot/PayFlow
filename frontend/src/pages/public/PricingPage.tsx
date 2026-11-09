import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Check, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Developer Sandbox',
      price: '₹0',
      period: 'forever free',
      description: 'Ideal for testing integrations, simulating edge cases, and building proofs of concept.',
      cta: 'Start in Sandbox',
      ctaVariant: 'outline' as const,
      features: [
        'Up to 10,000 simulated payments / mo',
        'MockProvider & Razorpay Test integration',
        'Interactive Payment Simulator',
        'Webhook Delivery Tester',
        'Full OpenAPI documentation',
        'Community Support'
      ]
    },
    {
      name: 'Growth',
      price: billingPeriod === 'monthly' ? '₹4,999' : '₹3,999',
      period: '/ month + 0.15% per tx',
      description: 'For scaling internet businesses needing smart routing, ledger balancing, and webhook retries.',
      popular: true,
      cta: 'Start 14-Day Trial',
      ctaVariant: 'primary' as const,
      features: [
        'Up to 250,000 live transactions / mo',
        'Smart Routing Engine (latency + health)',
        'Full Double-Entry Ledger accounting',
        'Automated webhook retry with DLQ',
        'Risk rules & velocity checks',
        'Standard Email & Slack Support (4hr SLA)'
      ]
    },
    {
      name: 'Enterprise Orchestration',
      price: 'Custom',
      period: 'volume-based',
      description: 'For high-volume platforms requiring dedicated outbox workers, custom failover, and dedicated support.',
      cta: 'Contact Sales',
      ctaVariant: 'secondary' as const,
      features: [
        'Unlimited transaction volume',
        'Multi-acquirer custom routing matrix',
        'Kafka cluster event streaming',
        'Dedicated BullMQ worker pools',
        'Custom risk model integrations',
        'Dedicated Solutions Architect & 15m SLA'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#0070E0] uppercase tracking-wider">
          Transparent Pricing
        </span>
        <h1 className="text-4xl font-extrabold text-[#172B4D] tracking-tight">
          Simple, Predictable Infrastructure Pricing
        </h1>
        <p className="text-slate-600 text-base">
          Pay for orchestration and financial infrastructure. Gateway processing fees are billed directly by your connected providers.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center pt-4">
          <div className="bg-slate-200/70 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                billingPeriod === 'monthly' ? 'bg-white text-[#172B4D] shadow-xs' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                billingPeriod === 'annual' ? 'bg-white text-[#172B4D] shadow-xs' : 'text-slate-600'
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-8 bg-white border flex flex-col justify-between relative transition-all ${
              p.popular
                ? 'border-[#0070E0] shadow-xl ring-2 ring-[#0070E0]/20'
                : 'border-[#E2EAF3] shadow-xs'
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0070E0] text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Most Popular
              </span>
            )}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#172B4D]">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{p.description}</p>
              </div>

              <div className="pt-2">
                <span className="text-3xl font-extrabold text-[#172B4D]">{p.price}</span>
                <span className="text-xs text-slate-500 ml-1.5">{p.period}</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-[#E2EAF3] text-xs text-slate-700">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A36A] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link to="/signup">
                <Button variant={p.ctaVariant} className="w-full">
                  {p.cta}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Note about provider pass-through fees */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 max-w-3xl mx-auto flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-[#0070E0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Clarification:</strong> PayFlow charges for orchestration, intelligent routing, idempotency state storage, and ledger reconciliation. Underlying bank gateway, interchange, and payment processor interchange fees are determined by and settled through your respective provider merchant accounts (e.g., Razorpay).
        </p>
      </div>
    </div>
  );
};
