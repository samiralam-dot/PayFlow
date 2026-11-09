import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Route,
  Scale,
  Webhook,
  Code2,
  Lock,
  Server,
  RefreshCw,
  Terminal,
  ChevronRight,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [simulatedProvider, setSimulatedProvider] = useState<'razorpay' | 'mock'>('razorpay');
  const [simulatedStatus, setSimulatedStatus] = useState<'SUCCESS' | 'PROCESSING' | 'FAILED'>('SUCCESS');

  const sampleSnippet = `// Initialize PayFlow Orchestrator
import { PayFlow } from '@payflow/sdk';

const payflow = new PayFlow({
  apiKey: process.env.PAYFLOW_SECRET_KEY,
  environment: 'production'
});

// Create payment order with smart routing
const order = await payflow.orders.create({
  amount: 250000, // ₹2,500.00
  currency: 'INR',
  routingPreference: 'lowest_latency',
  idempotencyKey: 'tx_req_998129'
});`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-gradient-to-b from-blue-100/50 via-cyan-50/30 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0070E0]">
            <span className="flex h-2 w-2 rounded-full bg-[#0070E0]" />
            PayFlow V4 Payment Orchestration Engine
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#172B4D] tracking-tight leading-[1.12]">
              One Platform. <br />
              <span className="bg-gradient-to-r from-[#003087] via-[#0070E0] to-[#00A8E8] bg-clip-text text-transparent">
                Every Payment.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto font-normal leading-relaxed">
              Accept, manage, route, and monitor payments through powerful financial infrastructure built for modern businesses.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/dashboard">
              <Button size="lg" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
                Start Building
              </Button>
            </Link>
            <Link to="/docs">
              <Button size="lg" variant="outline" icon={<BookOpen className="w-5 h-5" />}>
                Explore Documentation
              </Button>
            </Link>
          </div>

          {/* Hero Visual: Interactive Payment Dashboard Preview with Clearly Labeled Demo Data */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#E2EAF3] bg-white shadow-2xl p-4 sm:p-6 text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2EAF3] mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">payflow-console.preview</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-blue-50 text-[#0070E0] text-[11px] font-semibold border border-blue-200">
                  DEMO DATA (SIMULATED ORCHESTRATION)
                </div>
              </div>

              {/* Interactive preview controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#F4F8FC] border border-[#E2EAF3]">
                  <p className="text-xs font-semibold text-slate-500">Live Volume (24h)</p>
                  <p className="text-2xl font-bold text-[#172B4D] mt-1">₹14,892,400.00</p>
                  <div className="flex items-center gap-1 text-[11px] text-[#16A36A] font-semibold mt-1">
                    ↑ 18.4% vs previous cycle
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F4F8FC] border border-[#E2EAF3]">
                  <p className="text-xs font-semibold text-slate-500">Routing Success Rate</p>
                  <p className="text-2xl font-bold text-[#16A36A] mt-1">99.94%</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    Via Smart Dynamic Fallback
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F4F8FC] border border-[#E2EAF3]">
                  <p className="text-xs font-semibold text-slate-500">Active Provider</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => setSimulatedProvider('razorpay')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        simulatedProvider === 'razorpay'
                          ? 'bg-[#003087] text-white'
                          : 'bg-white text-slate-600 border border-slate-300'
                      }`}
                    >
                      Razorpay
                    </button>
                    <button
                      onClick={() => setSimulatedProvider('mock')}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        simulatedProvider === 'mock'
                          ? 'bg-[#0070E0] text-white'
                          : 'bg-white text-slate-600 border border-slate-300'
                      }`}
                    >
                      MockProvider
                    </button>
                  </div>
                </div>
              </div>

              {/* Sample Payment Flow Visual */}
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pb-2">
                  <span>Simulated Payment Dispatch Stream</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Real-Time Engine</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-white p-3 rounded-lg border border-[#E2EAF3]">
                  <div className="space-y-0.5">
                    <p className="font-bold text-[#172B4D]">pay_sim_98243109</p>
                    <p className="text-[11px] text-slate-500">Order: ord_checkout_7721</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Amount:</span> <span className="font-bold text-[#172B4D]">₹2,500.00</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Provider:</span> <span className="font-bold text-[#0070E0]">{simulatedProvider === 'razorpay' ? 'Razorpay (Test)' : 'PayFlow Mock'}</span>
                  </div>
                  <div>
                    <Badge status={simulatedStatus} />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSimulatedStatus('SUCCESS')}
                      className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded font-semibold hover:bg-emerald-200"
                    >
                      Simulate Success
                    </button>
                    <button
                      onClick={() => setSimulatedStatus('FAILED')}
                      className="px-2 py-0.5 text-[10px] bg-rose-100 text-rose-800 rounded font-semibold hover:bg-rose-200"
                    >
                      Simulate Fail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Payment Infrastructure Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-bold text-[#0070E0] tracking-wider uppercase">Infrastructure Overview</h2>
          <p className="text-3xl font-extrabold text-[#172B4D] tracking-tight">
            Engineered for High-Throughput Financial Correctness
          </p>
          <p className="text-slate-600 text-sm">
            PayFlow decouples your application logic from proprietary gateway APIs, providing a unified financial abstraction layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E2EAF3] shadow-xs hover:border-[#0070E0]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0070E0] flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#172B4D] mb-2">Provider Adapter Layer</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Standardized interfaces for Razorpay, MockProvider, and future processors. Switch or balance traffic without changing your frontend code.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2EAF3] shadow-xs hover:border-[#0070E0]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A36A] flex items-center justify-center mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#172B4D] mb-2">Immutable Double-Entry Ledger</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Auditable debits and credits recorded atomically with every payment, refund, and fee deduction. Invariant: Debits always balance Credits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2EAF3] shadow-xs hover:border-[#0070E0]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#003087] flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#172B4D] mb-2">Strict Idempotency</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Enforced with unique database constraints and atomic state transitions to guarantee zero double charges under heavy concurrent retries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Smart Payment Routing */}
      <section className="bg-white py-16 border-y border-[#E2EAF3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-[#00A8E8] text-xs font-bold border border-cyan-200">
                <Route className="w-3.5 h-3.5" /> Dynamic Orchestration
              </div>
              <h2 className="text-3xl font-extrabold text-[#172B4D] tracking-tight">
                Smart Payment Routing Engine
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically route payments based on real-time provider availability, historical latency, currency compatibility, and merchant priority policies.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A36A] flex items-center justify-center text-xs font-bold">✓</div>
                  <span>Automatic failover to secondary providers on gateway downtime</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A36A] flex items-center justify-center text-xs font-bold">✓</div>
                  <span>Safe ambiguity reconciliation prior to secondary charges</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#16A36A] flex items-center justify-center text-xs font-bold">✓</div>
                  <span>Merchant-configurable traffic split rules</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#00205B] rounded-2xl p-6 text-slate-200 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="text-xs font-mono text-cyan-400">routing_decision_pipeline</span>
                <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded">EVALUATED</span>
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                  <span className="text-slate-400">[1] Inbound Request:</span> ₹2,500 INR | Method: UPI
                </div>
                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                  <span className="text-slate-400">[2] Provider Health Check:</span>
                  <p className="text-emerald-400">Razorpay: Healthy (142ms latency, 99.8% 1hr SR)</p>
                  <p className="text-cyan-400">MockProvider: Standby (12ms latency)</p>
                </div>
                <div className="p-2.5 bg-blue-950/70 rounded border border-blue-800/60">
                  <span className="text-white font-bold">[3] Optimal Route Selected:</span> Razorpay (Primary)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Developer-Friendly APIs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-slate-900 rounded-2xl p-6 text-slate-200 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-mono text-slate-400">payment.create.ts</span>
              <button
                onClick={copyCodeToClipboard}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-emerald-300">
              {sampleSnippet}
            </pre>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0070E0] text-xs font-bold border border-blue-200">
              <Code2 className="w-3.5 h-3.5" /> Modern Developer Experience
            </div>
            <h2 className="text-3xl font-extrabold text-[#172B4D] tracking-tight">
              Developer-First Architecture
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Integrate in minutes with intuitive REST APIs, OpenAPI 3.0 documentation, typed SDKs, and structured JSON logs with correlation IDs.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/docs">
                <Button variant="primary" size="md">
                  Browse Interactive API Docs
                </Button>
              </Link>
              <a href="http://localhost:4000/api-docs" target="_blank" rel="noreferrer">
                <Button variant="outline" size="md" icon={<Terminal className="w-4 h-4" />}>
                  Swagger UI
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Financial Ledger & 5. Webhook Infrastructure */}
      <section className="bg-slate-50 py-16 border-y border-[#E2EAF3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-xs font-bold text-[#0070E0] tracking-wider uppercase">Mission-Critical Reliability</h2>
            <p className="text-3xl font-extrabold text-[#172B4D] tracking-tight">
              Ledger Accounting & Webhook Delivery Center
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E2EAF3] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#00A8E8] flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#172B4D]">Double-Entry Accounting</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike primitive status counters, PayFlow maintains balanced ledger accounts for merchants, platform fees, pending settlement reserves, and refund holds.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-700 border border-slate-200">
                DR: Acquirer Settlement Account ₹2,500.00 <br />
                CR: Merchant Available Balance ₹2,450.00 <br />
                CR: PayFlow Platform Fee ₹50.00
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E2EAF3] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0070E0] flex items-center justify-center">
                <Webhook className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#172B4D]">Reliable Webhook Subscriptions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Guaranteed at-least-once delivery with HMAC-SHA256 signature verification, exponential backoff retries, attempt counters, and dead-letter queues.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-700 border border-slate-200">
                Signature: t=1762701200,v1=9e8b7c3... <br />
                Retries: 5 attempts max (1s, 5s, 25s, 125s, 625s) <br />
                Dead-Letter fallback on non-2xx failures
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Security and Reliability */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#00205B] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900 text-cyan-300 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" /> Non-Custodial Security First
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Architectural Security & Data Isolation
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                PayFlow implements multi-tenant isolation, PBKDF2/Argon2-grade password hashing, JWT refresh token rotation, and strict role-based access control. Cardholder CVV and raw credentials never touch persistent disks.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">Zero Raw Card Data</p>
                <p className="text-base font-bold text-white mt-1">PCI Scope Reduction</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">Tenant Isolation</p>
                <p className="text-base font-bold text-white mt-1">Indexed Merchant IDs</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">HMAC Webhooks</p>
                <p className="text-base font-bold text-white mt-1">Payload Tamper Proof</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-slate-400">Audit Trail</p>
                <p className="text-base font-bold text-white mt-1">Immutable Logs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-[#172B4D]">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-500">Core architectural questions answered directly.</p>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-white rounded-xl border border-[#E2EAF3]">
            <h3 className="font-bold text-[#172B4D] text-sm">Is PayFlow an independent bank or payment acquirer?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              No. PayFlow is a payment orchestration platform. It connects with authorized external payment providers (like Razorpay) to process monetary transactions while providing smart routing, ledger reconciliation, and unified reporting.
            </p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-[#E2EAF3]">
            <h3 className="font-bold text-[#172B4D] text-sm">How does PayFlow prevent double-charging on network timeouts?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Every request requires a unique Idempotency Key stored in MongoDB with unique compound indexes. In an ambiguous timeout, PayFlow never blindly submits a secondary charge—it reconciles the original transaction status with the provider first.
            </p>
          </div>
          <div className="p-5 bg-white rounded-xl border border-[#E2EAF3]">
            <h3 className="font-bold text-[#172B4D] text-sm">Can I test PayFlow without connecting live bank credentials?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Yes. PayFlow comes with a full Payment Simulator and MockProvider that simulates successes, failures, bank timeouts, and duplicate webhooks directly within the developer console.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-[#172B4D]">
          Ready to Modernize Your Payment Infrastructure?
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Sign up for a sandbox merchant account or explore our interactive system architecture explorer.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" variant="primary">
              Create Merchant Account
            </Button>
          </Link>
          <Link to="/architecture">
            <Button size="lg" variant="outline">
              Explore System Architecture
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
