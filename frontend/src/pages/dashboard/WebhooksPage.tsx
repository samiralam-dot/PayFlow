import React, { useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Webhook, Plus, RotateCcw, Check, ExternalLink, Shield } from 'lucide-react';

export const WebhooksPage: React.FC = () => {
  const [deliveries, setDeliveries] = useState([
    { id: 'whd_01', event: 'payment.success', endpoint: 'https://api.apexretail.io/webhooks/payflow', status: 'SUCCESS', statusCode: 200, latencyMs: 142, attempts: 1, date: '2026-11-09 16:45:13' },
    { id: 'whd_02', event: 'payment.processing', endpoint: 'https://api.apexretail.io/webhooks/payflow', status: 'SUCCESS', statusCode: 200, latencyMs: 98, attempts: 1, date: '2026-11-09 16:45:12' },
    { id: 'whd_03', event: 'refund.processed', endpoint: 'https://api.apexretail.io/webhooks/payflow', status: 'SUCCESS', statusCode: 200, latencyMs: 180, attempts: 1, date: '2026-11-09 15:10:31' }
  ]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Webhook Delivery Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            HMAC-SHA256 signed delivery events, exponential backoff retries, and dead-letter queues.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Register Webhook Endpoint
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A]" />
            <span className="text-xs font-bold text-[#172B4D]">https://api.apexretail.io/webhooks/payflow</span>
          </div>
          <p className="text-xs text-slate-500">Subscribed to: payment.*, refund.*, settlement.*</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-mono text-slate-700">
            whsec_••••••••••••••••
          </span>
          <Button variant="outline" size="sm">
            Test Ping
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E2EAF3]">
          <h3 className="text-sm font-bold text-[#172B4D]">Recent Delivery Dispatches</h3>
        </div>
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
            <tr>
              <th className="py-3 px-4">Delivery ID</th>
              <th className="py-3 px-4">Event Type</th>
              <th className="py-3 px-4">Status Code</th>
              <th className="py-3 px-4">Latency</th>
              <th className="py-3 px-4">Attempts</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAF3]">
            {deliveries.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{d.id}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#0070E0]">{d.event}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-100 text-[#16A36A]">
                    {d.statusCode} OK
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono">{d.latencyMs}ms</td>
                <td className="py-3.5 px-4 font-bold">{d.attempts} of 5</td>
                <td className="py-3.5 px-4 text-slate-400">{d.date}</td>
                <td className="py-3.5 px-4 text-right">
                  <button className="text-[#0070E0] font-semibold hover:underline cursor-pointer">
                    Inspect Payload
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
