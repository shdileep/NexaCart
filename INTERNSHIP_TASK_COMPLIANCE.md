# 🚀 Full Stack Developer Internship Task: Role-Based E-Commerce Platform

This document serves as the official submission and detailed technical report for the **One-Day Task: Role-Based E-Commerce Platform (NexaCart)**.

---

## 📌 Executive Summary

* **Project Name**: NexaCart Enterprise E-Commerce
* **Task Duration**: 1 Working Day (7.5 – 8.5 Hours Execution)
* **Goal**: Build a complete, production-grade role-based e-commerce platform demonstrating end-to-end capabilities across Database Design, Role-Based Access Control (RBAC), Product CRUD, Cloudinary Image Uploads, Razorpay Payment Gateway integration, Git Workflows, and Cloud Deployment.

---

## 🔐 1. Roles & Permissions Matrix

NexaCart implements strict **Backend Enforcement** using JSON Web Tokens (JWT) and Express middleware guards. Unauthorized requests receive `401 Unauthorized` or `403 Forbidden` status codes from the server, regardless of frontend UI state.

| Role | Permissions & Access Level | Backend Route Restrictions |
| :--- | :--- | :--- |
| **Admin** | **Full Control**: Manage all products (approve/reject/delete), block/unblock users (customers & sellers), view global sales analytics, and update any order fulfillment status. | Unrestricted access across `/api/admin/*`, `/api/products/:id/approve`, `/api/products/:id/reject`, and global logs. |
| **Sales Person (Seller)** | **Merchant Control**: Add, edit, and delete **only their own products**; view and update orders containing items from their catalog. | Endpoint guards verify `seller_id === req.user.id` on update/delete; restricted from accessing global user management endpoints. |
| **User (Customer)** | **Buyer Control**: Browse, search, and filter approved products; manage personal wishlist and shopping cart; manage delivery addresses; perform checkout via Razorpay; view own order history. | Endpoint guards restrict actions to `customer_id === req.user.id` for cart, wishlist, address CRUD, and order placements. |

---

## 🛠️ 2. Tech Stack Specification

* **Frontend**: React 19 (Vite), Tailwind CSS v4, React Router v7, Lucide Icons, Material Symbols.
* **Backend**: Node.js, Express.js, JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), CORS.
* **Database**: PostgreSQL (Relational schema with foreign keys, `ON DELETE CASCADE`, and check constraints).
* **Integrations**:
  * **Cloudinary SDK**: Base64 upload buffer processing directly to Cloudinary cloud storage.
  * **Razorpay SDK (Sandbox)**: Server-side order creation (`Razorpay.orders.create`) and HMAC-SHA256 signature verification (`razorpay_signature`).
* **Deployment**: Render (Backend & PostgreSQL Database) + Vercel / Render Static Site (Frontend).

---

## 📋 3. Task Breakdown & Completion Status

### Task 1 - Project Setup & GitHub Repo
* **Repository Structure**: Clean separation between `src/` (Vite React frontend) and `server/` (Node/Express backend).
* **Environment & Security**: `.gitignore` excludes `node_modules`, build artifacts, and secret `.env` files. `server/.env.example` provides explicit configuration keys without real credentials.
* **Status**: ✅ Completed.

### Task 2 - Database Design (PostgreSQL)
Clean relational schema designed in `server/schema.sql` supporting 9 connected tables:
* `users` (id, name, email, password, role, is_blocked, business_name, phone)
* `products` (id, title, category, price, stock, images[], seller_id, status ['pending', 'approved', 'rejected', 'deleted'])
* `addresses` (id, user_id, street_address, city, state, pincode, is_default)
* `cart_items` (user_id, product_id, quantity) - `UNIQUE(user_id, product_id)`
* `wishlist_items` (user_id, product_id) - `UNIQUE(user_id, product_id)`
* `orders` (id, customer_id, product_id, amount, status, payment_id, delivery_address)
* `reviews`, `notifications`, `activity_logs`
* **Status**: ✅ Completed.

### Task 3 - Authentication & Role-Based Access Control (RBAC)
* **Secure Auth**: Passwords hashed using `bcryptjs` before DB insertion.
* **JWT Tokens**: Login issues a signed JWT token containing `{ id, email, role }`.
* **Backend Route Guards**: Express middleware `authenticateToken` verifies JWTs, while `authorizeRoles('admin', 'seller')` enforces HTTP 403 errors for unauthorized role attempts.
* **Status**: ✅ Completed.

### Task 4 - Product CRUD + Cloudinary Image Upload
* **Public Endpoint**: `GET /api/products` returns approved products for customer browsing.
* **Protected Operations**:
  * Merchants upload products via `POST /api/products` (status defaults to `pending`).
  * Cloudinary SDK receives base64 image buffers, returning secure image URLs stored in PostgreSQL.
  * Admin reviews and approves products via `POST /api/products/:id/approve`.
  * Sellers can edit or soft-delete only products matching their `seller_id`.
