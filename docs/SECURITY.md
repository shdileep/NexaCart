# NexaCart Security Policy & Architecture

Security best practices, authorization boundaries, and vulnerability mitigation implemented across NexaCart.

---

## 1. Authentication & Password Protection
- **Bcrypt Hashing**: Passwords salted and hashed with 10 work factor rounds before database storage.
- **Plaintext Elimination**: Plaintext passwords are never logged, echoed, or included in query payloads.
- **JWT Protection**: Signed with cryptographic HMAC-SHA256, carrying user ID, role, and standard expiration claims.

## 2. Role-Based Access Control (RBAC)
- Middleware intercepts every protected endpoint to verify role claims against token payloads.
- **Admin**: Can approve/reject products and block abusive accounts.
- **Seller**: Isolated to editing and deleting their own products.
- **Customer**: Can only read their own orders, addresses, and wishlist.

## 3. Razorpay Payment Verification
- Client-submitted totals are never trusted blindly.
- Backend computes checkout amounts directly from database product prices.
- Payment callbacks are validated against HMAC-SHA256 signature:
```javascript
const generatedSignature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest('hex');
```

## 4. SQL Injection Mitigation
- 100% of SQL queries executed through PostgreSQL parameterized queries (`$1, $2, ...`) via node-postgres.
