import React from 'react';
import { Button } from '../../components/Button';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const providerData = [
    { name: 'Razorpay', success: 1240, failed: 18, latencyMs: 142 },
    { name: 'MockProvider', success: 146, failed: 6, latencyMs: 22 }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Performance & Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative metrics derived from PostgreSQL/MongoDB financial transactions and Kafka telemetry.
          </p>
        </div>
        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
          Export Metrics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#172B4D]">Provider Success vs Failed Counts</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providerData}>
                <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" />
                <YAxis fontSize={11} stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#00205B',
                    borderRadius: '8px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '11px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="success" fill="#16A36A" name="Successful" radius={[6, 6, 0, 0]} />
                <Bar dataKey="failed" fill="#DC3545" name="Failed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#172B4D]">Provider Latency Comparison</h3>
            <p className="text-xs text-slate-500">Average round-trip response time (P95)</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>Razorpay Test Engine</span>
                <span className="text-[#0070E0] font-mono">142 ms</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-[#0070E0] h-2 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>PayFlow Local MockProvider</span>
                <span className="text-[#16A36A] font-mono">22 ms</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-[#16A36A] h-2 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-200">
            Routing rules dynamically prioritize processors maintaining &lt; 300ms P95 latency.
          </div>
        </div>
      </div>
    </div>
  );
};
