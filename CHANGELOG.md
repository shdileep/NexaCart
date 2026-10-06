# Changelog

All notable changes to the **NexaCart** role-based e-commerce platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-10-06

### Added
- Comprehensive REST API documentation (`docs/API_DOCUMENTATION.md`).
- Relational database schema reference and indexing guidelines (`docs/DATABASE_SCHEMA.md`).
- Production deployment guide for Render and Vercel (`docs/DEPLOYMENT_GUIDE.md`).
- Application security policy and payment integrity specifications (`docs/SECURITY.md`).
- Quality assurance manual test scenarios and test vectors (`docs/TESTING.md`).
- Modular frontend utilities: currency formatters, date helpers, form validators, safe storage.
- Reusable UI component library: `LoadingSpinner`, `EmptyState`, `StatusBadge`, `Modal`.
- Backend rate limiter middleware and centralized error handler.

---

## [1.1.0] - 2026-09-28

### Added
- Integrated Razorpay sandbox payment gateway with HMAC-SHA256 signature verification.
- Complete customer shipping address management (Add, Edit, Delete, Default selection).
- Admin product approval workflow (Pending -> Approved / Rejected).
- Cloudinary Base64 image upload pipeline for seller product listings.
- Real-time seller approval notifications and customer order histories.

---

## [1.0.0] - 2026-09-20

### Added
- Core authentication system with JWT and bcrypt password hashing.
- Role-Based Access Control (RBAC) supporting Admin, Seller, and Customer dashboards.
- Product catalog browsing with category filtering and keyword search.
- Shopping cart and personal wishlist management.
- PostgreSQL relational schema initialization scripts.
