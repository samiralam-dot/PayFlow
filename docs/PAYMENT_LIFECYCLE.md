# PayFlow Payment Lifecycle & State Machine

```
              +-------------------+
              |      CREATED      |
              +---------+---------+
                        |
                        v
              +-------------------+
              |     INITIATED     |
              +---------+---------+
                        |
                        v
              +-------------------+
              |    PROCESSING     |
              +---------+---------+
                        |
         +--------------+--------------+
         |                             |
         v                             v
+-----------------+           +-----------------+
|     SUCCESS     |           |     FAILED      |
+--------+--------+           +-----------------+
         |
         +-------------------------------------+
         |                                     |
         v                                     v
+------------------+                 +--------------------+
|  REFUND_PENDING  |                 | PARTIALLY_REFUNDED |
+--------+---------+                 +---------+----------+
         |                                     |
         +-----------------+-------------------+
                           |
                           v
                 +-------------------+
                 |     REFUNDED      |
                 +-------------------+
```

### State Definitions
1. **CREATED**: Pre-allocated payment intent linked to order and idempotency key.
2. **INITIATED**: Routing decision evaluated and outbound request sent to provider adapter.
3. **PROCESSING**: Awaiting asynchronous gateway confirmation or banking authorization.
4. **SUCCESS**: Authoritative provider response or verified webhook received; ledger entries balanced.
5. **FAILED**: Terminal failure from issuer, expired authorization, or anti-fraud block.
6. **REFUND_PENDING**: Refund requested; awaiting gateway confirmation.
7. **PARTIALLY_REFUNDED**: Cumulative refunded amount is less than original captured amount.
8. **REFUNDED**: Cumulative refund equals total original captured amount.
