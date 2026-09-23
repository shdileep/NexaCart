/**
 * Form Validation Utilities for NexaCart
 */

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  return { isValid: true, message: '' };
};

export const validatePhone = (phone) => {
  if (!phone) return false;
  const cleanPhone = String(phone).replace(/\D/g, '');
  return cleanPhone.length === 10;
};

export const validatePostalCode = (postalCode) => {
  if (!postalCode) return false;
  const cleanCode = String(postalCode).trim();
  // Validates standard 6-digit Indian PIN code
  return /^\d{6}$/.test(cleanCode);
};

export const validateProductInput = (product) => {
  const errors = {};
  if (!product.title || product.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }
  if (!product.price || Number(product.price) <= 0) {
    errors.price = 'Price must be greater than zero';
  }
  if (!product.category || product.category.trim() === '') {
    errors.category = 'Category selection is required';
  }
  if (!product.description || product.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
