import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Settings, Shield, Building, Bell, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [businessName, setBusinessName] = useState('Apex Retail Technologies Ltd');
  const [supportEmail, setSupportEmail] = useState('support@apexretail.io');
  const [routingPolicy, setRoutingPolicy] = useState('lowest_latency');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-[#172B4D]">Merchant Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure business profile, acquirer routing policies, and notification preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Profile */}
        <div className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E2EAF3]">
            <Building className="w-4 h-4 text-[#0070E0]" />
            <h3 className="font-bold text-sm text-[#172B4D]">Merchant Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Legal Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D]"
              />
            </div>
          </div>
        </div>

        {/* Smart Routing Configuration */}
        <div className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E2EAF3]">
            <Settings className="w-4 h-4 text-[#0070E0]" />
            <h3 className="font-bold text-sm text-[#172B4D]">Payment Orchestration Policies</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Primary Routing Strategy</label>
            <select
              value={routingPolicy}
              onChange={(e) => setRoutingPolicy(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D] cursor-pointer"
            >
              <option value="lowest_latency">Lowest Latency (Real-time P95 &lt; 200ms)</option>
              <option value="highest_success_rate">Highest Success Rate (1-hour window)</option>
              <option value="lowest_fee">Lowest Processing Fee Matrix</option>
              <option value="round_robin">Weighted Round-Robin (50% Razorpay / 50% Standby)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary" icon={<Save className="w-3.5 h-3.5" />}>
            Save Preferences
          </Button>
          {saved && (
            <span className="text-xs font-bold text-[#16A36A]">
              ✓ Settings saved successfully.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
