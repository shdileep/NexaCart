// NexaCart Unified Authentication Client & Local Mock Fallback

const BACKEND_URL = 'http://localhost:5000/api';

// Seed default mock database in localStorage for seamless offline dev
function initMockDb() {
  // 1. Seed Users (30 Sellers, 20 Customers, 1 Admin)
  if (!localStorage.getItem('mock_users')) {
    const defaultUsers = [
      { id: 1, name: 'System Admin', email: 'admin@nexacart.com', password: 'admin123', role: 'admin' },
      { id: 2, name: 'John Doe', email: 'seller@nexacart.com', password: 'seller123', role: 'seller', phone: '+919876543210', businessName: 'Lumina Tech Systems', category: 'Electronics' },
      { id: 3, name: 'Mahi Dileep', email: 'customer@nexacart.com', password: 'customer123', role: 'customer', phone: '+916300668400' }
    ];

    // Seed remaining sellers to reach 30 total
    const sellerNames = [
      'Sarah Jenkins', 'Marcus Vane', 'Apex Industrial', 'Quantum Electronics', 'Vogue Apparel',
      'Nordic Living', 'Glow Beauty', 'Pure Cosmeceuticals', 'SmartHome Systems', 'RoboShop',
      'Futuristic Gear', 'Eco Goods', 'Aura Sound', 'Titan Time', 'Luxe Leather',
      'Signature Ink', 'CloudStep', 'Linen Textiles', 'Sonic Brush', 'Hydro Smart',
      'Precision Tools', 'Heavy Scale', 'Aero Space', 'Cosmic Beauty', 'Digital Nomad',
      'Active Wear', 'Duvet Decor', 'Modern Tailoring', 'Vertex Peripherals'
    ];
    for (let i = 0; i < sellerNames.length; i++) {
      const idx = i + 4; // starting ID
      // Some verified (have phone number), some not
      const phone = i % 2 === 0 ? `+9198765432${i.toString().padStart(2, '0')}` : null;
      defaultUsers.push({
        id: idx,
        name: sellerNames[i],
        email: `seller${idx}@nexacart.com`,
        password: `seller${idx}`,
        role: 'seller',
        phone: phone,
        businessName: sellerNames[i] + ' LLC',
        category: i % 3 === 0 ? 'Electronics' : (i % 3 === 1 ? 'Home Goods' : 'Beauty')
      });
    }

    // Seed remaining customers to reach 20 total
    const customerNames = [
      'Alexander Thorne', 'Marcus Holloway', 'Julian Vane', 'Adrian Sterling', 'Elena Kostic',
      'Julian Moore', 'Liam Henderson', 'Rose Walker', 'Vikram Mehta', 'Ananya Singh',
      'Rajesh Kumar', 'Arjun Sharma', 'Priya Patel', 'Michael Chen', 'Sanjay Dutt',
      'Riya Sen', 'Aisha Khan', 'Kabir Singh'
    ];
    for (let i = 0; i < customerNames.length; i++) {
      const idx = defaultUsers.length + 1;
      defaultUsers.push({
        id: idx,
        name: customerNames[i],
        email: `customer${idx}@nexacart.com`,
        password: `customer${idx}`,
        role: 'customer',
        phone: `+9199887766${i.toString().padStart(2, '0')}`
      });
    }

    localStorage.setItem('mock_users', JSON.stringify(defaultUsers));
  }

  // 2. Seed Products (Exactly 30 products, 10 out of stock, average price is exactly 9,000 INR)
  if (!localStorage.getItem('mock_products')) {
    const products = [];
    const categories = ['Electronics', 'Home Goods', 'Beauty'];
    
    // Average price must be exactly 9,000 INR. Total price for 30 products must sum to 270,000 INR.
    // Let's set 20 products to 10,000 INR and 10 products to 7,000 INR.
    // Let's make 10 products out of stock (stock = 0).
    const productNames = [
      // Electronics
      'Nexa Watch Pro', 'Aura Wireless Headphones', 'SmartHome Hub V1', 'Chronos T1 Titanium',
      'Apex Smartwatch G2', 'SonicPro Earbuds', 'Vertex Mouse Gen 2', 'Quantum Speaker',
      'OLED Curved Monitor', 'RoboVac 900',
      // Home Goods
      'Executive Leather Bag', 'NexaBrew Coffee Station', 'Raw Linen Duvet Set', 'Hydro Flask V2',
      'Terra Ceramic Vase', 'EvoDesk Pro (S)', 'Ergonomic Vertical Mouse', 'Minimalist Floor Lamp',
      'Bamboo Organizer', 'Abstract Wall Art',
      // Beauty
      'Sonic Elite Brush', 'Lumina Hydration Serum', 'Pure Rosewater Toner', 'Glow Night Cream',
      'Charcoal Face Mask', 'Tea Tree Essential Oil', 'Shea Butter Lotion', 'Organic Lip Balm',
      'Herbal Shampoo', 'Mineral Sunscreen'
    ];

    for (let i = 0; i < 30; i++) {
      const isOutOfStock = i < 10; // First 10 are out of stock (stock = 0)
      const price = i < 20 ? 10000 : 7000; // 20 * 10000 + 10 * 7000 = 270,000 INR. Average = 9,000 INR.
      const catIndex = Math.floor(i / 10); // 10 in each category
      
      products.push({
        id: `prod_${i + 1}`,
        title: productNames[i],
        sku: `NX-SKU-${1000 + i}`,
        category: categories[catIndex],
        price: price,
        stock: isOutOfStock ? 0 : 50 + (i * 5),
        status: 'approved', // Seeded items are pre-approved
        sales: 10 * i + 5,
        uploadDate: '2026-06-25',
        sellerId: (i % 5) + 2, // Distributed amongst seeded sellers
        sellerName: 'John Doe',
        sellerEmail: 'seller@nexacart.com'
      });
    }
    localStorage.setItem('mock_products', JSON.stringify(products));
  }

  // 3. Seed Orders (Exactly 10 orders, summing to exactly 9,000 INR, proportionally distributed over past month)
  if (!localStorage.getItem('mock_orders')) {
    // 10 order amounts: 1200, 1000, 800, 1500, 500, 600, 700, 900, 1100, 700. Total = 9,000 INR.
    const orderAmounts = [1200, 1000, 800, 1500, 500, 600, 700, 900, 1100, 700];
    const customerList = JSON.parse(localStorage.getItem('mock_users')).filter(u => u.role === 'customer');
    const productList = JSON.parse(localStorage.getItem('mock_products'));
    
    const orders = [];
    const dates = [
      '2026-06-20', '2026-06-23', '2026-06-27', '2026-07-02', '2026-07-05',
      '2026-07-08', '2026-07-10', '2026-07-12', '2026-07-15', '2026-07-18'
    ];
    
    // Distribute orders amongst active customers.
    // Alexander Thorne (ID 4) gets 4 orders.
    // Sarah Jenkins (ID 5) gets 3 orders.
    // Mahi Dileep (ID 3) gets 3 orders.
    // This perfectly matches active definition (places at least 3 or 4 orders in a month).
    const customerAssignment = [4, 4, 4, 4, 5, 5, 5, 3, 3, 3];
    
    for (let i = 0; i < 10; i++) {
      const custId = customerAssignment[i];
      const customer = customerList.find(c => c.id === custId) || customerList[0];
      const product = productList[i % productList.length];
      
      orders.push({
        id: `ORD-928${i + 1}`,
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || '+919999999999',
        productId: product.id,
        productTitle: product.title,
        amount: orderAmounts[i],
        status: i % 3 === 0 ? 'Delivered' : (i % 3 === 1 ? 'Processing' : 'Pending'),
        date: dates[i],
        deliveryDate: '2026-07-25'
      });
    }
    localStorage.setItem('mock_orders', JSON.stringify(orders));
  }

  // 4. Seed Activity Logs
  if (!localStorage.getItem('mock_logs')) {
    const initialLogs = [
      { id: 'log_1', action: 'User Registered', details: 'Seller John Doe signed up', timestamp: '2026-06-20 09:30:15' },
      { id: 'log_2', action: 'Product Uploaded', details: 'Seller John Doe uploaded Apex Smartwatch G2', timestamp: '2026-06-25 10:15:00' },
      { id: 'log_3', action: 'Product Approved', details: 'Admin approved product Apex Smartwatch G2', timestamp: '2026-06-25 11:00:22' },
      { id: 'log_4', action: 'User Registered', details: 'Customer Mahi Dileep signed up', timestamp: '2026-07-01 14:22:10' }
    ];
    localStorage.setItem('mock_logs', JSON.stringify(initialLogs));
  }

  // 5. Seed Notifications
  if (!localStorage.getItem('mock_notifications')) {
    localStorage.setItem('mock_notifications', JSON.stringify([]));
  }

  // 6. Seed Reviews
  if (!localStorage.getItem('mock_reviews')) {
    localStorage.setItem('mock_reviews', JSON.stringify([]));
  }
}

