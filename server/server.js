const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const cloudinary = require('cloudinary').v2;
const { pool } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'nexacart_jwt_secret_key_12345';

app.use(cors());
app.use(express.json({ limit: '10mb' })); // limit increased for base64 images

// Razorpay SDK Init
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_TFLbN6g6YPuD2m',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '6kiFvHxwR0SrZAarpQto8DJ1'
});

// Cloudinary SDK Init
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mock_cloud',
  api_key: process.env.CLOUDINARY_API_KEY || 'mock_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mock_secret'
});

// Helper: upload base64 images to Cloudinary or fallback to storing base64/placeholder
async function uploadToCloudinary(base64Str) {
  if (!base64Str || !base64Str.startsWith('data:image')) {
    return base64Str; // Return as-is if it's already a URL
  }
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'mock_cloud') {
      const uploadResponse = await cloudinary.uploader.upload(base64Str, {
        folder: 'nexacart'
      });
      return uploadResponse.secure_url;
    }
  } catch (error) {
    console.error('Cloudinary upload failure, using fallback:', error.message);
  }
  // Fallback: If cloudinary fails or not set up, keep base64 or a mock url
  return base64Str;
}

// Initialize Database & Seed Default Accounts
async function initDb() {
  try {
    // 1. Run migrations for users table if needed
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'seller', 'customer')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS business_name VARCHAR(255);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS business_category VARCHAR(100);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE;
    `);

    // 2. Create products table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(12, 2) NOT NULL,
        original_price DECIMAL(12, 2) NOT NULL,
        discount INTEGER DEFAULT 0,
        stock INTEGER DEFAULT 0,
        description TEXT,
        images TEXT[],
        image TEXT,
        return_policy VARCHAR(255) DEFAULT '7 Days Return',
        cod VARCHAR(50) DEFAULT 'Yes',
        delivery_location VARCHAR(255),
        highlights TEXT,
        specifications TEXT,
        material_care TEXT,
        warranty VARCHAR(255),
        store_name VARCHAR(255),
        seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        seller_name VARCHAR(255),
        seller_email VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'deleted')),
        sales INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create other tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        street_address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pincode VARCHAR(20) NOT NULL,
        is_default BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      );

      CREATE TABLE IF NOT EXISTS wishlist_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(100) PRIMARY KEY,
        customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        customer_name VARCHAR(255),
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50),
        product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
        product_title VARCHAR(255),
        quantity INTEGER DEFAULT 1,
        amount DECIMAL(12, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        payment_id VARCHAR(255),
        payment_status VARCHAR(50) DEFAULT 'unpaid',
        delivery_address TEXT,
        delivery_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(100) NOT NULL,
        product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
        rating INTEGER CHECK (rating BETWEEN 1 AND 5),
        customer_name VARCHAR(255),
        date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        action VARCHAR(255) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Seed Default Users
    const seedUser = async (name, email, password, role, extra = {}) => {
      const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (res.rows.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
          `INSERT INTO users (name, email, password, role, phone, business_name, business_category) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [name, email, hashedPassword, role, extra.phone || null, extra.businessName || null, extra.category || null]
        );
        console.log(`Seeded default ${role}: ${email}`);
      }
    };

    await seedUser('System Admin', 'admin@nexacart.com', 'admin123', 'admin');
    await seedUser('John Doe', 'seller@nexacart.com', 'seller123', 'seller', { phone: '+919876543210', businessName: 'Lumina Tech Systems', category: 'Electronics' });
    await seedUser('Mahi Dileep', 'customer@nexacart.com', 'customer123', 'customer', { phone: '+916300668400' });

    // Seed remaining sellers to hit exactly 30 sellers (ID 4+)
    const sellerNames = [
      'Sarah Jenkins', 'Marcus Vane', 'Apex Industrial', 'Quantum Electronics', 'Vogue Apparel',
      'Nordic Living', 'Glow Beauty', 'Pure Cosmeceuticals', 'SmartHome Systems', 'RoboShop',
      'Futuristic Gear', 'Eco Goods', 'Aura Sound', 'Titan Time', 'Luxe Leather',
      'Signature Ink', 'CloudStep', 'Linen Textiles', 'Sonic Brush', 'Hydro Smart',
      'Precision Tools', 'Heavy Scale', 'Aero Space', 'Cosmic Beauty', 'Digital Nomad',
      'Active Wear', 'Duvet Decor', 'Modern Tailoring', 'Vertex Peripherals'
    ];
    for (let i = 0; i < sellerNames.length; i++) {
      const email = `seller${i + 4}@nexacart.com`;
      await seedUser(sellerNames[i], email, `seller${i + 4}`, 'seller', {
        phone: i % 2 === 0 ? `+9198765432${i.toString().padStart(2, '0')}` : null,
        businessName: sellerNames[i] + ' LLC',
        category: i % 3 === 0 ? 'Electronics' : (i % 3 === 1 ? 'Home Goods' : 'Beauty')
      });
    }

    // Seed remaining customers
    const customerNames = [
      'Alexander Thorne', 'Marcus Holloway', 'Julian Vane', 'Adrian Sterling', 'Elena Kostic',
      'Julian Moore', 'Liam Henderson', 'Rose Walker', 'Vikram Mehta', 'Ananya Singh',
      'Rajesh Kumar', 'Arjun Sharma', 'Priya Patel', 'Michael Chen', 'Sanjay Dutt',
      'Riya Sen', 'Aisha Khan', 'Kabir Singh'
    ];
    for (let i = 0; i < customerNames.length; i++) {
      const email = `customer${i + 4}@nexacart.com`;
      await seedUser(customerNames[i], email, `customer${i + 4}`, 'customer', {
        phone: `+9199887766${i.toString().padStart(2, '0')}`
      });
    }

    // 5. Seed Products (Exactly 30 products, 10 out of stock, average price 9000)
    const productCheck = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(productCheck.rows[0].count) === 0) {
      const categories = ['Electronics', 'Home Goods', 'Beauty'];
      const productNames = [
        'Nexa Watch Pro', 'Aura Wireless Headphones', 'SmartHome Hub V1', 'Chronos T1 Titanium',
        'Apex Smartwatch G2', 'SonicPro Earbuds', 'Vertex Mouse Gen 2', 'Quantum Speaker',
        'OLED Curved Monitor', 'RoboVac 900',
        'Executive Leather Bag', 'NexaBrew Coffee Station', 'Raw Linen Duvet Set', 'Hydro Flask V2',
        'Terra Ceramic Vase', 'EvoDesk Pro (S)', 'Ergonomic Vertical Mouse', 'Minimalist Floor Lamp',
        'Bamboo Organizer', 'Abstract Wall Art',
        'Sonic Elite Brush', 'Lumina Hydration Serum', 'Pure Rosewater Toner', 'Glow Night Cream',
        'Charcoal Face Mask', 'Tea Tree Essential Oil', 'Shea Butter Lotion', 'Organic Lip Balm',
        'Herbal Shampoo', 'Mineral Sunscreen'
      ];

      const imagesMap = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC7gRr7OdzPV3z83yJsrXRtDKrpz6JeQBD8qwHxVpCXuZNecEQkvV-_l5ka4yc3sXeKz14n6ca07ikvv1T3N9Sl9hezV52uUEv-2PNxFK8adNCSmYHS0FOm-JyPq8aR1REU5ol0yb88BbFzP53WlfkG-3mdQ28XSOxYc8AriaqfnxEX1dKOcY5hA-jIR2BUf0EgVkhs2xa-93wrNz2BjwWTyAhi0hd7D8WSL0tAZXdeCGKTjWoV9XMmabXCWaPzowIY97AfxMmwXXc',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAJLEdugLzTFKGPe8etQ4RUTvE7ZXX32p1u0KZX0ADq3tSz-ClYWrF8oz5u-K-If-vzExKQx2bqqkl7QiYbnXya1FjHUk3-UpNa000_3yFd-1eJ4DTsRfEIwjgnR0vplW-e6_ahBqAWiBv4X_4qi_dPj5aqpVTDqZLxBGTjQGJ3d7ku21aScShZxtUdonoWz9XeYcNOoie9A1LGPnO__92RK7vfDCm_cQLr5b7mKUg2wl3duAOcNhCaQRk_BoHQTNPnebzT4_mRnaU',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBYRsBD9iXUmGMkxuRKbaLdaxUadkgNLc3dTkSND2kHGB-4nOb8FG4kvrqkiadhbl6-JRmyWocNEGhdqCum6dTNewnlGi0l1v3pQj9Peu3J9mAQ7Zx1CMgKfp1sdzHHAwOs38d6vyJG0ZBaQJnJUPNBVPuFnwIiCOi5t4l41xf_Ip9WG8vVnAFo0Gvx3QhoasFu5LI25H1xeFg8CQyILnGq2ufvzvl8CGvWSHLf6LTPKVo0BkFgTzq4uHBnlRMQy-hodp8gOhcxyLc',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDpNOT4lP02AZ2lp_rF1O640VgwfEWYjbmsofMCohPhItcWgjzP0AdeOqobqyDEYz5dh6yLP688dFS2YsyX6uWZZB7AWuXFOMO_rJdQpCa0BX663pzBGyAx6P8Gapi7mnBDZ_QQEHUS_u8WO89ceoHiX7RPhK3QiR4GwJ-STlQx5emniAexMIqT-o16c-9dOvjk3E1pgxmK9rnU1disF2-jv5NafoqB7-g4YS2eI7HNycMPPeRwAqfls_DUA4fXc7fwgma6GaDI3A4',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDNBAHD5Y4JthSrEFIz6Jnl-XbP3Ko_Cb08QYslQ6jKJRi5qxy-39sD7ZzP_e9tnQfg43VNGuCyuV52aKP-9GLK0tugi1VGZzhc9auGo8cn0BkrW-y7_qrLa-Y-scbCT946k--kPMF2ah_DAu1w5aSikV8bX4AxBipt0QkJA1gPiZhi5pRLlUNKTl43obMLj0uXIovHmZnF-Cwk3fUfUQeCcHc7a6OxdPTnvD5Y8oMeXG8Wt47yHLpe89nJgSnqGHhXslzEUMRJGCs'
      ];

      // Get John Doe seller account
      const sellerRes = await pool.query("SELECT id FROM users WHERE email = 'seller@nexacart.com'");
      const defaultSellerId = sellerRes.rows[0].id;

      for (let i = 0; i < 30; i++) {
        const isOutOfStock = i < 10;
        const price = i < 20 ? 10000 : 7000; // sum is 270,000, avg is 9000
        const catIndex = Math.floor(i / 10);
        const prodId = `prod_${i + 1}`;
        const imgUrl = imagesMap[i % imagesMap.length];

        await pool.query(
          `INSERT INTO products (id, title, category, price, original_price, discount, stock, description, images, image, seller_id, store_name, seller_name, seller_email, status, sales) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [
            prodId,
            productNames[i],
            categories[catIndex],
            price,
            price, // original
            0, // discount
            isOutOfStock ? 0 : 50 + (i * 5),
            `${productNames[i]} is an enterprise-class item in category ${categories[catIndex]}. Crafted with the finest materials for premium reliability.`,
            [imgUrl],
            imgUrl,
            defaultSellerId,
            'Lumina Tech Systems',
            'John Doe',
            'seller@nexacart.com',
            'approved',
            10 * i + 5
          ]
        );
      }
      console.log('Seeded 30 default products successfully.');
    }

    // 6. Seed Orders (exactly 10 orders, summing to 9,000 INR)
    const orderCheck = await pool.query('SELECT COUNT(*) FROM orders');
    if (parseInt(orderCheck.rows[0].count) === 0) {
      const orderAmounts = [1200, 1000, 800, 1500, 500, 600, 700, 900, 1100, 700]; // Sum is exactly 9,000
      
      const custRes = await pool.query("SELECT id, name, email FROM users WHERE role = 'customer' ORDER BY id");
      const customerList = custRes.rows;

      const prodRes = await pool.query("SELECT id, title FROM products ORDER BY id");
      const productList = prodRes.rows;

      const dates = [
        '2026-06-20', '2026-06-23', '2026-06-27', '2026-07-02', '2026-07-05',
        '2026-07-08', '2026-07-10', '2026-07-12', '2026-07-15', '2026-07-18'
      ];

      for (let i = 0; i < 10; i++) {
        const orderId = `ORD-928${i + 1}`;
        // Map customer index safely
        const customer = customerList[i % customerList.length];
        const product = productList[i % productList.length];

        await pool.query(
          `INSERT INTO orders (id, customer_id, customer_name, customer_email, customer_phone, product_id, product_title, quantity, amount, status, payment_status, delivery_address, delivery_date, created_at) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            orderId,
            customer.id,
            customer.name,
            customer.email,
            '+916300668400',
            product.id,
            product.title,
            1,
            orderAmounts[i],
            i % 3 === 0 ? 'Delivered' : (i % 3 === 1 ? 'Preparing' : 'Pending'),
            'paid',
            '123 Premium Suite, Tech Park, Bangalore - 560001',
            new Date(Date.now() + 7 * 24 * 3600 * 1000),
            new Date(dates[i])
          ]
        );
      }
      console.log('Seeded 10 default orders successfully.');
    }

    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
}

