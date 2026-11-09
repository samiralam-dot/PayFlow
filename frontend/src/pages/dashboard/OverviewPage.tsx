import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Transaction, MetricOverview } from '../../types';
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Percent,
  Wallet,
  Download,
  Filter,
  Search,
  Eye,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const OverviewPage: React.FC = () => {
  const { isTestMode } = useOutletContext<{ isTestMode: boolean; dateRange: string }>();

  // Mock initial transactions data matching production schema
  const initialTransactions: Transaction[] = [
    {
      id: 'tx_01J9A8B7C6D5E4F3',
      paymentId: 'pay_rzp_live_992144',
      orderId: 'ord_shop_2026110901',
      customerName: 'Ananya Deshmukh',
      customerEmail: 'ananya.d@gmail.com',
      amount: 450000, // ₹4,500.00
      currency: 'INR',
      paymentMethod: 'upi',
      provider: 'razorpay',
      status: 'SUCCESS',
      createdAt: '2026-11-09T16:45:12Z',
      fee: 9000,
      tax: 1620
    },
    {
      id: 'tx_01J9A8B7C6D5E4F4',
      paymentId: 'pay_rzp_live_992145',
      orderId: 'ord_shop_2026110902',
      customerName: 'Rohan Mehra',
      customerEmail: 'rohan.m@outlook.com',
      amount: 1250000, // ₹12,500.00
      currency: 'INR',
      paymentMethod: 'card',
      provider: 'razorpay',
      status: 'SUCCESS',
      createdAt: '2026-11-09T16:32:00Z',
      fee: 25000,
      tax: 4500
    },
    {
      id: 'tx_01J9A8B7C6D5E4F5',
      paymentId: 'pay_mock_sim_44129',
      orderId: 'ord_shop_2026110903',
      customerName: 'Pooja Hegde',
      customerEmail: 'pooja.h@techcorp.in',
      amount: 320000, // ₹3,200.00
      currency: 'INR',
      paymentMethod: 'netbanking',
      provider: 'mock_provider',
      status: 'PROCESSING',
      createdAt: '2026-11-09T16:20:45Z',
      fee: 6400,
      tax: 1152
    },
    {
      id: 'tx_01J9A8B7C6D5E4F6',
      paymentId: 'pay_rzp_live_992146',
      orderId: 'ord_shop_2026110904',
      customerName: 'Aditya Verma',
      customerEmail: 'aditya.v@hotmail.com',
      amount: 890000, // ₹8,900.00
      currency: 'INR',
      paymentMethod: 'card',
      provider: 'razorpay',
      status: 'FAILED',
      errorMessage: 'Card issuer network declined authentication',
      createdAt: '2026-11-09T15:55:18Z',
      fee: 0,
      tax: 0
    },
    {
      id: 'tx_01J9A8B7C6D5E4F7',
      paymentId: 'pay_rzp_live_992147',
      orderId: 'ord_shop_2026110905',
      customerName: 'Kavita Nair',
      customerEmail: 'kavita.nair@corp.org',
      amount: 675000, // ₹6,750.00
      currency: 'INR',
      paymentMethod: 'upi',
      provider: 'razorpay',
      status: 'REFUNDED',
      createdAt: '2026-11-09T15:10:30Z',
      fee: 13500,
      tax: 2430
    },
    {
      id: 'tx_01J9A8B7C6D5E4F8',
      paymentId: 'pay_mock_sim_44130',
      orderId: 'ord_shop_2026110906',
      customerName: 'Kunal Kapoor',
      customerEmail: 'kunal.k@gmail.com',
      amount: 150000, // ₹1,500.00
      currency: 'INR',
      paymentMethod: 'wallet',
      provider: 'mock_provider',
      status: 'SUCCESS',
      createdAt: '2026-11-09T14:48:19Z',
      fee: 3000,
      tax: 540
    }
  ];

  const metrics: MetricOverview = {
    totalVolume: 849200000, // ₹8,492,000.00 in minor paise
    totalTransactions: 1420,
    successfulPayments: 1386,
    failedPayments: 24,
    pendingPayments: 10,
    successRate: 97.6,
    averageTransactionValue: 598000, // ₹5,980.00
    availableBalance: 421500000, // ₹4,215,000.00
    pendingSettlement: 184500000 // ₹1,845,000.00
  };

  const volumeChartData = [
    { time: '00:00', volume: 180000, count: 42 },
    { time: '04:00', volume: 90000, count: 18 },
    { time: '08:00', volume: 450000, count: 110 },
    { time: '12:00', volume: 1200000, count: 280 },
    { time: '16:00', volume: 1650000, count: 390 },
    { time: '20:00', volume: 980000, count: 210 }
  ];

  const methodDistribution = [
    { name: 'UPI (QR / Intent)', value: 58, color: '#0070E0' },
    { name: 'Credit / Debit Cards', value: 28, color: '#003087' },
    { name: 'NetBanking', value: 9, color: '#00A8E8' },
    { name: 'Wallets', value: 5, color: '#64748B' }
  ];

  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [providerFilter, setProviderFilter] = useState('ALL');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredTransactions = initialTransactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || tx.status === statusFilter;
    const matchesProvider = providerFilter === 'ALL' || tx.provider === providerFilter;

    return matchesSearch && matchesStatus && matchesProvider;
  });

  const exportToCSV = () => {
    const headers = ['Transaction ID', 'Payment ID', 'Order ID', 'Customer', 'Amount', 'Currency', 'Method', 'Provider', 'Status', 'Date'];
    const rows = filteredTransactions.map((tx) => [
      tx.id,
      tx.paymentId,
      tx.orderId,
      `"${tx.customerName}"`,
      (tx.amount / 100).toFixed(2),
      tx.currency,
      tx.paymentMethod,
      tx.provider,
      tx.status,
      tx.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `payflow_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Overview Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#172B4D]">Platform Overview</h1>
            {isTestMode ? (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Sandbox Environment
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Production Live
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time transaction orchestration metrics, provider routing health, and ledger balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard/developer-tools">
            <Button variant="outline" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
              Test Simulator
            </Button>
          </Link>
          <Button variant="primary" size="sm" onClick={exportToCSV} icon={<Download className="w-3.5 h-3.5" />}>
            Export Reports
          </Button>
        </div>
      </div>

      {/* 8 Overview Metric Cards (Section 5 requirements) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total payment volume */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Payment Volume</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0070E0] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#172B4D] mt-2">
            ₹{(metrics.totalVolume / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#16A36A] font-semibold mt-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs last cycle
          </div>
        </div>

        {/* 2. Total transactions */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Transactions</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#172B4D] mt-2">
            {metrics.totalTransactions.toLocaleString()}
          </p>
          <span className="text-xs text-slate-400 mt-1.5 block">Across all routed channels</span>
        </div>

        {/* 3. Successful payments */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Successful Payments</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16A36A] flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#16A36A] mt-2">
            {metrics.successfulPayments.toLocaleString()}
          </p>
          <span className="text-xs text-slate-400 mt-1.5 block">Captured & reconciled</span>
        </div>

        {/* 4. Failed payments */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Failed Payments</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#DC3545] flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#DC3545] mt-2">
            {metrics.failedPayments.toLocaleString()}
          </p>
          <span className="text-xs text-slate-400 mt-1.5 block">Issuer declines & timeouts</span>
        </div>

        {/* 5. Pending payments */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Payments</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F4A340] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#F4A340] mt-2">
            {metrics.pendingPayments.toLocaleString()}
          </p>
          <span className="text-xs text-slate-400 mt-1.5 block">Awaiting bank verification</span>
        </div>

        {/* 6. Payment success rate */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Payment Success Rate</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#00A8E8] flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#172B4D] mt-2">
            {metrics.successRate}%
          </p>
          <span className="text-xs text-[#16A36A] font-semibold mt-1.5 block">Above SLA Target (95%)</span>
        </div>

        {/* 7. Average transaction value */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Average Transaction Value</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#003087] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#172B4D] mt-2">
            ₹{(metrics.averageTransactionValue / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-xs text-slate-400 mt-1.5 block">Cart checkout average</span>
        </div>

        {/* 8. Available balance */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAF3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Available Ledger Balance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16A36A] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#16A36A] mt-2">
            ₹{(metrics.availableBalance / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <span className="text-xs text-slate-400 mt-1.5 block">Eligible for settlement payout</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Volume Over Time */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#172B4D]">Payment Volume (Hourly Stream)</h3>
              <p className="text-xs text-slate-500">Volume routed through active providers today</p>
            </div>
            <span className="text-xs font-bold text-[#0070E0] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0070E0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0070E0" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val ?? 0).toLocaleString()}`, 'Volume']}
                  contentStyle={{
                    backgroundColor: '#00205B',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#0070E0"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#volGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white rounded-2xl border border-[#E2EAF3] p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#172B4D]">Payment Method Split</h3>
            <p className="text-xs text-slate-500">Distribution across payment instruments</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={methodDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                >
                  {methodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Share']}
                  contentStyle={{
                    backgroundColor: '#00205B',
                    borderRadius: '8px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-[#E2EAF3] pt-3 text-xs">
            {methodDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-[#172B4D]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Table with Search, Filter, Pagination, Details Modal (Section 5) */}
      <div className="bg-white rounded-2xl border border-[#E2EAF3] shadow-xs overflow-hidden space-y-4">
        {/* Table Filters & Toolbar */}
        <div className="p-5 border-b border-[#E2EAF3] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#172B4D]">Transaction Stream</h3>
            <p className="text-xs text-slate-500">Live authoritative payment events and ledger journal entries</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search tx, payment, or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white text-[#172B4D] w-52"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D] font-medium cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUCCESS">Success</option>
              <option value="PROCESSING">Processing</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>

            {/* Provider Filter */}
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] text-[#172B4D] font-medium cursor-pointer"
            >
              <option value="ALL">All Providers</option>
              <option value="razorpay">Razorpay</option>
              <option value="mock_provider">MockProvider</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-[#F4F8FC] text-slate-500 uppercase tracking-wider font-semibold border-b border-[#E2EAF3]">
              <tr>
                <th className="py-3 px-4">Payment ID / Order</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EAF3]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No transactions match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-[#172B4D]">{tx.paymentId}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{tx.orderId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#172B4D]">{tx.customerName}</div>
                      <div className="text-[11px] text-slate-400">{tx.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#172B4D]">
                        ₹{(tx.amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-slate-400">Fee: ₹{(tx.fee / 100).toFixed(2)}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium uppercase text-slate-700">
                      {tx.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {tx.provider === 'razorpay' ? 'Razorpay' : 'MockProvider'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={tx.status} />
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                      {new Date(tx.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="inline-flex items-center gap-1 text-[#0070E0] hover:text-[#005BB8] font-semibold text-xs cursor-pointer p-1 rounded hover:bg-blue-50"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#E2EAF3] flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} entries</span>
          <div className="flex items-center gap-2">
            <button disabled className="p-1.5 rounded-lg border border-[#E2EAF3] text-slate-400 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-lg bg-[#0070E0] text-white font-bold">1</span>
            <button disabled className="p-1.5 rounded-lg border border-[#E2EAF3] text-slate-400 disabled:opacity-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#E2EAF3] shadow-2xl max-w-xl w-full p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EAF3]">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Payment Lifecycle Inspector
                </span>
                <h3 className="text-lg font-bold text-[#172B4D]">{selectedTx.paymentId}</h3>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#172B4D] hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lifecycle Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#172B4D] uppercase tracking-wider">
                State Transition Timeline
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-slate-400 mt-1.5" />
                  <div className="flex-1">
                    <p className="font-bold text-[#172B4D]">CREATED</p>
                    <p className="text-[11px] text-slate-500">Order created with minor amount {selectedTx.amount} paise.</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">T+0ms</span>
                </div>

                <div className="flex items-start gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-[#0070E0] mt-1.5" />
                  <div className="flex-1">
                    <p className="font-bold text-[#172B4D]">INITIATED & ROUTED</p>
                    <p className="text-[11px] text-slate-500">
                      Dispatched to {selectedTx.provider === 'razorpay' ? 'Razorpay Adapter' : 'MockProvider'}.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">T+18ms</span>
                </div>

                <div className={`flex items-start gap-3 p-2.5 rounded-xl border ${
                  selectedTx.status === 'SUCCESS' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    selectedTx.status === 'SUCCESS' ? 'bg-[#16A36A]' : 'bg-[#DC3545]'
                  }`} />
                  <div className="flex-1">
                    <p className={`font-bold ${selectedTx.status === 'SUCCESS' ? 'text-[#16A36A]' : 'text-[#DC3545]'}`}>
                      {selectedTx.status}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {selectedTx.errorMessage || 'HMAC Signature verified from authoritative webhook callback.'}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">T+210ms</span>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F4F8FC] p-4 rounded-2xl border border-[#E2EAF3]">
              <div>
                <span className="text-slate-500">Gross Amount:</span>
                <p className="font-bold text-[#172B4D] text-sm">₹{(selectedTx.amount / 100).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-slate-500">Customer:</span>
                <p className="font-semibold text-[#172B4D]">{selectedTx.customerName}</p>
              </div>
              <div>
                <span className="text-slate-500">Orchestration Fee:</span>
                <p className="font-semibold text-[#172B4D]">₹{(selectedTx.fee / 100).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-slate-500">Net Merchant Credit:</span>
                <p className="font-bold text-[#16A36A]">₹{((selectedTx.amount - selectedTx.fee) / 100).toFixed(2)}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => setSelectedTx(null)}>
              Close Inspector
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