initMockDb();

// DATABASE ACCESS UTILITIES

export function getProducts() {
  initMockDb();
  return JSON.parse(localStorage.getItem('mock_products')) || [];
}

export function saveProducts(products) {
  localStorage.setItem('mock_products', JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: `prod_${Date.now()}`,
    sku: `NX-SKU-${Math.floor(Math.random() * 9000) + 1000}`,
    status: 'pending', // must enter approval workflow
    sales: 0,
    uploadDate: new Date().toISOString().split('T')[0]
  };
  products.push(newProduct);
  saveProducts(products);
  addLog('Product Uploaded', `Seller ${newProduct.sellerName} uploaded product ${newProduct.title} for approval`);
  return newProduct;
}

export function approveProduct(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    product.status = 'approved';
    saveProducts(products);
    addNotification(product.sellerId, "Your product has been approved by the admin.");
    addLog('Product Approved', `Admin approved product ${product.title}`);
  }
}

export function deleteProduct(productId) {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex > -1) {
    const product = products[productIndex];
    // Instead of completely removing, we mark it as deleted to preserve references and send notification
    product.status = 'deleted';
    saveProducts(products);
    
    // Add floating notification to the seller
    addNotification(product.sellerId, "Your product has been rejected by the admin.");
    addLog('Product Deleted', `Admin deleted product ${product.title} (uploaded by ${product.sellerName})`);
  }
}

