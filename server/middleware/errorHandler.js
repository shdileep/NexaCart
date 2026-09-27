/**
 * Centralized Error Handling Middleware for Express
 */

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  // PostgreSQL Unique Constraint Violation
  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      error: 'A resource with this identifier already exists.',
      code: 'DUPLICATE_ENTRY',
    });
  }

  // PostgreSQL Foreign Key Violation
  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      error: 'Referenced entity does not exist.',
      code: 'FOREIGN_KEY_VIOLATION',
    });
  }

  // JWT Authentication Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired authentication token.',
      code: 'INVALID_TOKEN',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error occurred.';

  res.status(statusCode).json({
    success: false,
    error: message,
    code: err.code || 'SERVER_ERROR',
  });
};
