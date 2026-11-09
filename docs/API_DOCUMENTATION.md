# PayFlow REST API Reference
## Version 4.0.0

Interactive OpenAPI / Swagger UI is accessible at `http://localhost:4000/api-docs`.

### Headers
Every API request should supply:
- `Authorization: Bearer <jwt_or_api_key>`
- `Content-Type: application/json`
- `X-Correlation-Id: <uuid>` (automatically populated if omitted)
- `Idempotency-Key: <unique_client_string>` (required for mutating payment and refund operations)

### System Endpoints
- `GET /health` - Health check (uptime, node env, service status).
- `GET /ready` - Readiness probe (database connectivity, memory stats).
- `GET /metrics` - Prometheus exposition format metrics.
- `GET /api/v1/status` - API v1 status and latency check.

### Authentication Endpoints
- `POST /api/v1/auth/register` - Create merchant user.
- `POST /api/v1/auth/login` - Authenticate and retrieve access/refresh tokens.
- `POST /api/v1/auth/refresh` - Rotate refresh token.

### Orders Endpoints
- `POST /api/v1/orders` - Create order with minor units and receipt.
- `GET /api/v1/orders/:id` - Fetch order status and linked payments.

### Payments Endpoints
- `POST /api/v1/payments` - Initiate payment with smart routing and idempotency.
- `GET /api/v1/payments/:id` - Authoritative payment status and lifecycle audit.
- `POST /api/v1/payments/:id/verify` - Verify payment signature.

### Refunds & Ledger Endpoints
- `POST /api/v1/refunds` - Initiate full or partial refund.
- `GET /api/v1/ledger/balance` - Retrieve merchant available, pending, and reserved ledger balances.
