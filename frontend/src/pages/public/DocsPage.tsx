import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Terminal, Copy, Check, ExternalLink, Code2, BookOpen } from 'lucide-react';

export const DocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'webhooks' | 'ledger'>('quickstart');
  const [copied, setCopied] = useState(false);

  const snippets = {
    quickstart: `// 1. Install PayFlow SDK
npm install @payflow/sdk

// 2. Initialize in your Express / Node backend
import { PayFlow } from '@payflow/sdk';

const payflow = new PayFlow({
  apiKey: process.env.PAYFLOW_SECRET_KEY,
  environment: 'production' // or 'sandbox'
});

// 3. Create an order with idempotency
const order = await payflow.orders.create({
  amount: 500000, // ₹5,000.00
  currency: 'INR',
  customer: {
    name: 'Aarav Sharma',
    email: 'aarav@example.com'
  },
  idempotencyKey: 'cart_session_9921_checkout'
});

console.log('Order created:', order.id);`,

    webhooks: `// Verify HMAC signature in your webhook endpoint
import crypto from 'crypto';

app.post('/api/payflow-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-payflow-signature'];
  const secret = process.env.PAYFLOW_WEBHOOK_SECRET;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(req.body);
  if (event.type === 'payment.success') {
    console.log('Payment verified authoritatively:', event.data.paymentId);
  }

  res.status(200).json({ received: true });
});`,

    ledger: `// Inspecting balanced double-entry ledger accounts
const ledgerBalance = await payflow.ledger.getBalance({
  merchantId: 'merch_apex_live_8921',
  currency: 'INR'
});

console.log('Available Balance:', ledgerBalance.available);
console.log('Pending Settlements:', ledgerBalance.pending);
console.log('Unsettled Fee Reserves:', ledgerBalance.reserved);`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E2EAF3]">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#0070E0] uppercase tracking-wider">
            Developer Documentation
          </span>
          <h1 className="text-3xl font-extrabold text-[#172B4D]">
            PayFlow Developer Hub & API Reference
          </h1>
          <p className="text-slate-600 text-sm">
            Everything you need to integrate PayFlow into your backend, mobile app, or e-commerce stack.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="http://localhost:4000/api-docs" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
              OpenAPI Swagger UI
            </Button>
          </a>
          <a href="http://localhost:4000/metrics" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" icon={<Terminal className="w-4 h-4" />}>
              Prometheus Metrics
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Guides
          </h4>
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'quickstart'
                ? 'bg-[#0070E0] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Quickstart Guide
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'webhooks'
                ? 'bg-[#0070E0] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Webhook Verification
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'ledger'
                ? 'bg-[#0070E0] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Double-Entry Ledger
          </button>

          <div className="pt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              API Endpoints
            </h4>
            <div className="space-y-1 text-xs text-slate-600 font-mono">
              <div className="px-3 py-1.5 hover:bg-slate-100 rounded cursor-pointer">
                <span className="text-[#16A36A] font-bold">POST</span> /api/v1/orders
              </div>
              <div className="px-3 py-1.5 hover:bg-slate-100 rounded cursor-pointer">
                <span className="text-[#16A36A] font-bold">POST</span> /api/v1/payments
              </div>
              <div className="px-3 py-1.5 hover:bg-slate-100 rounded cursor-pointer">
                <span className="text-[#0070E0] font-bold">GET</span> /api/v1/payments/:id
              </div>
              <div className="px-3 py-1.5 hover:bg-slate-100 rounded cursor-pointer">
                <span className="text-[#16A36A] font-bold">POST</span> /api/v1/refunds
              </div>
              <div className="px-3 py-1.5 hover:bg-slate-100 rounded cursor-pointer">
                <span className="text-[#0070E0] font-bold">GET</span> /api/v1/ledger/balance
              </div>
            </div>
          </div>
        </div>

        {/* Code & Content Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#00205B] text-slate-100 rounded-2xl p-6 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-semibold text-white">
                  {activeTab === 'quickstart'
                    ? 'server.integration.ts'
                    : activeTab === 'webhooks'
                    ? 'webhook.handler.ts'
                    : 'ledger.balance.ts'}
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-emerald-300">
              {snippets[activeTab]}
            </pre>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2EAF3] space-y-4">
            <h3 className="text-base font-bold text-[#172B4D]">Important Production Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-[#172B4D]">Never trust client callbacks:</strong> Always treat frontend redirect or checkout modal callbacks as unverified hints. Use server-to-server webhook events or authoritative GET /payments/:id reconciliation.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-[#172B4D]">Always provide Idempotency-Key:</strong> Include a unique UUID or transaction token in header `Idempotency-Key` on payment creation to prevent duplicate debits.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
