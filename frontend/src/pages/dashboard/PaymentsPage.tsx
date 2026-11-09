import React from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { CreditCard, Plus, Filter, Search, Download } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const payments = [
    { id: 'pay_rzp_live_992144', orderId: 'ord_shop_2026110901', amount: 450000, method: 'UPI', provider: 'Razorpay', status: 'SUCCESS', fee: 9000, time: '16:45:12' },
    { id: 'pay_rzp_live_992145', orderId: 'ord_shop_2026110902', amount: 1250000, method: 'Card', provider: 'Razorpay', status: 'SUCCESS', fee: 25000, time: '16:32:00' },
    { id: 'pay_mock_sim_44129', orderId: 'ord_shop_2026110903', amount: 320000, method: 'NetBanking', provider: 'MockProvider', status: 'PROCESSING', fee: 6400, time: '16:20:45' },
    { id: 'pay_rzp_live_992146', orderId: 'ord_shop_2026110904', amount: 890000, method: 'Card', provider: 'Razorpay', status: 'FAILED', fee: 0, time: '15:55:18' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Payments Engine</h1>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end payment lifecycle operations, provider signature verifications, and state machines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export Payments
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
            <tr>
              <th className="py-3 px-4">Payment ID</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Gross Amount</th>
              <th className="py-3 px-4">Instrument</th>
              <th className="py-3 px-4">Acquiring Provider</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAF3]">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{p.id}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{p.orderId}</td>
                <td className="py-3.5 px-4 font-bold text-[#172B4D]">₹{(p.amount / 100).toFixed(2)}</td>
                <td className="py-3.5 px-4 uppercase">{p.method}</td>
                <td className="py-3.5 px-4 font-mono">{p.provider}</td>
                <td className="py-3.5 px-4"><Badge status={p.status} /></td>
                <td className="py-3.5 px-4 text-slate-400">{p.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
