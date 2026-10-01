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
