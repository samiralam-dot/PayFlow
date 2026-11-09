import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Mail, MessageSquare, Building2, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    volume: '₹1M - ₹10M monthly',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#0070E0] uppercase tracking-wider">
          Integration Engineering
        </span>
        <h1 className="text-3xl font-extrabold text-[#172B4D]">Speak with Infrastructure Architects</h1>
        <p className="text-sm text-slate-600">
          Whether you're migrating from legacy single-gateway setups or designing high-volume payment routing, our engineering team is here to assist.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2EAF3] p-8 sm:p-12 shadow-xs">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A36A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#172B4D]">Inquiry Received</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Our solutions team has logged your request with correlation ID. An integration specialist will reach out to <strong>{formData.email}</strong> shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-2">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="vikram@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-2">Company / Entity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nexus Commerce Pvt Ltd"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-2">Expected Monthly Volume</label>
                <select
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white cursor-pointer"
                >
                  <option>Under ₹1,000,000</option>
                  <option>₹1M - ₹10M monthly</option>
                  <option>₹10M - ₹50M monthly</option>
                  <option>₹50M+ monthly (Enterprise Custom)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-2">Architecture / Integration Needs</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your current payment processors, multi-acquirer needs, or high-throughput requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Submit Integration Inquiry
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