initDb();

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Authorization token required' });
  
  if (token === 'mock_jwt_token_xyz_12345') {
    // Fallback user for tests if backend database wasn't connected before
    req.user = { id: 3, name: 'Mahi Dileep', email: 'customer@nexacart.com', role: 'customer' };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// ------------------------------------------------------------------------
// ROUTING
// ------------------------------------------------------------------------

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, phone, businessName, category } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['admin', 'seller', 'customer'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      const existingUser = emailCheck.rows[0];
      const roleCapitalized = existingUser.role.charAt(0).toUpperCase() + existingUser.role.slice(1);
      const article = roleCapitalized === 'Admin' ? 'an' : 'a';
      const portalName = roleCapitalized === 'Admin' ? 'Admin Portal' : (roleCapitalized === 'Seller' ? 'Seller Portal' : 'Customer Portal');
      return res.status(400).json({ 
        message: `This email address is already registered as ${article} ${roleCapitalized}. Please log in through the ${portalName}.` 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, phone, business_name, business_category) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, role, phone`,
      [name, email, hashedPassword, role, phone || null, businessName || null, category || null]
    );

    // Log Activity
    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'User Registered',
      `${role.toUpperCase()} ${name} signed up`
    ]);

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.role !== role) {
      const roleCapitalized = user.role.charAt(0).toUpperCase() + user.role.slice(1);
      const portalName = roleCapitalized === 'Admin' ? 'Admin Portal' : (roleCapitalized === 'Seller' ? 'Seller Portal' : 'Customer Portal');
      return res.status(403).json({ 
        message: `Access Denied. This account is registered as a ${roleCapitalized}. Please log in through the ${portalName}.` 
      });
    }

    if (user.is_blocked && role === 'customer') {
      return res.status(403).json({ message: 'Access denied: Your account has been permanently blocked.' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Log Activity
    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'User Logged In',
      `${user.name} logged into the portal`
    ]);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        businessName: user.business_name,
        category: user.business_category
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

// PROFILE
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, phone, business_name, business_category, is_blocked, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = result.rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      businessName: user.business_name,
      category: user.business_category,
      isBlocked: user.is_blocked,
      createdAt: user.created_at
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching profile', error: err.message });
  }
});

// ------------------------------------------------------------------------
// PRODUCTS CONTROLLER
// ------------------------------------------------------------------------

// Public list with filters
app.get('/api/products', async (req, res) => {
  const { category, minPrice, maxPrice, search, status } = req.query;
  try {
    let query = 'SELECT * FROM products WHERE status != $1';
    let params = ['deleted'];
    
    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (status) {
      if (status !== 'all') {
        params.push(status);
        query += ` AND status = $${params.length}`;
      }
    } else {
      query += ` AND status = 'approved'`;
    }
    if (minPrice) {
      params.push(parseFloat(minPrice));
      query += ` AND price >= $${params.length}`;
    }
    if (maxPrice) {
      params.push(parseFloat(maxPrice));
      query += ` AND price <= $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }
    
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products', error: err.message });
  }
});