export function getOrders() {
  initMockDb();
  return JSON.parse(localStorage.getItem('mock_orders')) || [];
}

export function saveOrders(orders) {
  localStorage.setItem('mock_orders', JSON.stringify(orders));
}

export function addOrder(order) {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: `ORD-928${orders.length + 1}`,
    date: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split('T')[0] // 7 days later
  };
  orders.push(newOrder);
  saveOrders(orders);
  addLog('Customer Order Placed', `Customer ${newOrder.customerName} placed order ${newOrder.id} for ₹${newOrder.amount}`);
  
  // Notification to Seller
  const allProds = getProducts();
  const product = allProds.find(p => p.id === newOrder.productId);
  if (product) {
    addNotification(product.sellerId, "You have received a new order.");
  }
  
  return newOrder;
}

export function updateOrder(orderId, updatedFields) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    const oldStatus = order.status;
    Object.assign(order, updatedFields);
    saveOrders(orders);
    addLog('Order Updated', `Admin updated status of order ${orderId} to ${order.status}`);
    
    // Notification to Seller on status changes
    if (oldStatus !== order.status) {
      const allProds = getProducts();
      const product = allProds.find(p => p.id === order.productId);
      if (product) {
        if (order.status === 'Cancelled') {
          addNotification(product.sellerId, "Your order has been cancelled.");
        } else if (order.status === 'Delivered') {
          addNotification(product.sellerId, "Your payment has been credited.");
        }
      }
    }
  }
}

