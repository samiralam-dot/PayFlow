import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Logo } from '../components/Logo';
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  ShoppingBag,
  RotateCcw,
  Users,
  Link2,
  Landmark,
  BarChart3,
  ShieldAlert,
  Webhook,
  KeyRound,
  Code2,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Calendar,
  Layers,
  ExternalLink,
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [isTestMode, setIsTestMode] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const navigationItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Payments', path: '/dashboard/payments', icon: CreditCard },
    { label: 'Transactions', path: '/dashboard/transactions', icon: ArrowLeftRight },
    { label: 'Orders', path: '/dashboard/orders', icon: ShoppingBag },
    { label: 'Refunds', path: '/dashboard/refunds', icon: RotateCcw },
    { label: 'Customers', path: '/dashboard/customers', icon: Users },
    { label: 'Payment Links', path: '/dashboard/payment-links', icon: Link2 },
    { label: 'Settlements', path: '/dashboard/settlements', icon: Landmark },
    { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Risk Monitoring', path: '/dashboard/risk', icon: ShieldAlert },
    { label: 'Webhooks', path: '/dashboard/webhooks', icon: Webhook },
    { label: 'API Keys', path: '/dashboard/api-keys', icon: KeyRound },
    { label: 'Developer Tools', path: '/dashboard/developer-tools', icon: Code2 },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-[#F4F8FC]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#00205B] text-slate-300 border-r border-slate-800 shrink-0 z-30">
        {/* Brand */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-slate-800/80">
          <Link to="/">
            <Logo light className="h-7" />
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#0070E0]/20 text-[#00A8E8] border border-[#0070E0]/30">
            v4.0
          </span>
        </div>

        {/* Environment Badge / Switcher */}
        <div className="px-4 py-3 bg-[#001740] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isTestMode ? 'bg-[#F4A340] animate-pulse' : 'bg-[#16A36A]'
              }`}
            />
            <span className="text-xs font-semibold text-white">
              {isTestMode ? 'Test Environment' : 'Live Production'}
            </span>
          </div>
          <button
            onClick={() => setIsTestMode(!isTestMode)}
            className="text-[11px] text-cyan-400 hover:text-white font-medium underline underline-offset-2 cursor-pointer"
          >
            Switch
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-[#0070E0] text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Architecture & Interactive Explorer Link */}
        <div className="p-4 border-t border-slate-800/80 bg-[#001740]/60">
          <Link
            to="/architecture"
            className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#003087] to-[#0070E0] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-300" />
              <span>System Explorer</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="h-18 bg-white border-b border-[#E2EAF3] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Logo iconOnly className="w-7 h-7" />
          </div>

          {/* Global Search */}
          <div className="hidden sm:flex items-center relative w-72 md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search payment ID, order ID, or customer..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:bg-white transition-all text-[#172B4D]"
            />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Date Range Selector */}
            <div className="hidden md:flex items-center gap-2 bg-[#F4F8FC] border border-[#E2EAF3] rounded-xl px-3 py-1.5 text-xs text-[#172B4D]">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent border-none focus:outline-none font-medium cursor-pointer"
              >
                <option value="Today">Today</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Quarter">This Quarter</option>
                <option value="All Time">All Time</option>
              </select>
            </div>

            {/* Test Mode Indicator for top bar */}
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                isTestMode
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
              onClick={() => setIsTestMode(!isTestMode)}
              title="Click to toggle Test/Live"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isTestMode ? 'bg-[#F4A340]' : 'bg-[#16A36A]'
                }`}
              />
              <span className="hidden sm:inline">{isTestMode ? 'TEST MODE' : 'LIVE MODE'}</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-500 hover:text-[#003087] hover:bg-slate-100 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 bg-[#0070E0] rounded-full absolute top-1.5 right-1.5" />
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2EAF3] rounded-2xl shadow-xl p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2EAF3]">
                    <span className="text-xs font-bold text-[#172B4D]">Live System Events</span>
                    <span className="text-[10px] text-[#0070E0] font-semibold cursor-pointer">Mark read</span>
                  </div>
                  <div className="py-2 space-y-3">
                    <div className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#172B4D]">Webhook delivery succeeded</p>
                        <p className="text-[11px] text-slate-500">200 OK to https://api.store.com/webhooks</p>
                        <span className="text-[10px] text-slate-400">1 min ago</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0070E0] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ₹
                      </div>
                      <div>
                        <p className="font-semibold text-[#172B4D]">Settlement Batch Scheduled</p>
                        <p className="text-[11px] text-slate-500">T+1 automated payout running tonight</p>
                        <span className="text-[10px] text-slate-400">12 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Merchant Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#E2EAF3]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#003087] to-[#0070E0] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                PF
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-[#172B4D] leading-tight">Apex Retail Ltd</p>
                <p className="text-[11px] text-slate-500 leading-tight">mid_apex_live_8921</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet context={{ isTestMode, dateRange }} />
        </main>
      </div>

      {/* Mobile Sidebar Modal */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative flex flex-col w-72 max-w-[85%] bg-[#00205B] text-slate-300 p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <Logo light className="h-7" />
              <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {navigationItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                      active ? 'bg-[#0070E0] text-white' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