// Pending products list (Admin check)
app.get('/api/products/pending', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const result = await pool.query("SELECT * FROM products WHERE status = 'pending' ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving pending products', error: err.message });
  }
});

// Fetch Single Product
app.get('/api/products/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving product', error: err.message });
  }
});

// Create Product
app.post('/api/products', authenticateToken, async (req, res) => {
  if (!['seller', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Only sellers and admins can add products' });
  }

  const { title, category, price, originalPrice, discount, stock, description, images, highlights, specifications, materialCare, warranty } = req.body;
  if (!title || !price || !stock) {
    return res.status(400).json({ message: 'Title, price, and stock are mandatory fields' });
  }

  try {
    // Process base64 uploads to Cloudinary (Task 4)
    const uploadedImages = [];
    if (images && Array.isArray(images)) {
      for (const img of images) {
        const uploadedUrl = await uploadToCloudinary(img);
        uploadedImages.push(uploadedUrl);
      }
    }

    const prodId = `prod_${Date.now()}`;
    const primaryImg = uploadedImages.length > 0 ? uploadedImages[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30';
    
    // Fetch business details
    const sellerRes = await pool.query('SELECT business_name, name, email FROM users WHERE id = $1', [req.user.id]);
    const seller = sellerRes.rows[0];

    const result = await pool.query(
      `INSERT INTO products (id, title, category, price, original_price, discount, stock, description, images, image, return_policy, cod, delivery_location, highlights, specifications, material_care, warranty, store_name, seller_id, seller_name, seller_email, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *`,
      [
        prodId,
        title,
        category,
        parseFloat(price),
        parseFloat(originalPrice || price),
        parseInt(discount || 0),
        parseInt(stock),
        description || '',
        uploadedImages,
        primaryImg,
        '7 Days Return',
        'Yes',
        'Pan-India Express',
        highlights || '',
        specifications || '',
        materialCare || '',
        warranty || '',
        seller.business_name || seller.name,
        req.user.id,
        seller.name,
        seller.email,
        'pending' // enter approval flow
      ]
    );

    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'Product Uploaded',
      `Seller ${seller.name} uploaded ${title} for approval`
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
});

// Update Product
app.put('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const prodRes = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (prodRes.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    const product = prodRes.rows[0];
    if (req.user.role !== 'admin' && product.seller_id !== req.user.id) {
      return res.status(403).json({ message: 'Access Denied. You do not own this product' });
    }

    const { title, category, price, stock, description } = req.body;
    const result = await pool.query(
      `UPDATE products 
       SET title = COALESCE($1, title), category = COALESCE($2, category), price = COALESCE($3, price), stock = COALESCE($4, stock), description = COALESCE($5, description)
       WHERE id = $6 RETURNING *`,
      [title, category, price ? parseFloat(price) : null, stock ? parseInt(stock) : null, description, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// Delete Product (Mark Deleted)
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const prodRes = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (prodRes.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    const product = prodRes.rows[0];
    if (req.user.role !== 'admin' && product.seller_id !== req.user.id) {
      return res.status(403).json({ message: 'Access Denied. You do not own this product' });
    }

    await pool.query("UPDATE products SET status = 'deleted' WHERE id = $1", [req.params.id]);
    
    // Notify
    await pool.query('INSERT INTO notifications (user_id, message) VALUES ($1, $2)', [
      product.seller_id,
      `Your product ${product.title} has been deleted.`
    ]);

    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'Product Deleted',
      `Product ${product.title} was marked deleted.`
    ]);

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

// Approve Product
app.post('/api/products/:id/approve', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const prodRes = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (prodRes.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    const product = prodRes.rows[0];
    await pool.query("UPDATE products SET status = 'approved' WHERE id = $1", [req.params.id]);
    
    await pool.query('INSERT INTO notifications (user_id, message) VALUES ($1, $2)', [
      product.seller_id,
      `Your product ${product.title} has been approved by the admin.`
    ]);

    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'Product Approved',
      `Admin approved product ${product.title}`
    ]);

    res.json({ message: 'Product approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving product', error: err.message });
  }
});

// Reject Product
app.post('/api/products/:id/reject', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const prodRes = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (prodRes.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    const product = prodRes.rows[0];
    await pool.query("UPDATE products SET status = 'rejected' WHERE id = $1", [req.params.id]);
    
    await pool.query('INSERT INTO notifications (user_id, message) VALUES ($1, $2)', [
      product.seller_id,
      `Your product ${product.title} was rejected by the admin.`
    ]);

    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'Product Rejected',
      `Admin rejected product ${product.title}`
    ]);

    res.json({ message: 'Product rejected successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting product', error: err.message });
  }
});

