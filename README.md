# NexaCart Role-Based E-Commerce Platform

A production-grade, full-stack, role-based e-commerce platform built in React, Node.js, Express, and PostgreSQL. It demonstrates secure JWT authentication, role-based access control (RBAC), dynamically persistence in PostgreSQL, Razorpay sandbox payment integration, Cloudinary image upload, and real-time activity tracking.

---

## 🚀 Key Features

### 1. Role-Based Access Control (RBAC)
- **Admin**: Full control of the marketplace. Can approve or reject seller products, block/unblock customers and sellers, view real-time operations via the Activity Log, and track total marketplace KPIs (Users, Revenue, Orders).
- **Seller (Sales Person)**: Can add, edit, and delete products they own. Products require admin approval before becoming visible to customers. Sellers can track orders containing their products, view customer ratings, and receive real-time notifications when products are approved or sold.
- **Customer**: Can register, browse, search, and filter approved products. Can manage their personal wishlist, shopping cart, delivery addresses (Add/Edit/Delete/Set Default), perform secure checkouts via Razorpay sandbox, and rate purchased items.

### 2. Product Approval Flow
- Newly added seller products start as **Pending Approval**.
- Approved products appear immediately in the **New Arrivals** section of the customer dashboard.
- Rejected or deleted products are removed from queues and stored under marked statuses.

### 3. Integrated Delivery Address CRUD
- Customers can manage multiple shipping addresses at checkout: Add, Edit, Delete, and select a Default Address.

### 4. Razorpay Payment Gateway Integration
- Creates payment order on the backend via Razorpay SDK.
- Integrates the frontend Razorpay Checkout overlay.
- Securely verifies payment signature callback (`razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`) before persisting orders.

### 5. Cloudinary Image Upload
- Directly processes Base64 upload buffers and uploads images to Cloudinary securely.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), TailwindCSS, Google Fonts (Hanken Grotesk, Inter), Material Symbols
- **Backend**: Node.js, Express, pg (node-postgres), JWT (jsonwebtoken), bcryptjs, Razorpay SDK, Cloudinary SDK
- **Database**: PostgreSQL (relational schema with constraints and cascades)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL local instance running

### 1. Backend Configuration
Navigate to the `server/` directory:
```bash
cd server
npm install
```



### 2. Database Schema Setup
If you haven't initialized the tables, log into your PostgreSQL shell and run the schema setup from `server/schema.sql`:
```bash
psql -U postgres -d nexacart -f schema.sql
```

### 3. Start Backend Server
```bash
node server.js
```

### 4. Frontend Configuration
Navigate to the root directory and start the Vite dev server:
```bash
npm install
npm run dev
```

The application will be running on `http://localhost:5173`.

---

## 🔐 Credentials for Verification & Testing

Use the following credentials to log into different roles:

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@nexacart.com` | `admin123` | Control Panel, pending products, block check |
| **Seller** | `seller@nexacart.com` | `seller123` | Seller Dashboard, add products, view notifications |
| **Customer** | `customer@nexacart.com` | `customer123` | Customer Dashboard, cart, wishlist, Razorpay checkout |

---

## 📂 Git Commit Workflow

This project adheres to professional git branch workflows:
1. Created feature branch `feature/full-stack-fixes` from `main`.
2. Committed isolated backend changes.
3. Connected frontend layouts with async REST endpoints.
4. Merged `feature/full-stack-fixes` branch back into `main` using fast-forward merge.
