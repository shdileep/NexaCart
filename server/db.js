const { Pool } = require('pg');
require('dotenv').config();

// Load DB URI from .env, fallback to standard local Postgres
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nexacart';

const pool = new Pool({
  connectionString,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Log unexpected errors on idle pool clients
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
});

module.exports = {
  /**
   * Execute a parameterized SQL query
   * @param {string} text - SQL query text
   * @param {Array} [params] - Query parameters
   */
  query: (text, params) => pool.query(text, params),
  pool
};

