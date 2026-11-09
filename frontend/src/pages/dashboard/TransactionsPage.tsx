import React, { useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Search, Download, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sampleRows = [
    { id: 'tx_9921_1', amount: 450000, method: 'UPI', provider: 'Razorpay', status: 'SUCCESS', customer: 'Ananya Deshmukh', date: '2026-11-09 16:45' },
    { id: 'tx_9921_2', amount: 1250000, method: 'Card', provider: 'Razorpay', status: 'SUCCESS', customer: 'Rohan Mehra', date: '2026-11-09 16:32' },
    { id: 'tx_9921_3', amount: 320000, method: 'NetBanking', provider: 'MockProvider', status: 'PROCESSING', customer: 'Pooja Hegde', date: '2026-11-09 16:20' },
    { id: 'tx_9921_4', amount: 890000, method: 'Card', provider: 'Razorpay', status: 'FAILED', customer: 'Aditya Verma', date: '2026-11-09 15:55' },
    { id: 'tx_9921_5', amount: 675000, method: 'UPI', provider: 'Razorpay', status: 'REFUNDED', customer: 'Kavita Nair', date: '2026-11-09 15:10' },
    { id: 'tx_9921_6', amount: 150000, method: 'Wallet', provider: 'MockProvider', status: 'SUCCESS', customer: 'Kunal Kapoor', date: '2026-11-09 14:48' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Transactions Ledger</h1>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative transactional entries posted across acquiring gateways.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E2EAF3] flex items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter:</span>
            <select className="text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl px-2.5 py-1.5 text-[#172B4D] cursor-pointer">
              <option>All Methods</option>
              <option>UPI</option>
              <option>Card</option>
              <option>NetBanking</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EAF3]">
              {sampleRows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{r.id}</td>
                  <td className="py-3.5 px-4 font-medium text-[#172B4D]">{r.customer}</td>
                  <td className="py-3.5 px-4 font-bold text-[#172B4D]">₹{(r.amount / 100).toFixed(2)}</td>
                  <td className="py-3.5 px-4">{r.method}</td>
                  <td className="py-3.5 px-4 font-mono">{r.provider}</td>
                  <td className="py-3.5 px-4"><Badge status={r.status} /></td>
                  <td className="py-3.5 px-4 text-slate-400">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
