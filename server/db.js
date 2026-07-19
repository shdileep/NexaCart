const { Pool } = require('pg');
require('dotenv').config();

// Load DB URI from .env, fallback to standard local Postgres
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/nexacart';

const pool = new Pool({
  connectionString,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
