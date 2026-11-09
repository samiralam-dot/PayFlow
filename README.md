# PayFlow V4 – Next-Generation Payment Orchestration & Financial Infrastructure Platform

> **"Payments made simple. Infrastructure made powerful."**

PayFlow is an enterprise-grade payment orchestration and financial infrastructure platform inspired by the usability and engineering rigor of PayPal, Stripe, and Razorpay.

---

## ⚡ Key Highlights
- **Smart Payment Routing Engine**: Lowest-latency routing, health checks, and graceful provider failover.
- **Authoritative Provider Adapter**: Real Razorpay Test integration and controllable MockProvider simulator.
- **Double-Entry Financial Ledger**: Immutable debit/credit journal transactions with zero balance discrepancy.
- **Strict Idempotency**: Atomic state transitions with unique compound database indexes preventing duplicate charges.
- **Reliable Webhooks**: HMAC-SHA256 signatures, exponential backoff retries, and dead-letter queue.
- **Interactive System Architecture Explorer**: Visual journey animator tracing requests across services, MongoDB, Redis, and Kafka.

---

## 🛠 Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, React Router 7, TanStack Query, Recharts, Lucide React.
- **Backend**: Node.js 22, Express.js, TypeScript, MongoDB, Mongoose 8, prom-client (Prometheus), Swagger/OpenAPI 3.0.
- **Infrastructure**: Redis, Apache Kafka, BullMQ, Docker Compose.

---

## 🚀 Quickstart (Local Development)

### 1. Prerequisites
- Node.js (v20+ recommended, v22 tested)
- MongoDB instance running locally on `localhost:27017`

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend will start on `http://localhost:4000`:
- **API Status**: `http://localhost:4000/api/v1/status`
- **Health Check**: `http://localhost:4000/health`
- **Readiness Probe**: `http://localhost:4000/ready`
- **Prometheus Metrics**: `http://localhost:4000/metrics`
- **OpenAPI Swagger UI**: `http://localhost:4000/api-docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available on `http://localhost:5173`.

---

## 📁 Repository Structure
```
AntiProject/
  frontend/            # React + TypeScript + Tailwind CSS UI
  backend/             # Express + TypeScript + MongoDB Modular Monolith
  infrastructure/      # Docker Compose & Monitoring setup
  docs/                # Architectural, Database, Security & API Documentation
  docker-compose.yml   # Multi-service container orchestration
  .env.example         # Environment template
  README.md            # Master platform documentation
```

---

## 📜 Development Status
- [x] **PHASE 1**: Project setup, design system, public landing page, architecture visualizer, and merchant dashboard shell. *(Completed)*
- [ ] **PHASE 2**: Authentication, merchant registration, API keys, and RBAC.
- [ ] **PHASE 3**: MongoDB models, order management, and payment lifecycle state machine.
- [ ] **PHASE 4**: Razorpay test integration and MockProvider adapter.
- [ ] **PHASE 5**: Strict idempotency, webhook engine, and payment simulator.
- [ ] **PHASE 6**: Refund management and double-entry ledger.
- [ ] **PHASE 7**: Smart routing, provider health monitoring, and reconciliation.
- [ ] **PHASE 8**: Redis, Kafka, transactional outbox, and BullMQ background workers.
- [ ] **PHASE 9**: Settlement management and risk fraud engine.
- [ ] **PHASE 10**: Admin console, analytics, and observability.
- [ ] **PHASE 11**: Full automated test suites, concurrency benchmarks, and Docker verification.