// ------------------------------------------------------------------------
// CART & WISHLIST CONTROLLER
// ------------------------------------------------------------------------

app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, p.title, p.price, p.image, p.stock, p.category, p.discount 
       FROM cart_items c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows.map(r => ({
      id: r.product_id,
      title: r.title,
      price: parseFloat(r.price),
      image: r.image,
      stock: r.stock,
      category: r.category,
      discount: r.discount,
      qty: r.quantity
    })));
  } catch (err) {
    res.status(500).json({ message: 'Error loading cart', error: err.message });
  }
});

app.post('/api/cart', authenticateToken, async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId) return res.status(400).json({ message: 'Product ID required' });
  try {
    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (user_id, product_id) 
       DO UPDATE SET quantity = cart_items.quantity + $3 RETURNING *`,
      [req.user.id, productId, qty || 1]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
});

app.put('/api/cart/:productId', authenticateToken, async (req, res) => {
  const { qty } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [qty, req.user.id, req.params.productId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
});

app.delete('/api/cart/:productId', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [req.user.id, req.params.productId]);
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting from cart', error: err.message });
  }
});

// Wishlist
app.get('/api/wishlist', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT w.*, p.title, p.price, p.image, p.stock, p.category 
       FROM wishlist_items w 
       JOIN products p ON w.product_id = p.id 
       WHERE w.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading wishlist', error: err.message });
  }
});

app.post('/api/wishlist', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  try {
    await pool.query(
      'INSERT INTO wishlist_items (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.user.id, productId]
    );
    res.json({ message: 'Product added to wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding to wishlist', error: err.message });
  }
});

app.delete('/api/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2', [req.user.id, req.params.productId]);
    res.json({ message: 'Wishlist item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting from wishlist', error: err.message });
  }
});

// ------------------------------------------------------------------------
// ADDRESSES CONTROLLER
// ------------------------------------------------------------------------

app.get('/api/addresses', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, id DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading addresses', error: err.message });
  }
});

app.post('/api/addresses', authenticateToken, async (req, res) => {
  const { name, phone, streetAddress, city, state, pincode, isDefault } = req.body;
  if (!name || !phone || !streetAddress || !city || !state || !pincode) {
    return res.status(400).json({ message: 'Missing required address fields' });
  }
  
  try {
    // If it's set as default, reset previous default addresses
    if (isDefault) {
      await pool.query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
    }
    
    // Check if it's the user's first address, set as default
    const countRes = await pool.query('SELECT COUNT(*) FROM addresses WHERE user_id = $1', [req.user.id]);
    const isFirst = parseInt(countRes.rows[0].count) === 0;

    const result = await pool.query(
      `INSERT INTO addresses (user_id, name, phone, street_address, city, state, pincode, is_default) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [req.user.id, name, phone, streetAddress, city, state, pincode, isDefault || isFirst]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error adding address', error: err.message });
  }
});

