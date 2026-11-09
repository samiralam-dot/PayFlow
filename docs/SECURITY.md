# PayFlow Security Architecture
## Non-Custodial Security & Tenant Isolation Standards

### 1. Zero Sensitive Cardholder Data Storage
- PayFlow never stores CVV, full 16-digit Primary Account Numbers (PAN), or PINs.
- Tokenization delegates card storage entirely to PCI-DSS Level 1 certified acquirers (Razorpay).

### 2. Multi-Tenant Merchant Isolation
- Every MongoDB query includes tenant scoping `{ merchantId: session.merchantId }`.
- Platform admins possess segregated administrative scopes and all cross-tenant actions generate immutable audit logs.

### 3. API Key Cryptography
- Secrets are hashed using SHA-256 with salt upon generation.
- Plaintext secrets are displayed strictly once upon generation and cannot be recovered if lost.

### 4. HMAC Webhook Signature Verification
- Inbound and outbound webhooks calculate SHA-256 HMAC against the raw request payload:
  `signature = HMAC_SHA256(rawBody, secret)`
- Prevents replay attacks, timestamp manipulation, and payload alteration.
