import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Shield, Lock, Terminal, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00205B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Logo light className="h-8" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              PayFlow is an enterprise payment orchestration and financial infrastructure platform.
              Seamlessly unify providers, ledger accounting, smart routing, and real-time reconciliation.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 text-emerald-400 border border-slate-700">
                <Activity className="w-3.5 h-3.5" /> All Systems Operational
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> End-to-End TLS 1.3
              </span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/features" className="hover:text-cyan-400 transition-colors">
                  Smart Routing
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-cyan-400 transition-colors">
                  Double-Entry Ledger
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-cyan-400 transition-colors">
                  Webhook Engine
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-cyan-400 transition-colors">
                  Payment Simulator
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-cyan-400 transition-colors">
                  Transparent Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Developers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/docs" className="hover:text-cyan-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <a href="http://localhost:4000/api-docs" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  OpenAPI Spec <Terminal className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-cyan-400 transition-colors">
                  System Architecture
                </Link>
              </li>
              <li>
                <a href="http://localhost:4000/metrics" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                  Prometheus Metrics
                </a>
              </li>
              <li>
                <Link to="/dashboard/simulator" className="hover:text-cyan-400 transition-colors">
                  Sandbox Testing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Notice */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              PayFlow is a payment orchestration platform integrating external acquirers and payment service providers. PayFlow does not independently hold banking reserves or cardholder CVV records.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" /> Non-custodial orchestration
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} PayFlow Inc. Payments made simple. Infrastructure made powerful.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Security Protocol</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Privacy Framework</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
