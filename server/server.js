const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'nexacart_jwt_secret_key_12345';

app.use(cors());
app.use(express.json());

// Initialize Database & Seed Default Accounts
async function initDb() {
  try {
    // Create users table
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
    
    // Check and seed default accounts
    const seedUser = async (name, email, password, role) => {
      const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (res.rows.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
          'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
          [name, email, hashedPassword, role]
        );
        console.log(`Seeded default ${role}: ${email}`);
      }
    };

    await seedUser('System Admin', 'admin@nexacart.com', 'admin123', 'admin');
    await seedUser('John Doe', 'seller@nexacart.com', 'seller123', 'seller');
    await seedUser('Mahi Dileep', 'customer@nexacart.com', 'customer123', 'customer');
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
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['admin', 'seller', 'customer'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    // Check if email already exists
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
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
});

// Login
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

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Strict role boundary validation
    if (user.role !== role) {
      if (role === 'admin') {
        return res.status(403).json({ 
          message: 'Access Denied. This account is not authorized to access the Admin Portal.' 
        });
      } else if (user.role === 'seller') {
        return res.status(403).json({ 
          message: 'Access Denied. This account is registered as a Seller. Please log in through the Seller Portal.' 
        });
      } else if (user.role === 'customer') {
        return res.status(403).json({ 
          message: 'Access Denied. This account is registered as a Customer. Please log in through the Customer Portal.' 
        });
      } else {
        return res.status(403).json({ 
          message: 'Access Denied. This account is not authorized to access the Admin Portal.' 
        });
      }
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

// Get User Profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching profile', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`NexaCart Auth server running on http://localhost:${PORT}`);
});
