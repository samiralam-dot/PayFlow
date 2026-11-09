import React, { useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { ShoppingBag, Plus, Search } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 'ord_shop_2026110901', amount: 450000, currency: 'INR', status: 'PAID', receipt: 'rcpt_99121', customer: 'Ananya Deshmukh', created: '2026-11-09 16:40' },
    { id: 'ord_shop_2026110902', amount: 1250000, currency: 'INR', status: 'PAID', receipt: 'rcpt_99122', customer: 'Rohan Mehra', created: '2026-11-09 16:28' },
    { id: 'ord_shop_2026110903', amount: 320000, currency: 'INR', status: 'PENDING', receipt: 'rcpt_99123', customer: 'Pooja Hegde', created: '2026-11-09 16:15' },
    { id: 'ord_shop_2026110904', amount: 890000, currency: 'INR', status: 'EXPIRED', receipt: 'rcpt_99124', customer: 'Aditya Verma', created: '2026-11-09 15:40' }
  ]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Order Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Pre-allocated payment orders with integer minor unit amounts and expiration controls.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Create Test Order
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E2EAF3]">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Receipt</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EAF3]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{o.id}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{o.receipt}</td>
                  <td className="py-3.5 px-4 font-medium text-[#172B4D]">{o.customer}</td>
                  <td className="py-3.5 px-4 font-bold text-[#172B4D]">₹{(o.amount / 100).toFixed(2)}</td>
                  <td className="py-3.5 px-4"><Badge status={o.status} /></td>
                  <td className="py-3.5 px-4 text-slate-400">{o.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
