import React from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { ShieldAlert, AlertTriangle, CheckCircle, Search } from 'lucide-react';

export const RiskPage: React.FC = () => {
  const flags = [
    { id: 'risk_01', paymentId: 'pay_rzp_live_992146', score: 82, category: 'HIGH_RISK', rules: ['Rapid consecutive card attempts', 'Foreign IP mismatch'], status: 'BLOCKED', date: '2026-11-09 15:55' },
    { id: 'risk_02', paymentId: 'pay_rzp_live_991823', score: 65, category: 'MEDIUM_RISK', rules: ['Unusually large transaction volume'], status: 'MANUAL_REVIEW', date: '2026-11-09 12:40' },
    { id: 'risk_03', paymentId: 'pay_rzp_live_991402', score: 12, category: 'LOW_RISK', rules: ['Verified customer token'], status: 'PASSED', date: '2026-11-09 10:15' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Risk & Fraud Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Deterministic rule-based velocity checks, IP anomaly detection, and manual review queue.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3]">
          <span className="text-xs font-semibold text-slate-500">Flagged For Review</span>
          <p className="text-2xl font-extrabold text-[#F4A340] mt-2">3 Transactions</p>
          <span className="text-xs text-slate-400 mt-1 block">Requires manual merchant sign-off</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3]">
          <span className="text-xs font-semibold text-slate-500">Automated Blocks (24h)</span>
          <p className="text-2xl font-extrabold text-[#DC3545] mt-2">18 Attempts</p>
          <span className="text-xs text-slate-400 mt-1 block">Zero chargeback liability</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3]">
          <span className="text-xs font-semibold text-slate-500">Global False Positive Rate</span>
          <p className="text-2xl font-extrabold text-[#16A36A] mt-2">0.02%</p>
          <span className="text-xs text-slate-400 mt-1 block">Below 0.05% platform tolerance</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E2EAF3]">
          <h3 className="text-sm font-bold text-[#172B4D]">Risk Review Queue</h3>
        </div>
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
            <tr>
              <th className="py-3 px-4">Risk ID</th>
              <th className="py-3 px-4">Payment ID</th>
              <th className="py-3 px-4">Score (0-100)</th>
              <th className="py-3 px-4">Triggered Rules</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAF3]">
            {flags.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{f.id}</td>
                <td className="py-3.5 px-4 font-mono text-[#0070E0]">{f.paymentId}</td>
                <td className="py-3.5 px-4">
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    f.score > 70 ? 'bg-rose-100 text-[#DC3545]' : f.score > 40 ? 'bg-amber-100 text-[#F4A340]' : 'bg-emerald-100 text-[#16A36A]'
                  }`}>
                    {f.score} / 100
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {f.rules.map((r) => (
                      <span key={r} className="px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-700">
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold">{f.status}</td>
                <td className="py-3.5 px-4 text-slate-400">{f.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
