// NexaCart Unified Authentication Client & Backend REST API Sync

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

// USER AUTHENTICATION & MANAGEMENT

export async function login(email, password, role) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      await addLog('User Logged In', `${data.user.name} logged into the portal`);
      return { success: true, user: data.user };
    } else {
      const errData = await response.json();
      return { success: false, message: errData.message || 'Login failed' };
    }
  } catch (err) {
    return { success: false, message: err.message || 'Server connection failed' };
  }
}

export async function register(name, email, password, role, extraFields = {}) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, email, password, role, ...extraFields })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, user: { ...data.user, ...extraFields } };
    } else {
      const errData = await response.json();
      return { success: false, message: errData.message || 'Registration failed' };
    }
  } catch (err) {
    return { success: false, message: err.message || 'Server connection failed' };
  }
}

export function logout() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    addLog('User Logged Out', `${currentUser.name} signed out`);
  }
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
}

export function getToken() {
  return localStorage.getItem('token');
}

export async function verifySession() {
  const token = getToken();
  if (!token) return { success: false };
  try {
    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    } else {
      logout();
      return { success: false };
    }
  } catch (err) {
    // offline fallback
    return { success: true, user: getCurrentUser() };
  }
}

export function isAuthenticated(requiredRole = null) {
  const user = getCurrentUser();
  if (!user) return false;
  if (requiredRole && user.role !== requiredRole) return false;
  return true;
}

// DYNAMIC PRODUCTS (Task 4 CRUD)

export async function getProducts(filters = {}) {
  try {
    let queryStr = '?status=all'; // Get all including pending for seller/admin
    if (filters.category) queryStr += `&category=${encodeURIComponent(filters.category)}`;
    if (filters.search) queryStr += `&search=${encodeURIComponent(filters.search)}`;
    if (filters.minPrice) queryStr += `&minPrice=${filters.minPrice}`;
    if (filters.maxPrice) queryStr += `&maxPrice=${filters.maxPrice}`;
    if (filters.status) queryStr = `?status=${filters.status}`;

    const response = await fetch(`${BACKEND_URL}/products${queryStr}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error fetching products:', err);
  }
  return [];
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${id}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error fetching product by ID:', err);
  }
  return null;
}

export async function addProduct(product) {
  try {
    const response = await fetch(`${BACKEND_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error adding product:', err);
  }
  return null;
}

export async function approveProduct(productId) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${productId}/approve`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error approving product:', err);
  }
  return false;
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error deleting product:', err);
  }
  return false;
}

// DYNAMIC ORDERS (Task 8 History & Verification)

export async function getOrders() {
  try {
    const response = await fetch(`${BACKEND_URL}/orders`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error loading orders:', err);
  }
  return [];
}

export async function updateOrder(orderId, updatedFields) {
  try {
    const response = await fetch(`${BACKEND_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: updatedFields.status })
    });
    return response.ok;
  } catch (err) {
    console.error('Error updating order:', err);
  }
  return false;
}

// Delivery Addresses

export async function getAddresses() {
  try {
    const response = await fetch(`${BACKEND_URL}/addresses`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error loading addresses:', err);
  }
  return [];
}

export async function addAddress(address) {
  try {
    const response = await fetch(`${BACKEND_URL}/addresses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(address)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error adding address:', err);
  }
  return null;
}

export async function updateAddress(id, address) {
  try {
    const response = await fetch(`${BACKEND_URL}/addresses/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(address)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error updating address:', err);
  }
  return null;
}

export async function deleteAddress(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/addresses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error deleting address:', err);
  }
  return false;
}

export async function setDefaultAddress(id) {
  try {
    const response = await fetch(`${BACKEND_URL}/addresses/${id}/default`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error setting default address:', err);
  }
  return false;
}

// Cart & Wishlist Sync

export async function getCart() {
  try {
    const response = await fetch(`${BACKEND_URL}/cart`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error loading cart:', err);
  }
  return [];
}

export async function addToCart(productId, qty = 1) {
  try {
    const response = await fetch(`${BACKEND_URL}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, qty })
    });
    return response.ok;
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
  return false;
}

export async function updateCartQty(productId, qty) {
  try {
    const response = await fetch(`${BACKEND_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ qty })
    });
    return response.ok;
  } catch (err) {
    console.error('Error updating cart quantity:', err);
  }
  return false;
}

export async function removeFromCart(productId) {
  try {
    const response = await fetch(`${BACKEND_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error removing from cart:', err);
  }
  return false;
}

// Wishlist
export async function getWishlist() {
  try {
    const response = await fetch(`${BACKEND_URL}/wishlist`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error loading wishlist:', err);
  }
  return [];
}

export async function addToWishlist(productId) {
  try {
    const response = await fetch(`${BACKEND_URL}/wishlist`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId })
    });
    return response.ok;
  } catch (err) {
    console.error('Error adding to wishlist:', err);
  }
  return false;
}

export async function removeFromWishlist(productId) {
  try {
    const response = await fetch(`${BACKEND_URL}/wishlist/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error removing from wishlist:', err);
  }
  return false;
}

// Activity Logs

export async function getLogs() {
  try {
    const response = await fetch(`${BACKEND_URL}/logs`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error fetching logs:', err);
  }
  return [];
}

export async function addLog(action, details) {
  try {
    // Optional client log logger (the backend handles logs for crucial events)
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
}

// Notifications

export async function getNotifications() {
  try {
    const response = await fetch(`${BACKEND_URL}/notifications`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error fetching notifications:', err);
  }
  return [];
}

export async function markNotificationsAsRead() {
  try {
    const response = await fetch(`${BACKEND_URL}/notifications`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error marking notifications read:', err);
  }
  return false;
}

export async function clearNotifications() {
  try {
    const response = await fetch(`${BACKEND_URL}/notifications`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.ok;
  } catch (err) {
    console.error('Error clearing notifications:', err);
  }
  return false;
}

export async function shareCoupon(customerEmail, couponCode) {
  try {
    const response = await fetch(`${BACKEND_URL}/coupons/share`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ customerEmail, couponCode })
    });
    return response.ok;
  } catch (err) {
    console.error('Error sharing coupon:', err);
  }
  return false;
}

// Customer Reviews

export async function getReviews() {
  try {
    const response = await fetch(`${BACKEND_URL}/reviews`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error loading reviews:', err);
  }
  return [];
}

export async function addOrUpdateReview(orderId, productId, rating) {
  try {
    const response = await fetch(`${BACKEND_URL}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ orderId, productId, rating })
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error posting review:', err);
  }
  return null;
}

// Admin Block Check

export async function updateUserBlockStatus(userId, isBlocked) {
  try {
    const response = await fetch(`${BACKEND_URL}/admin/users/${userId}/block`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isBlocked })
    });
    return response.ok;
  } catch (err) {
    console.error('Error blocking user:', err);
  }
  return false;
}

// Fetch Admin Stats
export async function getAdminStats() {
  try {
    const response = await fetch(`${BACKEND_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error loading admin stats:', err);
  }
  return null;
}

// Fetch Users List
export async function getAdminUsersList() {
  try {
    const response = await fetch(`${BACKEND_URL}/admin/users`, {
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error loading users list:', err);
  }
  return [];
}

// Razorpay Order Creation
export async function createRazorpayOrder(amount) {
  try {
    const response = await fetch(`${BACKEND_URL}/payments/order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ amount })
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
  }
  return null;
}
