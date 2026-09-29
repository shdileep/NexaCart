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
