# NexaCart Quality Assurance & Testing Guide

Step-by-step test plans and verification matrices for all user roles.

---

## 1. Customer Flow Verification
1. **Registration & Login**:
   - Register a new customer account.
   - Verify JWT token stored and user redirected to customer dashboard.
2. **Catalog Browsing**:
   - Filter by categories and search keywords.
   - Verify only **approved** products are visible.
3. **Cart & Wishlist**:
   - Add item to cart; verify quantity increments.
   - Add item to wishlist; verify toggle state persists.
4. **Checkout & Address Selection**:
   - Add new delivery address.
   - Select default address and proceed to checkout.

---

## 2. Razorpay Sandbox Testing Vectors

Use the following test credentials in Razorpay test mode:
- **Card Number**: `4111 1111 1111 1111` (Any valid expiry, any CVV)
- **Netbanking**: Select any bank, click **Success** in the modal.
- **UPI**: `success@razorpay`

### Verification Checklist:
- [ ] Payment signature passes HMAC verification on server.
- [ ] Order persists into `orders` table with status `placed`.
- [ ] Cart is automatically emptied upon successful checkout.
- [ ] Customer order history reflects new purchase with date and invoice code.