export function getLogs() {
  initMockDb();
  return JSON.parse(localStorage.getItem('mock_logs')) || [];
}

export function addLog(action, details) {
  const logs = getLogs();
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  logs.unshift({ id: `log_${Date.now()}`, action, details, timestamp });
  localStorage.setItem('mock_logs', JSON.stringify(logs));
}

export function getNotifications(userId) {
  initMockDb();
  const allNotifications = JSON.parse(localStorage.getItem('mock_notifications')) || [];
  return allNotifications.filter(n => n.userId === parseInt(userId));
}

export function addNotification(userId, message) {
  initMockDb();
  const allNotifications = JSON.parse(localStorage.getItem('mock_notifications')) || [];
  allNotifications.unshift({
    id: `notif_${Date.now()}`,
    userId: parseInt(userId),
    message,
    read: false,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('mock_notifications', JSON.stringify(allNotifications));
}

export function clearNotifications(userId) {
  initMockDb();
  const allNotifications = JSON.parse(localStorage.getItem('mock_notifications')) || [];
  const updated = allNotifications.filter(n => n.userId !== parseInt(userId));
  localStorage.setItem('mock_notifications', JSON.stringify(updated));
}

export function updateUserBlockStatus(userId, isBlocked) {
  const users = JSON.parse(localStorage.getItem('mock_users')) || [];
  const user = users.find(u => u.id === parseInt(userId));
  if (user) {
    user.isBlocked = isBlocked;
    localStorage.setItem('mock_users', JSON.stringify(users));
    
    const actionStr = isBlocked ? 'Blocked' : 'Unblocked';
    addLog(`Customer ${actionStr}`, `Admin ${isBlocked ? 'blocked' : 'unblocked'} customer ${user.name}`);
    if (isBlocked) {
      addNotification(user.id, 'Your account has been permanently blocked by the admin.');
    } else {
      addNotification(user.id, 'Your account has been unblocked. You regain full portal access.');
    }
  }
}

export async function login(email, password, role) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Sync check block status locally even on server auth
      const mockUsers = JSON.parse(localStorage.getItem('mock_users')) || [];
      const localUser = mockUsers.find(u => u.email === email);
      if (localUser && localUser.isBlocked && role === 'customer') {
        return { success: false, message: 'Access denied: Your account has been blocked.' };
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      addLog('User Logged In', `${data.user.name} logged into the portal`);
      return { success: true, user: data.user };
    } else {
      if (response.status === 500) {
        throw new Error('Database offline on server');
      }
      const errData = await response.json();
      return { success: false, message: errData.message || 'Login failed' };
    }
  } catch (err) {
    console.warn('Backend server offline. Falling back to local storage mock database.');
    
    // Local mock auth logic
    const mockUsers = JSON.parse(localStorage.getItem('mock_users'));
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    // Strict role boundary validation
    if (user.role !== role) {
      if (role === 'admin') {
        return { success: false, message: 'Access Denied. This account is not authorized to access the Admin Portal.' };
      } else if (user.role === 'seller') {
        return { success: false, message: 'Access Denied. This account is registered as a Seller. Please log in through the Seller Portal.' };
      } else if (user.role === 'customer') {
        return { success: false, message: 'Access Denied. This account is registered as a Customer. Please log in through the Customer Portal.' };
      } else {
        return { success: false, message: 'Access Denied. This account is not authorized to access the Admin Portal.' };
      }
    }

    if (user.isBlocked && role === 'customer') {
      return { success: false, message: 'Access denied: Your account has been blocked.' };
    }

    const userData = { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, businessName: user.businessName };
    localStorage.setItem('token', 'mock_jwt_token_xyz_12345');
    localStorage.setItem('currentUser', JSON.stringify(userData));
    addLog('User Logged In', `${user.name} logged into the portal`);
    return { success: true, user: userData };
  }
}