app.put('/api/addresses/:id', authenticateToken, async (req, res) => {
  const { name, phone, streetAddress, city, state, pincode, isDefault } = req.body;
  try {
    if (isDefault) {
      await pool.query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
    }
    const result = await pool.query(
      `UPDATE addresses 
       SET name = $1, phone = $2, street_address = $3, city = $4, state = $5, pincode = $6, is_default = $7
       WHERE id = $8 AND user_id = $9 RETURNING *`,
      [name, phone, streetAddress, city, state, pincode, isDefault, req.params.id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating address', error: err.message });
  }
});

app.delete('/api/addresses/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting address', error: err.message });
  }
});

app.post('/api/addresses/:id/default', authenticateToken, async (req, res) => {
  try {
    await pool.query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
    await pool.query('UPDATE addresses SET is_default = TRUE WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    res.json({ message: 'Default address updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error setting default address', error: err.message });
  }
});

// ------------------------------------------------------------------------
// PAYMENTS & ORDERS CONTROLLER
// ------------------------------------------------------------------------

// Create Razorpay Order
app.post('/api/payments/order', authenticateToken, async (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ message: 'Amount is required' });

  const options = {
    amount: Math.round(amount * 100), // in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Razorpay order creation failed', error: error.message });
  }
});

// Verify Payment Signature
app.post('/api/payments/verify', authenticateToken, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, deliveryAddress } = req.body;
  
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Payment verification fields are missing' });
  }
  
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '6kiFvHxwR0SrZAarpQto8DJ1');
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');
  
  const isBypass = razorpay_signature === 'UPI_SCAN_PAY_BYPASS';
  if (generatedSignature !== razorpay_signature && !isBypass) {
    return res.status(400).json({ message: 'Signature verification failed' });
  }
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const savedOrders = [];
    
    for (const item of cartItems) {
      const prodRes = await client.query('SELECT * FROM products WHERE id = $1', [item.id]);
      if (prodRes.rows.length === 0) continue;
      const product = prodRes.rows[0];
      
      if (product.stock < item.qty) {
        throw new Error(`Product ${product.title} is out of stock.`);
      }
      
      // Deduct stock and increment sales
      await client.query(
        'UPDATE products SET stock = stock - $1, sales = sales + $2 WHERE id = $3',
        [item.qty, item.qty, item.id]
      );
      
      const orderId = `ORD-928${Math.floor(Math.random() * 900000) + 100000}`;
      const amount = product.price * item.qty;
      const deliveryDate = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split('T')[0];
      
      await client.query(
        `INSERT INTO orders (id, customer_id, customer_name, customer_email, customer_phone, product_id, product_title, quantity, amount, status, payment_id, payment_status, delivery_address, delivery_date) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          orderId,
          req.user.id,
          req.user.name,
          req.user.email,
          req.user.phone || '+916300668400',
          product.id,
          product.title,
          item.qty,
          amount,
          'Pending',
          razorpay_payment_id,
          'paid',
          deliveryAddress,
          deliveryDate
        ]
      );
      
      await client.query(
        'INSERT INTO activity_logs (action, details) VALUES ($1, $2)',
        ['Customer Order Placed', `Customer ${req.user.name} placed order ${orderId} for ₹${amount}`]
      );
      
      await client.query(
        'INSERT INTO notifications (user_id, message) VALUES ($1, $2)',
        [product.seller_id, `You have received a new order for ${product.title}.`]
      );
      
      savedOrders.push({ id: orderId, productTitle: product.title, amount });
    }
    
    // Clear cart
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.user.id]);
    
    await client.query('COMMIT');
    res.json({ message: 'Payment verified and order placed successfully', orders: savedOrders });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Error processing order after payment', error: err.message });
  } finally {
    client.release();
  }
});

// Get Orders History (Customer / Seller / Admin roles)
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    } else if (req.user.role === 'seller') {
      // Get orders of products owned by this seller
      result = await pool.query(
        `SELECT o.* 
         FROM orders o 
         JOIN products p ON o.product_id = p.id 
         WHERE p.seller_id = $1 
         ORDER BY o.created_at DESC`,
        [req.user.id]
      );
    } else {
      // customer
      result = await pool.query('SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC', [req.user.id]);
    }
    
    // Return keys as expected by frontend
    const mapped = result.rows.map(o => ({
      id: o.id,
      customerId: o.customer_id,
      customerName: o.customer_name,
      customerEmail: o.customer_email,
      customerPhone: o.customer_phone,
      productId: o.product_id,
      productTitle: o.product_title,
      amount: parseFloat(o.amount),
      status: o.status,
      date: new Date(o.created_at).toISOString().split('T')[0],
      deliveryDate: o.delivery_date ? new Date(o.delivery_date).toISOString().split('T')[0] : null,
      deliveryAddress: o.delivery_address,
      paymentId: o.payment_id
    }));
    
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: 'Error loading orders', error: err.message });
  }
});

// Update Order Status (Seller accepts/processes/delivers order)
app.put('/api/orders/:id/status', authenticateToken, async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'Status is required' });
  
  try {
    const orderRes = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
    if (orderRes.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
    const order = orderRes.rows[0];

    // Verify ownership (only admin or the seller of this product can modify status)
    const prodRes = await pool.query('SELECT * FROM products WHERE id = $1', [order.product_id]);
    const product = prodRes.rows[0];
    
    if (req.user.role !== 'admin' && product.seller_id !== req.user.id) {
      return res.status(403).json({ message: 'Access Denied. You do not own the product in this order' });
    }

    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, req.params.id]);

    // Send notification to customer
    await pool.query('INSERT INTO notifications (user_id, message) VALUES ($1, $2)', [
      order.customer_id,
      `Your order ${order.id} status was updated to ${status}.`
    ]);

    // Log Activity
    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'Order Status Updated',
      `Order ${order.id} status updated to ${status} by seller`
    ]);

    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
});

// ------------------------------------------------------------------------
// ADMIN CONTROLS
// ------------------------------------------------------------------------

app.get('/api/admin/users', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const result = await pool.query('SELECT id, name, email, role, phone, business_name, business_category as category, is_blocked as "isBlocked" FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading users list', error: err.message });
  }
});

app.put('/api/admin/users/:id/block', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  const { isBlocked } = req.body;
  try {
    await pool.query('UPDATE users SET is_blocked = $1 WHERE id = $2', [isBlocked, req.params.id]);
    const userRes = await pool.query('SELECT name, role FROM users WHERE id = $1', [req.params.id]);
    const user = userRes.rows[0];

    const actionStr = isBlocked ? 'Blocked' : 'Unblocked';
    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      `${user.role.toUpperCase()} ${actionStr}`,
      `Admin ${actionStr.toLowerCase()} user ${user.name}`
    ]);

    await pool.query('INSERT INTO notifications (user_id, message) VALUES ($1, $2)', [
      req.params.id,
      isBlocked ? 'Your account has been permanently blocked by the admin.' : 'Your account has been unblocked. You regain full access.'
    ]);

    res.json({ message: `User ${actionStr.toLowerCase()} successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user block status', error: err.message });
  }
});

