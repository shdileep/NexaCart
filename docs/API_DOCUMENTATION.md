# NexaCart REST API Documentation

Comprehensive API endpoint specification for the NexaCart e-commerce platform.

---

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://api.nexacart.com/api`

## Authentication
Protected routes require the `Authorization` header containing the JWT bearer token:
```http
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints

### Register User
`POST /auth/register`
- **Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password123",
  "role": "customer"
}
```

### User Login
`POST /auth/login`
- **Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "Password123"
}
```

---

## 2. Product Management Endpoints

### Get Approved Products (Customer Browse)
`GET /products`
- **Query Parameters:** `page`, `limit`, `category`, `search`, `minPrice`, `maxPrice`

### Create Product (Seller Only)
`POST /products`
- **Headers:** `Authorization: Bearer <seller_token>`

---

## 3. Order & Razorpay Payment Endpoints

### Create Razorpay Order
`POST /orders/create-razorpay-order`
- **Request Body:**
```json
{
  "amount": 4999.00,
  "currency": "INR",
  "items": [
    { "productId": 12, "quantity": 1, "price": 4999.00 }
  ]
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "orderId": "order_Hk829Jz091k",
  "amount": 499900,
  "currency": "INR",
  "keyId": "rzp_test_..."
}
```

### Verify Payment & Persist Order
`POST /orders/verify-payment`
- **Request Body:**
```json
{
  "razorpay_order_id": "order_Hk829Jz091k",
  "razorpay_payment_id": "pay_98273hjs",
  "razorpay_signature": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "addressId": 4,
  "items": [...]
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Payment verified and order placed",
  "order": { "id": 105, "status": "placed", "total": 4999.00 }
}
```
