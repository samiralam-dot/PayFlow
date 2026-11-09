import React, { useState } from 'react';
import { Button } from '../../components/Button';
import {
  Layers,
  ArrowRight,
  Database,
  Server,
  Zap,
  Activity,
  Shield,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ComponentNode {
  id: string;
  name: string;
  category: 'gateway' | 'service' | 'engine' | 'storage' | 'integration' | 'async';
  responsibility: string;
  apis: string[];
  collections: string[];
  events: string[];
  dependencies: string[];
  failureScenarios: string[];
}

export const ArchitecturePage: React.FC = () => {
  const components: ComponentNode[] = [
    {
      id: 'gateway',
      name: 'API Gateway / Reverse Proxy',
      category: 'gateway',
      responsibility: 'TLS termination, rate limiting, correlation ID injection (X-Correlation-Id), request payload validation.',
      apis: ['ALL /api/v1/*'],
      collections: ['auditLogs'],
      events: ['request.received', 'rate_limit.exceeded'],
      dependencies: ['Redis', 'Auth Service'],
      failureScenarios: ['Rate limit spikes return 429 Too Many Requests', 'CORS origin mismatch rejection']
    },
    {
      id: 'auth',
      name: 'Authentication & RBAC',
      category: 'service',
      responsibility: 'JWT access verification, refresh token rotation, merchant tenant isolation, API key SHA-256 verification.',
      apis: ['POST /auth/login', 'POST /auth/register', 'POST /auth/refresh'],
      collections: ['users', 'merchants', 'apiKeys'],
      events: ['merchant.registered', 'api_key.rotated'],
      dependencies: ['MongoDB'],
      failureScenarios: ['Invalid token returns 401', 'Tenant boundary violation blocked with 403 Forbidden']
    },
    {
      id: 'order',
      name: 'Order Management Service',
      category: 'service',
      responsibility: 'Manages order lifecycle, integer minor-currency amounts (paise), order expiration and receipts.',
      apis: ['POST /orders', 'GET /orders/:id'],
      collections: ['orders'],
      events: ['order.created', 'order.expired'],
      dependencies: ['MongoDB', 'Auth Service'],
      failureScenarios: ['Order expiration prevents subsequent payment capture']
    },
    {
      id: 'payment_engine',
      name: 'Payment Engine',
      category: 'engine',
      responsibility: 'Authoritative state machine (CREATED → INITIATED → PROCESSING → SUCCESS / FAILED), idempotency validation.',
      apis: ['POST /payments', 'GET /payments/:id', 'POST /payments/:id/verify'],
      collections: ['payments', 'idempotencyKeys'],
      events: ['payment.created', 'payment.success', 'payment.failed'],
      dependencies: ['Routing Engine', 'Ledger Engine', 'MongoDB', 'Transactional Outbox'],
      failureScenarios: ['Duplicate request using existing Idempotency-Key returns cached response without second charge']
    },
    {
      id: 'routing',
      name: 'Smart Routing Engine',
      category: 'engine',
      responsibility: 'Dynamically routes payment to lowest-latency, highest-availability provider based on rule matrix.',
      apis: ['Internal evaluation pipeline'],
      collections: ['providerConfigurations'],
      events: ['route.selected', 'provider.failed_over'],
      dependencies: ['Razorpay Adapter', 'Mock Provider', 'Redis'],
      failureScenarios: ['Primary provider latency > 2000ms triggers automatic circuit breaker switch to secondary']
    },
    {
      id: 'razorpay',
      name: 'Razorpay Provider Adapter',
      category: 'integration',
      responsibility: 'Translates PayFlow standardized requests into Razorpay Orders, verifies HMAC signatures & webhooks.',
      apis: ['External Razorpay API /v1/orders', '/v1/payments'],
      collections: ['providerEvents'],
      events: ['razorpay.webhook_received'],
      dependencies: ['Razorpay REST API'],
      failureScenarios: ['Network socket timeout triggers status polling before retry']
    },
    {
      id: 'mock_provider',
      name: 'Mock Simulation Provider',
      category: 'integration',
      responsibility: 'Simulates deterministic success, bank timeouts, network latency, and simulated chargeback scenarios.',
      apis: ['Internal Mock Simulator'],
      collections: ['providerEvents'],
      events: ['mock.payment_evaluated'],
      dependencies: ['None (isolated)'],
      failureScenarios: ['Controlled failure injection for QA testing']
    },
    {
      id: 'ledger',
      name: 'Double-Entry Ledger Engine',
      category: 'engine',
      responsibility: 'Maintains balanced financial journal entries. Total Debits = Total Credits. Immutable entries.',
      apis: ['GET /ledger/balance', 'GET /ledger/entries'],
      collections: ['ledgerAccounts', 'ledgerTransactions', 'ledgerEntries'],
      events: ['ledger.entry_posted'],
      dependencies: ['MongoDB (Multi-doc transaction)'],
      failureScenarios: ['Unbalanced journal attempt automatically aborts and rolls back database transaction']
    },
    {
      id: 'webhook_service',
      name: 'Webhook Reliability Center',
      category: 'async',
      responsibility: 'Dispatches signed webhook payloads with HMAC-SHA256, exponential backoff retries, and dead-letter fallback.',
      apis: ['POST /webhooks/endpoints', 'GET /webhooks/deliveries'],
      collections: ['webhookEndpoints', 'webhookEvents', 'webhookDeliveries'],
      events: ['webhook.dispatched', 'webhook.failed', 'webhook.dead_lettered'],
      dependencies: ['BullMQ', 'Redis'],
      failureScenarios: ['Merchant endpoint 500 triggers exponential retry up to 5 attempts before DLQ']
    },
    {
      id: 'refund_service',
      name: 'Refund Service',
      category: 'service',
      responsibility: 'Enforces partial & full refund bounds (cumulative refunds cannot exceed captured volume) and ledger reversal.',
      apis: ['POST /refunds', 'GET /refunds/:id'],
      collections: ['refunds'],
      events: ['refund.created', 'refund.processed'],
      dependencies: ['Payment Engine', 'Ledger Engine', 'Provider Adapter'],
      failureScenarios: ['Refund amount > remaining captured balance rejected with 422 Unprocessable Entity']
    },
    {
      id: 'settlement_service',
      name: 'Settlement Management',
      category: 'service',
      responsibility: 'Computes payable merchant balances, platform fee deductions, and net settlement batches (T+1/T+2).',
      apis: ['GET /settlements', 'POST /settlements/batch'],
      collections: ['settlements'],
      events: ['settlement.calculated', 'settlement.completed'],
      dependencies: ['Ledger Engine'],
      failureScenarios: ['Insufficient available balance holds back batch payout until funds clear']
    },
    {
      id: 'risk_engine',
      name: 'Rule-Based Risk Engine',
      category: 'engine',
      responsibility: 'Evaluates transaction velocity, failure spikes, amount thresholds, and routes to manual review queue.',
      apis: ['Internal risk assessment step'],
      collections: ['riskAssessments'],
      events: ['risk.flagged', 'risk.approved'],
      dependencies: ['Redis', 'MongoDB'],
      failureScenarios: ['Rapid velocity (>5 card attempts in 60s) flags transaction for manual review']
    },
    {
      id: 'mongodb',
      name: 'MongoDB Persistent Store',
      category: 'storage',
      responsibility: 'Document store with multi-document ACID transactions, unique indexes, and optimistic concurrency.',
      apis: ['Mongoose ODM'],
      collections: ['All 19 PayFlow Collections'],
      events: ['Change Streams'],
      dependencies: ['Replica Set'],
      failureScenarios: ['Transient transaction conflicts automatically retried with exponential jitter']
    },
    {
      id: 'kafka',
      name: 'Apache Kafka Event Streaming',
      category: 'async',
      responsibility: 'High-throughput event spine for decoupled notifications, analytics pipelines, and audit trails.',
      apis: ['Kafka Producer / Consumer'],
      collections: ['outboxEvents (Transactional Outbox)'],
      events: ['payment.events', 'refund.events', 'settlement.events'],
      dependencies: ['Kafka Broker'],
      failureScenarios: ['Consumer lag monitored with automated dead-letter topic failover']
    }
  ];

  const [selectedNode, setSelectedNode] = useState<ComponentNode>(components[3]); // Payment Engine default
  const [journeyStep, setJourneyStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const journeySteps = [
    { step: 1, title: 'Client Submits Payment Request', node: 'gateway', desc: 'Merchant app sends POST /api/v1/payments with Idempotency-Key and amount.' },
    { step: 2, title: 'Gateway Injects Correlation & Verifies Token', node: 'auth', desc: 'Gateway generates X-Correlation-Id and authenticates tenant API key.' },
    { step: 3, title: 'Risk Engine Checks Velocity', node: 'risk_engine', desc: 'Evaluates rapid failure patterns and transaction velocity limits.' },
    { step: 4, title: 'Smart Router Selects Acquirer', node: 'routing', desc: 'Router evaluates real-time latency and selects Razorpay Adapter.' },
    { step: 5, title: 'Provider Processes Charge', node: 'razorpay', desc: 'Sends order request to Razorpay and receives payment signature token.' },
    { step: 6, title: 'Authoritative Webhook Verification', node: 'payment_engine', desc: 'Authoritative webhook received, signature verified against raw body.' },
    { step: 7, title: 'Atomic Double-Entry Posting', node: 'ledger', desc: 'Ledger Engine records balanced debits and credits atomically in MongoDB.' },
    { step: 8, title: 'Merchant Webhook Dispatched', node: 'webhook_service', desc: 'Signed payment.success event delivered to merchant listener via BullMQ.' }
  ];

  const handleNextStep = () => {
    setJourneyStep((prev) => (prev + 1) % journeySteps.length);
  };

  const handleReset = () => {
    setJourneyStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#0070E0] uppercase tracking-wider">
          System Architecture Visualizer
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] tracking-tight">
          Interactive Financial Infrastructure Explorer
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Inspect each bounded context, database interaction, event boundary, and simulated payment lifecycle path.
        </p>
      </div>

      {/* Payment Journey Simulator Bar */}
      <div className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2EAF3]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-[#0070E0] text-xs font-extrabold">
                STEP {journeyStep + 1} OF {journeySteps.length}
              </span>
              <h3 className="font-bold text-sm text-[#172B4D]">{journeySteps[journeyStep].title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{journeySteps[journeyStep].desc}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={handleNextStep}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Next Phase
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
              Reset
            </Button>
          </div>
        </div>

        {/* Step Progress indicators */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
          {journeySteps.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => setJourneyStep(idx)}
              className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                journeyStep === idx
                  ? 'bg-[#0070E0] text-white border-[#0070E0] font-bold shadow-xs'
                  : idx < journeyStep
                  ? 'bg-blue-50 text-[#003087] border-blue-200'
                  : 'bg-[#F4F8FC] text-slate-400 border-slate-200'
              }`}
            >
              <div className="text-[10px]">Step {s.step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 bg-white p-3 rounded-xl border border-[#E2EAF3]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0070E0]" />
          <span>Synchronous REST/HTTP</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#16A36A]" />
          <span>MongoDB ACID Transaction</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F4A340]" />
          <span>Asynchronous Event / BullMQ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-600" />
          <span>External Acquirer Adapter</span>
        </div>
      </div>

      {/* Architecture Canvas and Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Component Graph / Interactive Grid */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-[#172B4D] uppercase tracking-wider">
            System Modules (Click any node to inspect)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {components.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const isCurrentJourneyNode = journeySteps[journeyStep].node === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all relative ${
                    isSelected
                      ? 'border-[#0070E0] ring-2 ring-[#0070E0]/30 bg-white shadow-md'
                      : 'border-[#E2EAF3] bg-white hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {isCurrentJourneyNode && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A8E8] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0070E0]"></span>
                    </span>
                  )}

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {node.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#172B4D] leading-tight">{node.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{node.responsibility}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Component Inspection Panel */}
        <div className="bg-white rounded-3xl border border-[#E2EAF3] p-6 shadow-md space-y-6 self-start sticky top-24">
          <div className="border-b border-[#E2EAF3] pb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#0070E0] text-[10px] font-bold uppercase mb-2">
              {selectedNode.category}
            </div>
            <h3 className="text-lg font-bold text-[#172B4D]">{selectedNode.name}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {selectedNode.responsibility}
            </p>
          </div>

          {/* Endpoints */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-[#172B4D]">Primary APIs / Interfaces</h4>
            <div className="space-y-1">
              {selectedNode.apis.map((api) => (
                <div key={api} className="p-2 bg-[#F4F8FC] rounded-lg text-xs font-mono text-slate-700 border border-[#E2EAF3]">
                  {api}
                </div>
              ))}
            </div>
          </div>

          {/* MongoDB Collections */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-[#172B4D]">Database Collections</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.collections.map((c) => (
                <span key={c} className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-[#172B4D]">Event Topics / Triggers</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.events.map((ev) => (
                <span key={ev} className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">
                  {ev}
                </span>
              ))}
            </div>
          </div>

          {/* Failure scenarios */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Handled Failure Scenarios
            </h4>
            <div className="space-y-1">
              {selectedNode.failureScenarios.map((fs) => (
                <div key={fs} className="p-2 bg-rose-50 rounded-lg text-xs text-rose-800 border border-rose-200 leading-relaxed">
                  {fs}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
