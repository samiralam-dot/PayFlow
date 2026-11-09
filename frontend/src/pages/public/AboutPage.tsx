import React from 'react';
import { Shield, Cpu, Scale, Lock } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-[#0070E0] uppercase tracking-wider">About PayFlow</span>
        <h1 className="text-4xl font-extrabold text-[#172B4D] tracking-tight">
          Payments Made Simple. <br />
          Infrastructure Made Powerful.
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          PayFlow was architected to solve the hardest problems in modern fintech: multi-acquirer fragmentation, double charges during network partitions, phantom ledger discrepancies, and webhook unreliability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-[#E2EAF3] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0070E0] flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#172B4D]">Modular Orchestration Monolith</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We avoid premature microservice complexity. PayFlow starts with clearly segregated bounded contexts (Auth, Orders, Payments, Ledger, Routing, Webhooks) that can scale as a unified high-throughput monolith and be extracted when operational boundaries demand it.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#E2EAF3] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#16A36A] flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[#172B4D]">Mathematical Correctness</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            In financial systems, loose database counters lead to catastrophic audit failures. PayFlow treats every rupee or cent as an immutable entry across balanced double-entry accounts with invariant checks at the database layer.
          </p>
        </div>
      </div>

      <div className="bg-[#00205B] text-white p-8 sm:p-10 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
          <Shield className="w-4 h-4" /> Non-Custodial Architecture Disclosure
        </div>
        <h3 className="text-xl font-bold">Scope & Responsibility Notice</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          PayFlow acts exclusively as a technical payment orchestration and transaction reconciliation engine. It does not take custody of customer funds, store raw cardholder CVVs, or operate as an autonomous card network or central clearing bank. All financial processing executes via authorized acquiring partners (e.g. Razorpay).
        </p>
      </div>
    </div>
  );
};
