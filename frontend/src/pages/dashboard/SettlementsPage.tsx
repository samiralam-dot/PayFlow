import React from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Landmark, ArrowUpRight, Download, Calendar } from 'lucide-react';

export const SettlementsPage: React.FC = () => {
  const settlements = [
    { id: 'stl_batch_20261108', gross: 42500000, fee: 850000, tax: 153000, net: 41497000, status: 'SETTLED', bankAccount: 'HDFC Bank •••• 4091', date: '2026-11-08' },
    { id: 'stl_batch_20261107', gross: 38200000, fee: 764000, tax: 137520, net: 37298480, status: 'SETTLED', bankAccount: 'HDFC Bank •••• 4091', date: '2026-11-07' },
    { id: 'stl_batch_20261109_curr', gross: 18450000, fee: 369000, tax: 66420, net: 18014580, status: 'PROCESSING', bankAccount: 'HDFC Bank •••• 4091', date: 'Today (T+1)' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Settlements & Payouts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Reconciled bank payout batches, platform fee deductions, and net transfer receipts.
          </p>
        </div>
        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
          Download Tax Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3]">
          <span className="text-xs font-semibold text-slate-500">Available For Next Payout</span>
          <p className="text-2xl font-extrabold text-[#16A36A] mt-2">₹1,801,458.00</p>
          <span className="text-xs text-slate-400 mt-1 block">Scheduled for 11:59 PM IST</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3]">
          <span className="text-xs font-semibold text-slate-500">Total Settled Volume (30D)</span>
          <p className="text-2xl font-extrabold text-[#172B4D] mt-2">₹78,795,480.00</p>
          <span className="text-xs text-slate-400 mt-1 block">Across 30 consecutive batches</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3]">
          <span className="text-xs font-semibold text-slate-500">Destination Account</span>
          <p className="text-base font-bold text-[#172B4D] mt-2">HDFC Bank •••• 4091</p>
          <span className="text-xs text-emerald-600 font-semibold mt-1 block">✓ Verified Current Account</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E2EAF3]">
          <h3 className="text-sm font-bold text-[#172B4D]">Settlement Batches</h3>
        </div>
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
            <tr>
              <th className="py-3 px-4">Batch ID</th>
              <th className="py-3 px-4">Gross Collected</th>
              <th className="py-3 px-4">Fees & Taxes</th>
              <th className="py-3 px-4">Net Payout</th>
              <th className="py-3 px-4">Destination</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Settlement Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAF3]">
            {settlements.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{s.id}</td>
                <td className="py-3.5 px-4 font-bold text-[#172B4D]">₹{(s.gross / 100).toFixed(2)}</td>
                <td className="py-3.5 px-4 text-slate-500">₹{((s.fee + s.tax) / 100).toFixed(2)}</td>
                <td className="py-3.5 px-4 font-extrabold text-[#16A36A]">₹{(s.net / 100).toFixed(2)}</td>
                <td className="py-3.5 px-4">{s.bankAccount}</td>
                <td className="py-3.5 px-4"><Badge status={s.status} /></td>
                <td className="py-3.5 px-4 text-slate-400">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
