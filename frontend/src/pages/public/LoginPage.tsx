import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('merchant@apexretail.io');
  const [password, setPassword] = useState('DemoSecret123!');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <Logo className="h-8" />
          </Link>
          <h2 className="text-2xl font-extrabold text-[#172B4D]">Merchant Portal Login</h2>
          <p className="text-xs text-slate-500">
            Sign in to access your payment orchestration command center.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E2EAF3] shadow-md space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Business Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                  placeholder="merchant@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#172B4D]">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#0070E0] hover:underline font-semibold">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading} icon={<ArrowRight className="w-4 h-4" />}>
              Sign In to Console
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E2EAF3] text-center text-xs text-slate-500">
            Don't have a merchant account?{' '}
            <Link to="/signup" className="text-[#0070E0] font-bold hover:underline">
              Register here
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Secure Multi-Factor & Isolated Tenant Session
        </div>
      </div>
    </div>
  );
};
