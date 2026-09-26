/**
 * Sliding Window In-Memory Rate Limiter Middleware
 * Protects critical endpoints like authentication and checkout against abusive requests.
 */

const ipRequestMap = new Map();

export const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes default
  const maxRequests = options.max || 100;
  const message = options.message || { error: 'Too many requests, please try again later.' };

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    if (!ipRequestMap.has(ip)) {
      ipRequestMap.set(ip, []);
    }

    const timestamps = ipRequestMap.get(ip);
    // Remove timestamps outside window
    const validTimestamps = timestamps.filter((time) => now - time < windowMs);

    if (validTimestamps.length >= maxRequests) {
      res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
      return res.status(429).json(message);
    }

    validTimestamps.push(now);
    ipRequestMap.set(ip, validTimestamps);
    next();
  };
};
