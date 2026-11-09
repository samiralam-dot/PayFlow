import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { KeyRound, Plus, Copy, Check, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export const ApiKeysPage: React.FC = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const keys = [
    {
      name: 'Development Sandbox Key',
      prefix: 'pk_test_apex_4910',
      secretPrefix: 'sk_test_••••••••••••••••3a9b',
      created: '2026-11-01',
      lastUsed: '2 minutes ago',
      environment: 'TEST'
    },
    {
      name: 'Production Primary Server Key',
      prefix: 'pk_live_apex_8921',
      secretPrefix: 'sk_live_••••••••••••••••7c4d',
      created: '2026-11-01',
      lastUsed: '1 second ago',
      environment: 'LIVE'
    }
  ];

  const handleCopy = (val: string, keyId: string) => {
    navigator.clipboard.writeText(val);
    setCopied(keyId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Merchant API Keys</h1>
          <p className="text-xs text-slate-500 mt-1">
            Publishable and Secret credentials for authentication, SDK requests, and outbox reconciliation.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Generate New Secret Key
        </Button>
      </div>

      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
        <p className="font-bold text-[#003087]">Security Policy Notice:</p>
        <p>
          API secrets are hashed with SHA-256 upon generation and never stored or displayed in plaintext. If a secret is compromised, immediately rotate it using zero-downtime key rotation.
        </p>
      </div>

      <div className="space-y-4">
        {keys.map((k) => (
          <div key={k.prefix} className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#172B4D]">{k.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    k.environment === 'LIVE' ? 'bg-emerald-100 text-[#16A36A]' : 'bg-amber-100 text-[#F4A340]'
                  }`}>
                    {k.environment}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Last used: {k.lastUsed}</p>
              </div>

              <Button variant="outline" size="sm" className="text-rose-600 hover:text-rose-700">
                Revoke Key
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-[#F4F8FC] rounded-xl border border-[#E2EAF3] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Publishable Key</span>
                  <p className="font-mono text-xs font-bold text-[#172B4D]">{k.prefix}</p>
                </div>
                <button
                  onClick={() => handleCopy(k.prefix, `${k.prefix}_pub`)}
                  className="p-1.5 text-slate-400 hover:text-[#0070E0] cursor-pointer"
                >
                  {copied === `${k.prefix}_pub` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3 bg-[#F4F8FC] rounded-xl border border-[#E2EAF3] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Secret Key</span>
                  <p className="font-mono text-xs font-bold text-[#172B4D]">{k.secretPrefix}</p>
                </div>
                <button
                  onClick={() => handleCopy(k.secretPrefix, `${k.prefix}_sec`)}
                  className="p-1.5 text-slate-400 hover:text-[#0070E0] cursor-pointer"
                >
                  {copied === `${k.prefix}_sec` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