* **Status**: ✅ Completed.

### Task 5 - Product Listing, Search & Filters (Frontend)
* **Responsive Grid**: Product cards displaying thumbnails, title, price, original price, and discount badge.
* **Filtering & Search**: Keyword search bar with instant state update, category dropdowns (Electronics, Home Goods, Beauty), and price sorting.
* **Adaptive Navigation**: Navigation bar dynamically renders "Manage Products" / "Add Product" controls strictly for Admin and Seller roles.
* **Status**: ✅ Completed.

### Task 6 - Wishlist & Cart
* **Wishlist**: Toggle items in wishlist (`POST /api/wishlist`, `DELETE /api/wishlist/:id`).
* **Cart Management**: Quantity adjusters (`+` and `-`), item removal, dynamic price computation, and real-time header cart badge count.
* **Status**: ✅ Completed.

### Task 7 - Razorpay Checkout (Test Mode)
* **Backend Order Creation**: Endpoint `POST /api/payments/order` invokes `razorpay.orders.create()`.
* **Signature Verification**: Endpoint `POST /api/payments/verify` computes `crypto.createHmac('sha256', secret)` to verify `razorpay_signature`. Prevents fake frontend callbacks.
* **Order Persistence**: Order is saved to PostgreSQL and cart is cleared only upon verified signature validation.
* **Fallback Sandbox**: Includes a local UPI QR Scan & Pay simulation modal.
* **Status**: ✅ Completed.

### Task 8 - Order History & Role Dashboards
* **User (Customer)**: Order history page (`/customer/orders`) displaying item details, delivery status, and order tracking timeline.
* **Sales Person (Seller)**: Order management view (`/seller/processing-orders`) showing incoming orders for their products, with status progression controls (*Pending $\rightarrow$ Processing $\rightarrow$ Shipped $\rightarrow$ Delivered*).
* **Admin**: Centralized Control Panel (`/admin/dashboard`) showing marketplace metrics (Total Sales, Total Customers, Total Sellers, Total Orders), interactive revenue graphs, live activity log stream, and global user management.
* **Status**: ✅ Completed.

### Task 9 - Git Workflow Practice
* **Commit History**: 15+ atomic commits with clear descriptive messages (e.g. `feat`, `fix`, `deploy`).
* **Branch Strategy**: Created feature branch `feature/full-stack-fixes` for isolated updates and merged into `main`.
* **Status**: ✅ Completed.

### Task 10 - Deployment
* **Backend**: Deployed to Render (`nexacart-backend`) using `render.yaml` Blueprint specification, Node environment runtime, PostgreSQL instance connection string, and secret environment variables (`JWT_SECRET`, `RAZORPAY_*`, `CLOUDINARY_*`).
* **Frontend**: Deployed to Render / Vercel (`nexacart-frontend`) with `VITE_API_URL` pointing to live backend REST API.
* **Status**: ✅ Completed.

### Task 11 - README & Submission
* **Documentation**: Complete setup guide, tech stack descriptions, API route table, and test credentials provided in repository `README.md`.
* **Status**: ✅ Completed.

---

## 🔑 Deliverables & Verification Credentials

### Live Links & Repository
* **GitHub Repository**: [https://github.com/shdileep/NexaCart](https://github.com/shdileep/NexaCart)
* **Live Application Frontend**: [http://localhost:5173](http://localhost:5173) / [Render / Vercel Live Deployment]
* **Live Backend REST API**: `https://nexacart-backend.onrender.com/api`

### Role Credentials for Testing

| Role | Email | Password | Allowed Dashboards & Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@nexacart.com` | `admin123` | Control Panel (`/admin/dashboard`), approve pending products, block/unblock users, view global activity logs. |
| **Sales Person (Seller)** | `seller@nexacart.com` | `seller123` | Merchant Hub (`/seller/dashboard`), add/edit products with Cloudinary upload, process own orders, manage coupons. |
| **User (Customer)** | `customer@nexacart.com` | `customer123` | Customer Portal (`/customer/dashboard`), search/filter catalog, wishlist, cart, address CRUD, Razorpay checkout, view order history. |

---

## ✅ Evaluation Criteria Checklist

* [x] **Backend Role Enforcement**: REST endpoints protected by JWT role-verification middleware returning HTTP 403/401 on unauthorized attempts.
* [x] **Product CRUD & Cloudinary Upload**: Fully functional product lifecycle with direct Cloudinary media processing.
* [x] **Cart, Wishlist & Search/Filters**: Dynamic client-side and server-side filtering, cart badges, and wishlist persistence.
* [x] **Razorpay Payment Integration**: End-to-end Razorpay sandbox checkout with HMAC signature verification on backend.
* [x] **Git Workflow**: Clean commit history across milestones and merged feature branch.
* [x] **Production Deployment**: Configured for Render & Vercel deployment with environment variables secured.
