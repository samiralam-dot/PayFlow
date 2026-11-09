import React from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Link2, Plus, Copy, Check } from 'lucide-react';

export const PaymentLinksPage: React.FC = () => {
  const links = [
    { id: 'plink_9921', title: 'Consulting Retainer - Nov', amount: 5000000, slug: 'payflow.me/apex/retainer-nov', status: 'ACTIVE', paidCount: 1, created: '2026-11-05' },
    { id: 'plink_9922', title: 'Software License Annual', amount: 12000000, slug: 'payflow.me/apex/lic-annual', status: 'ACTIVE', paidCount: 3, created: '2026-11-01' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Instant Payment Links</h1>
          <p className="text-xs text-slate-500 mt-1">
            Zero-code hosted checkout links with smart routing across cards, UPI, and netbanking.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Create Payment Link
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-[#F4F8FC] text-slate-500 uppercase font-semibold border-b border-[#E2EAF3]">
            <tr>
              <th className="py-3 px-4">Link ID</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">URL Slug</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Paid Count</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAF3]">
            {links.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-[#172B4D]">{l.id}</td>
                <td className="py-3.5 px-4 font-semibold text-[#172B4D]">{l.title}</td>
                <td className="py-3.5 px-4 font-bold text-[#172B4D]">₹{(l.amount / 100).toFixed(2)}</td>
                <td className="py-3.5 px-4 font-mono text-[#0070E0]">{l.slug}</td>
                <td className="py-3.5 px-4"><Badge status={l.status} /></td>
                <td className="py-3.5 px-4 font-bold">{l.paidCount} paid</td>
                <td className="py-3.5 px-4 text-right">
                  <button className="text-[#0070E0] font-semibold hover:underline cursor-pointer">
                    Copy Link
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
