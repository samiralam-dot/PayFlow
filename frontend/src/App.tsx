import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { PricingPage } from './pages/public/PricingPage';
import { DocsPage } from './pages/public/DocsPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { ArchitecturePage } from './pages/public/ArchitecturePage';

// Dashboard pages
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { PaymentsPage } from './pages/dashboard/PaymentsPage';
import { TransactionsPage } from './pages/dashboard/TransactionsPage';
import { OrdersPage } from './pages/dashboard/OrdersPage';
import { RefundsPage } from './pages/dashboard/RefundsPage';
import { CustomersPage } from './pages/dashboard/CustomersPage';
import { PaymentLinksPage } from './pages/dashboard/PaymentLinksPage';
import { SettlementsPage } from './pages/dashboard/SettlementsPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { RiskPage } from './pages/dashboard/RiskPage';
import { WebhooksPage } from './pages/dashboard/WebhooksPage';
import { ApiKeysPage } from './pages/dashboard/ApiKeysPage';
import { DeveloperToolsPage } from './pages/dashboard/DeveloperToolsPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes with Navbar and Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
      </Route>

      {/* Merchant Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="refunds" element={<RefundsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="payment-links" element={<PaymentLinksPage />} />
        <Route path="settlements" element={<SettlementsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="risk" element={<RiskPage />} />
        <Route path="webhooks" element={<WebhooksPage />} />
        <Route path="api-keys" element={<ApiKeysPage />} />
        <Route path="developer-tools" element={<DeveloperToolsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
