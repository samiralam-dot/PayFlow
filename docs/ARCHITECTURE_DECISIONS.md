# PayFlow Architecture Decision Records (ADRs)

### ADR 001: Modular Monolith vs Microservices
- **Decision**: Start with a strictly structured modular monolith.
- **Rationale**: Eliminates premature network boundary overhead, distributed transaction failures, and complex distributed tracing during initial platform evolution while preserving independent module extractability.

### ADR 002: Integer Minor Currency Units
- **Decision**: Store all amounts as minor currency integers (e.g. paise).
- **Rationale**: Eliminates IEEE 754 floating-point rounding inaccuracies in financial balances and ledger calculations.

### ADR 003: Double-Entry Ledger Invariance
- **Decision**: Use debit and credit balanced journal transactions.
- **Rationale**: Simple single-value counters cannot be audited, reconciled against processor settlements, or trusted in financial compliance disputes.

### ADR 004: Transactional Outbox Pattern
- **Decision**: Persist events to MongoDB `outboxEvents` within the same transaction as financial mutations before publishing to Apache Kafka.
- **Rationale**: Avoids dual-write inconsistency where database updates succeed but messaging publication fails.
