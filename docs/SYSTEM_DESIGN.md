# PayFlow System Design Document
## Version 4.0.0 – Next-Generation Payment Orchestration & Financial Infrastructure Platform

### 1. Architectural Philosophy
PayFlow is built as a **Modular Monolith** designed for high throughput, absolute transaction correctness, and distributed resilience. It decouples business checkout workflows from proprietary gateway integrations (e.g. Razorpay, Stripe, Adyen).

### 2. High-Level Topology
```
                     +---------------------------------------+
                     |           Client Applications         |
                     +-------------------+-------------------+
                                         |
                                         | HTTPS (TLS 1.3)
                                         v
                     +---------------------------------------+
                     |          Reverse Proxy / Gateway      |
                     |  - Rate Limiting (Redis token bucket) |
                     |  - Correlation ID (X-Correlation-Id)  |
                     +-------------------+-------------------+
                                         |
                         +---------------+---------------+
                         |                               |
                         v                               v
             +-----------------------+       +-----------------------+
             | Authentication & RBAC |       | Order & Payment Engine|
             +-----------------------+       +-----------+-----------+
                                                         |
                                 +-----------------------+-----------------------+
                                 |                       |                       |
                                 v                       v                       v
                     +-----------------------+ +-------------------+ +-----------------------+
                     | Smart Routing Engine  | | Ledger Engine     | | Webhook Center        |
                     +-----------+-----------+ +---------+---------+ +-----------+-----------+
                                 |                       |                       |
                     +-----------+-----------+           |                       |
                     |                       |           |                       |
                     v                       v           v                       v
               +-----------+           +-----------+ +-------+             +-------------+
               | Razorpay  |           | Mock      | | MongoDB             | Redis /     |
               | Adapter   |           | Provider  | | ACID Transactions   | BullMQ /    |
               +-----------+           +-----------+ +-------+             | Kafka       |
                                                                           +-------------+
```

### 3. Core Architectural Modules
1. **Authentication & Tenant Isolation**: JWT access/refresh token rotation, salted password hashing, API Key SHA-256 verification, and strict merchant-level query filters.
2. **Order Management**: Pre-allocates transactions, minor integer currency units (paise), order expiration and receipts.
3. **Payment Engine**: Authoritative state machine: `CREATED → INITIATED → PROCESSING → SUCCESS / FAILED / REFUNDED`.
4. **Smart Routing**: Evaluates real-time provider latency (P95), success rate rolling window, currency support, and merchant traffic policies.
5. **Double-Entry Ledger**: GAAP-compliant accounting. Invariant: `Debits == Credits`. Posted entries are strictly immutable.
6. **Webhook Reliability Center**: HMAC-SHA256 signature verification, exponential backoff scheduling, and dead-letter queue.
7. **Payment Simulator**: Developer sandbox for testing timeouts, outages, and duplicate webhooks safely.
