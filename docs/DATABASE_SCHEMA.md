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
