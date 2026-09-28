/**
 * Modular JWT Helper Utilities
 */

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nexacart_super_secret_jwt_key_2026';
const DEFAULT_EXPIRY = '7d';

export const signToken = (payload, expiresIn = DEFAULT_EXPIRY) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const extractBearerToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1].trim();
};
