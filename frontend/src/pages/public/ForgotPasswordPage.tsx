import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <Logo className="h-8" />
          </Link>
          <h2 className="text-2xl font-extrabold text-[#172B4D]">Reset Password</h2>
          <p className="text-xs text-slate-500">
            Enter your merchant business email to receive secure reset instructions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E2EAF3] shadow-md space-y-5">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#16A36A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#172B4D]">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                If an account exists for <strong>{email}</strong>, a cryptographically signed recovery token has been sent.
              </p>
              <Link to="/login" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <Button type="submit" variant="primary" className="w-full mt-2">
                Send Recovery Instructions
              </Button>

              <div className="pt-4 border-t border-[#E2EAF3] text-center">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-[#0070E0] font-semibold hover:underline">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
