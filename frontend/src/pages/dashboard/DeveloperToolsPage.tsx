import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import {
  Code2,
  Play,
  RotateCcw,
  AlertTriangle,
  Clock,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  Copy,
  Check
} from 'lucide-react';

export const DeveloperToolsPage: React.FC = () => {
  const [scenario, setScenario] = useState<string>('SUCCESS');
  const [latencyMs, setLatencyMs] = useState<number>(250);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'simulator' | 'inspector'>('simulator');
  const [simulatedTxId, setSimulatedTxId] = useState<string>('pay_sim_01J9A8B7');

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationLog([
      `[T+0ms] Dispatched simulation scenario: ${scenario}`,
      `[T+20ms] Applying artificial latency delay: ${latencyMs}ms...`
    ]);

    setTimeout(() => {
      let finalState = 'SUCCESS';
      let outcomeMessage = 'Payment settled and authoritatively confirmed';

      if (scenario === 'NETWORK_TIMEOUT') {
        finalState = 'TIMEOUT';
        outcomeMessage = 'Provider connection dropped. Initiating status reconciliation query...';
      } else if (scenario === 'BANK_TIMEOUT') {
        finalState = 'PENDING';
        outcomeMessage = 'Bank gateway did not return instant capture. Polling scheduled.';
      } else if (scenario === 'FAILED') {
        finalState = 'FAILED';
        outcomeMessage = 'Declined by issuer: Insufficient funds or velocity exceed';
      } else if (scenario === 'DUPLICATE_WEBHOOK') {
        finalState = 'SUCCESS';
        outcomeMessage = 'Duplicate webhook received; idempotency filter suppressed redundant ledger posting.';
      }

      setSimulationLog((prev) => [
        ...prev,
        `[T+${latencyMs}ms] Provider execution finished with status: ${finalState}`,
        `[T+${latencyMs + 25}ms] Result: ${outcomeMessage}`,
        `[T+${latencyMs + 40}ms] Webhook dispatch queued to subscribed endpoint`
      ]);
      setIsSimulating(false);
    }, latencyMs);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#172B4D]">Payment Chaos & Simulation Suite</h1>
          <p className="text-xs text-slate-500 mt-1">
            Simulate realistic edge cases, bank timeouts, network partitions, and idempotency guarantees in sandbox.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-[#172B4D] uppercase tracking-wider">
            Simulation Parameters
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">Edge Case Scenario</label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D] font-semibold cursor-pointer"
              >
                <option value="SUCCESS">Standard Successful Payment</option>
                <option value="FAILED">Card / UPI Issuer Declined</option>
                <option value="BANK_TIMEOUT">Bank Gateway Ambiguous Timeout</option>
                <option value="NETWORK_TIMEOUT">Socket / Network Partition</option>
                <option value="DUPLICATE_WEBHOOK">Duplicate Webhook Injection</option>
                <option value="OUT_OF_ORDER_WEBHOOK">Out-Of-Order Event Delivery</option>
                <option value="CONCURRENT_DOUBLE_CLICK">Concurrent Double-Click Race</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#172B4D] mb-1.5">
                <span>Injected Latency</span>
                <span className="text-[#0070E0] font-mono">{latencyMs} ms</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={latencyMs}
                onChange={(e) => setLatencyMs(Number(e.target.value))}
                className="w-full accent-[#0070E0] cursor-pointer"
              />
            </div>

            <Button
              variant="primary"
              className="w-full"
              isLoading={isSimulating}
              onClick={runSimulation}
              icon={<Play className="w-4 h-4" />}
            >
              Trigger Simulation Run
            </Button>
          </div>
        </div>

        {/* Live Execution Console */}
        <div className="lg:col-span-2 bg-[#00205B] text-slate-100 rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white">simulator.telemetry_stream</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                SANDBOX ISOLATED
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-emerald-300 min-h-[160px]">
              {simulationLog.length === 0 ? (
                <div className="text-slate-500 py-10 text-center">
                  Select a scenario on the left and click "Trigger Simulation Run" to inspect real-time state machine transitions.
                </div>
              ) : (
                simulationLog.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
            <span>Idempotency-Key: idemp_{Math.random().toString(36).substring(2, 9)}</span>
            <span className="text-emerald-400 font-bold">Zero Live Funds Moved</span>
          </div>
        </div>
      </div>
    </div>
  );
};
