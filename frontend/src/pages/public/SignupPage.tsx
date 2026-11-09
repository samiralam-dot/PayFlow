import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import { Lock, Mail, Building, ArrowRight, ShieldCheck } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <Logo className="h-8" />
          </Link>
          <h2 className="text-2xl font-extrabold text-[#172B4D]">Create Merchant Account</h2>
          <p className="text-xs text-slate-500">
            Provision your multi-tenant payment gateway and sandbox keys.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E2EAF3] shadow-md space-y-5">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Legal Business Name</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                  placeholder="Apex Global Technologies Pvt Ltd"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Business Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                  placeholder="billing@apextech.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Master Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                  placeholder="Minimum 8 characters"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isLoading} icon={<ArrowRight className="w-4 h-4" />}>
              Create Merchant Account
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E2EAF3] text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0070E0] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Non-custodial orchestration. Sandboxed instantly.
        </div>
      </div>
    </div>
  );
};
