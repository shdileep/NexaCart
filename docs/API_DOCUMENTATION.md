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
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "<jwt_token>",
  "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com", "role": "customer" }
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
- **Response (200 OK):**
```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": { "id": 1, "name": "Jane Doe", "email": "jane@example.com", "role": "customer" }
}
```

---

## 2. Product Management Endpoints

### Get Approved Products (Customer Browse)
`GET /products`
- **Query Parameters:** `page`, `limit`, `category`, `search`, `minPrice`, `maxPrice`
- **Response (200 OK):**
```json
{
  "success": true,
  "products": [...],
  "total": 45
}
```

### Create Product (Seller Only)
`POST /products`
- **Headers:** `Authorization: Bearer <seller_token>`
- **Request Body:**
```json
{
  "title": "Wireless Noise Cancelling Headphones",
  "description": "High fidelity audio with 30h battery life",
  "price": 4999.00,
  "category": "Electronics",
  "image": "https://res.cloudinary.com/...",
  "stock": 50
}
```
- **Status:** Automatically marked as `pending` for Admin review.
