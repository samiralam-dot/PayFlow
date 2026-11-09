import React, { useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { RotateCcw, Plus, AlertCircle } from 'lucide-react';

export const RefundsPage: React.FC = () => {
  const [refunds, setRefunds] = useState([
    { id: 'rfnd_01J9A8B7C601', paymentId: 'pay_rzp_live_992147', amount: 675000, reason: 'Customer requested cancellation', status: 'SUCCESS', date: '2026-11-09 15:10' },
    { id: 'rfnd_01J9A8B7C602', paymentId: 'pay_rzp_live_981102', amount: 150000, reason: 'Partial return of item', status: 'SUCCESS', date: '2026-11-09 11:22' }
  ]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Refunds & Reversals</h1>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative refund state machine (CREATED → PENDING → PROCESSING → SUCCESS/FAILED) and ledger credit offsets.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Initiate New Refund
        </Button>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          <strong>Invariant Enforced:</strong> Cumulative refunds can never exceed original captured transaction value.
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
            <tr>
              <th className="py-3 px-4">Refund ID</th>
              <th className="py-3 px-4">Original Payment</th>
              <th className="py-3 px-4">Refunded Amount</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Processed Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAF3]">
            {refunds.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{r.id}</td>
                <td className="py-3.5 px-4 font-mono text-[#0070E0]">{r.paymentId}</td>
                <td className="py-3.5 px-4 font-bold text-[#DC3545]">₹{(r.amount / 100).toFixed(2)}</td>
                <td className="py-3.5 px-4 text-slate-600">{r.reason}</td>
                <td className="py-3.5 px-4"><Badge status={r.status} /></td>
                <td className="py-3.5 px-4 text-slate-400">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
