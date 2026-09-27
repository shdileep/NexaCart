/**
 * Order Tracking Number and Invoice Reference Generator
 */

import crypto from 'crypto';

export const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const randomBytes = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `NEXA-${year}-${randomBytes}`;
};

export const generateInvoiceNumber = (orderId) => {
  const padId = String(orderId).padStart(6, '0');
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `INV-${dateStr}-${padId}`;
};