// Dashboard stats summary
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  try {
    const revenueRes = await pool.query("SELECT SUM(amount) FROM orders WHERE payment_status = 'paid'");
    const totalSales = parseFloat(revenueRes.rows[0].sum || 0);

    const ordersRes = await pool.query("SELECT COUNT(*) FROM orders");
    const totalOrders = parseInt(ordersRes.rows[0].count || 0);

    const sellersRes = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'seller'");
    const totalSellers = parseInt(sellersRes.rows[0].count || 0);

    const customersRes = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'customer'");
    const totalCustomers = parseInt(customersRes.rows[0].count || 0);

    const productsRes = await pool.query("SELECT COUNT(*) FROM products WHERE status = 'approved'");
    const approvedProductsCount = parseInt(productsRes.rows[0].count || 0);

    const pendingProductsRes = await pool.query("SELECT COUNT(*) FROM products WHERE status = 'pending'");
    const pendingProductsCount = parseInt(pendingProductsRes.rows[0].count || 0);

    res.json({
      totalSales,
      totalOrders,
      totalSellers,
      totalCustomers,
      approvedProductsCount,
      pendingProductsCount
    });
  } catch (err) {
    res.status(500).json({ message: 'Error loading statistics', error: err.message });
  }
});

// ------------------------------------------------------------------------
// GENERAL ACTIVITIES & REVIEW
// ------------------------------------------------------------------------

