/**
 * NexaCart Formatting Utilities
 * Handles price currency, percentages, taxes and delivery estimation.
 */

export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (!originalPrice || originalPrice <= 0) return 0;
  if (!discountedPrice || discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const calculateTaxBreakdown = (subtotal, taxRatePercent = 18) => {
  const tax = Number((subtotal * (taxRatePercent / 100)).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  return { subtotal, taxRate: taxRatePercent, tax, total };
};
