# PayFlow Database Design & Collections
## MongoDB Document Schemas & Constraints

PayFlow uses MongoDB 7.0+ with replica-set multi-document ACID transactions for atomic ledger balancing and status updates.

### 1. Collections Hierarchy
1. `users` - Platform admins, merchant owners, developers, analysts.
2. `merchants` - Multi-tenant merchant profile, status (ACTIVE, SUSPENDED), KYC metadata.
3. `apiKeys` - Hashed API credentials (`prefix`, `hashedSecret`), environment (`TEST`, `LIVE`), permissions.
4. `orders` - Order state, amount in minor units, currency, customer reference, expiresAt.
5. `payments` - Authoritative payment entity, amount, state, provider, fee, idempotencyKey.
6. `refunds` - Refund entity, original payment reference, amount, reason, status.
7. `customers` - Tokenized customer records, saved instruments, lifetime volume.
8. `ledgerAccounts` - Merchant balance, escrow reserve, platform fee account, acquirer receivable.
9. `ledgerTransactions` - Journal transactions with total debits and credits.
10. `ledgerEntries` - Individual debit / credit line entries.
11. `webhookEndpoints` - Registered merchant webhook URLs, subscribed events, active status.
12. `webhookEvents` - Generated internal events payload.
13. `webhookDeliveries` - Delivery attempts, HTTP status codes, latency, retry schedule.
14. `idempotencyKeys` - Compound unique index `(merchantId, key)` preventing duplicate requests.
15. `providerConfigurations` - Razorpay & MockProvider credentials and health statistics.
16. `providerEvents` - Raw incoming webhook payloads for forensic replay and verification.
17. `settlements` - Scheduled settlement batches, payable net amounts, bank transfer reference.
18. `riskAssessments` - Velocity flags, score, category, triggered rules.
19. `auditLogs` - Administrative actions, configuration updates, and key rotations.
20. `outboxEvents` - MongoDB transactional outbox published reliably to Kafka.

### 2. Critical Database Invariants
- **Minor Units Rule**: All financial amounts are stored as integers representing minor currency units (e.g. ₹100.00 = `10000` paise).
- **Idempotency Index**: `db.idempotencyKeys.createIndex({ merchantId: 1, key: 1 }, { unique: true })`.
- **Ledger Invariant**: Total debits posted across `ledgerEntries` must strictly equal total credits.
- **Tenant Isolation**: Every operational query must enforce `{ merchantId: currentMerchantId }`.