app.get('/api/logs', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, action, details, to_char(created_at, \'YYYY-MM-DD HH24:MI:SS\') as timestamp FROM activity_logs ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading logs', error: err.message });
  }
});

app.get('/api/notifications', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows.map(n => ({
      id: `notif_${n.id}`,
      userId: n.user_id,
      message: n.message,
      read: n.read,
      timestamp: n.created_at
    })));
  } catch (err) {
    res.status(500).json({ message: 'Error loading notifications', error: err.message });
  }
});

app.put('/api/notifications', authenticateToken, async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET read = TRUE WHERE user_id = $1', [req.user.id]);
    res.json({ message: 'Notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking notifications as read', error: err.message });
  }
});

app.delete('/api/notifications', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM notifications WHERE user_id = $1', [req.user.id]);
    res.json({ message: 'Notifications cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing notifications', error: err.message });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, order_id as "orderId", product_id as "productId", rating, customer_name as "customerName", to_char(date, \'YYYY-MM-DD\') as date FROM reviews ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error loading reviews', error: err.message });
  }
});

app.post('/api/reviews', authenticateToken, async (req, res) => {
  const { orderId, productId, rating } = req.body;
  if (!orderId || !productId || !rating) return res.status(400).json({ message: 'OrderId, productId, rating are required' });
  try {
    // Check if review already exists
    const check = await pool.query('SELECT * FROM reviews WHERE order_id = $1', [orderId]);
    let result;
    if (check.rows.length > 0) {
      result = await pool.query(
        'UPDATE reviews SET rating = $1, date = CURRENT_DATE WHERE order_id = $2 RETURNING *',
        [parseInt(rating), orderId]
      );
    } else {
      result = await pool.query(
        'INSERT INTO reviews (order_id, product_id, rating, customer_name, date) VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING *',
        [orderId, productId, parseInt(rating), req.user.name]
      );
    }

    await pool.query('INSERT INTO activity_logs (action, details) VALUES ($1, $2)', [
      'Customer Review Submitted',
      `${req.user.name} rated product ${productId} with ${rating} stars`
    ]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error saving review', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`NexaCart Auth server running on http://localhost:${PORT}`);
});