export async function register(name, email, password, role, extraFields = {}) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    
    if (role === 'customer') {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, password, role, ...extraFields })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Update local storage
      const mockUsers = JSON.parse(localStorage.getItem('mock_users')) || [];
      mockUsers.push({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        password: password,
        role: data.user.role,
        ...extraFields
      });
      localStorage.setItem('mock_users', JSON.stringify(mockUsers));
      addLog('User Registered', `${role.toUpperCase()} ${data.user.name} signed up`);
      
      return { success: true, user: { ...data.user, ...extraFields } };
    } else {
      if (response.status === 500) {
        throw new Error('Database offline on server');
      }
      const errData = await response.json();
      return { success: false, message: errData.message || 'Registration failed' };
    }
  } catch (err) {
    console.warn('Backend server offline. Falling back to local storage mock database.');

    const mockUsers = JSON.parse(localStorage.getItem('mock_users')) || [];
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      const roleCapitalized = existingUser.role.charAt(0).toUpperCase() + existingUser.role.slice(1);
      const article = roleCapitalized === 'Admin' ? 'an' : 'a';
      const portalName = roleCapitalized === 'Admin' ? 'Admin Portal' : (roleCapitalized === 'Seller' ? 'Seller Portal' : 'Customer Portal');
      return { 
        success: false, 
        message: `This email address is already registered as ${article} ${roleCapitalized}. Please log in through the ${portalName}.` 
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In-memory plaintext storage for mock
      role,
      ...extraFields
    };

    mockUsers.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(mockUsers));
    addLog('User Registered', `${role.toUpperCase()} ${newUser.name} signed up`);
    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, ...extraFields } };
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
  if (token === 'mock_jwt_token_xyz_12345') {
    return { success: true, user: getCurrentUser() };
  }
  try {
    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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
    // Backend offline: keep current user from storage
    return { success: true, user: getCurrentUser() };
  }
}

export function isAuthenticated(requiredRole = null) {
  const user = getCurrentUser();
  if (!user) return false;
  if (requiredRole && user.role !== requiredRole) return false;
  return true;
}

// Notifications read status helper
export function markNotificationsAsRead(userId) {
  initMockDb();
  const allNotifications = JSON.parse(localStorage.getItem('mock_notifications')) || [];
  const updated = allNotifications.map(n => {
    if (n.userId === parseInt(userId)) {
      return { ...n, read: true };
    }
    return n;
  });
  localStorage.setItem('mock_notifications', JSON.stringify(updated));
}

// REVIEWS & RATINGS UTILITIES
export function getReviews() {
  initMockDb();
  return JSON.parse(localStorage.getItem('mock_reviews')) || [];
}

export function saveReviews(reviews) {
  localStorage.setItem('mock_reviews', JSON.stringify(reviews));
}

export function addOrUpdateReview(orderId, productId, rating, customerName) {
  const reviews = getReviews();
  const existingIdx = reviews.findIndex(r => r.orderId === orderId);
  const newReview = {
    orderId,
    productId,
    rating: parseInt(rating),
    customerName,
    date: new Date().toISOString().split('T')[0]
  };

  if (existingIdx > -1) {
    reviews[existingIdx] = newReview;
  } else {
    reviews.push(newReview);
  }
  saveReviews(reviews);
  
  // Also log the activity
  addLog('Customer Review Submitted', `${customerName} rated product ${productId} with ${rating} stars`);
  return newReview;
}

export function getSellerRating(sellerId) {
  const reviews = getReviews();
  const products = getProducts();
  
  // Filter products uploaded by this seller
  const sellerProds = products.filter(p => p.sellerId === parseInt(sellerId));
  if (sellerProds.length === 0) return null;
  
  // Get all reviews for these products
  const sellerReviews = reviews.filter(r => sellerProds.some(p => p.id === r.productId));
  if (sellerReviews.length === 0) return null;
  
  // Compute average
  const total = sellerReviews.reduce((sum, r) => sum + r.rating, 0);
  return (total / sellerReviews.length).toFixed(1);
}

