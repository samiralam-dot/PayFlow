import React from 'react';
import { Button } from '../../components/Button';
import { Users, Plus, Mail } from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const customers = [
    { id: 'cust_01', name: 'Ananya Deshmukh', email: 'ananya.d@gmail.com', spent: 1840000, orders: 4, lastActive: 'Today' },
    { id: 'cust_02', name: 'Rohan Mehra', email: 'rohan.m@outlook.com', spent: 3250000, orders: 8, lastActive: 'Today' },
    { id: 'cust_03', name: 'Pooja Hegde', email: 'pooja.h@techcorp.in', spent: 890000, orders: 2, lastActive: 'Yesterday' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Customer Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Tokenized customer identifiers, lifetime transactional value, and saved instrument profiles.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Add Customer
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
            <tr>
              <th className="py-3 px-4">Customer ID</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Lifetime Volume</th>
              <th className="py-3 px-4">Total Orders</th>
              <th className="py-3 px-4">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAF3]">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{c.id}</td>
                <td className="py-3.5 px-4 font-semibold text-[#172B4D]">{c.name}</td>
                <td className="py-3.5 px-4 text-slate-500">{c.email}</td>
                <td className="py-3.5 px-4 font-bold text-[#16A36A]">₹{(c.spent / 100).toFixed(2)}</td>
                <td className="py-3.5 px-4">{c.orders} orders</td>
                <td className="py-3.5 px-4 text-slate-400">{c.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
