# NexaCart Database Schema Reference

PostgreSQL relational database schema design, entity constraints, and foreign key relations.

---

## Entity Relationship Overview

### 1. `users` Table
Stores authentication credentials and role assignments.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Unique user ID |
| `name` | VARCHAR(100) | NOT NULL | User's full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Unique login email |
| `password` | VARCHAR(255) | NOT NULL | Hashed password (bcrypt) |
| `role` | VARCHAR(20) | NOT NULL | 'admin', 'seller', 'customer' |
| `is_blocked` | BOOLEAN | DEFAULT FALSE | Account status |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation date |

### 2. `products` Table
Manages the marketplace product inventory.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | PRIMARY KEY | Unique product ID |
| `seller_id` | INT | REFERENCES users(id) ON DELETE CASCADE | Owner seller |
| `title` | VARCHAR(255) | NOT NULL | Product name |
| `description` | TEXT | | Detailed description |
| `price` | NUMERIC(10,2) | NOT NULL, CHECK (price > 0) | Price in INR |
| `category` | VARCHAR(100) | NOT NULL | Category name |
| `image_url` | TEXT | | Cloudinary hosted image |
| `status` | VARCHAR(20) | DEFAULT 'pending' | 'pending', 'approved', 'rejected' |
| `stock` | INT | DEFAULT 0 | Inventory quantity |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Product submission date |

### 3. `orders` & `order_items` Tables
Stores customer checkouts and itemized lines.
- `orders`: `id`, `user_id`, `address_id`, `total_amount`, `payment_id`, `status`, `created_at`
- `order_items`: `id`, `order_id`, `product_id`, `quantity`, `unit_price`

---

## Recommended Database Indexes

To maintain sub-50ms query response times under high concurrency:
```sql
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_addresses_user ON addresses(user_id);
```

---

## Connection Pooling Strategy
- Driver: `pg` (node-postgres)
- Max Pool Size: 20 active connections
- Idle Timeout: 30,000 ms
- Connection Timeout: 2,000 ms
