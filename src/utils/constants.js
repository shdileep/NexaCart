/**
 * System Constants for NexaCart Platform
 */

export const USER_ROLES = {
  ADMIN: 'admin',
  SELLER: 'seller',
  CUSTOMER: 'customer',
};

export const PRODUCT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const ORDER_STATUS = {
  PLACED: 'placed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 12,
};
