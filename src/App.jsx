import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Portal from './pages/Portal';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSellers from './pages/admin/AdminSellers';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProfile from './pages/admin/AdminProfile';
import SellerLogin from './pages/seller/SellerLogin';
import SellerSignup from './pages/seller/SellerSignup';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerCustomers from './pages/seller/SellerCustomers';
import SellerProcessingOrders from './pages/seller/SellerProcessingOrders';
import SellerCancelledOrders from './pages/seller/SellerCancelledOrders';
import SellerReturns from './pages/seller/SellerReturns';
import SellerCoupons from './pages/seller/SellerCoupons';
import SellerAnalytics from './pages/seller/SellerAnalytics';
import SellerFinance from './pages/seller/SellerFinance';
import SellerSettings from './pages/seller/SellerSettings';
import SellerProfile from './pages/seller/SellerProfile';
import CustomerLogin from './pages/customer/CustomerLogin';
import CustomerSignup from './pages/customer/CustomerSignup';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ProductDetail from './pages/customer/ProductDetail';
import ProductSearch from './pages/customer/ProductSearch';
import BrowseCategories from './pages/customer/BrowseCategories';
import ShoppingCart from './pages/customer/ShoppingCart';
import MyWishlist from './pages/customer/MyWishlist';
import MyOrders from './pages/customer/MyOrders';
import OrderDetails from './pages/customer/OrderDetails';
import UserProfile from './pages/customer/UserProfile';
import { verifySession } from './utils/auth';

export default function App() {
  React.useEffect(() => {
    verifySession();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/sellers" element={<AdminSellers />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/customers" element={<SellerCustomers />} />
        <Route path="/seller/processing-orders" element={<SellerProcessingOrders />} />
        <Route path="/seller/cancelled-orders" element={<SellerCancelledOrders />} />
        <Route path="/seller/returns" element={<SellerReturns />} />
        <Route path="/seller/coupons" element={<SellerCoupons />} />
        <Route path="/seller/analytics" element={<SellerAnalytics />} />
        <Route path="/seller/finance" element={<SellerFinance />} />
        <Route path="/seller/settings" element={<SellerSettings />} />
        <Route path="/seller/profile" element={<SellerProfile />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/product/:productId" element={<ProductDetail />} />
        <Route path="/customer/search" element={<ProductSearch />} />
        <Route path="/customer/categories" element={<BrowseCategories />} />
        <Route path="/customer/cart" element={<ShoppingCart />} />
        <Route path="/customer/wishlist" element={<MyWishlist />} />
        <Route path="/customer/orders" element={<MyOrders />} />
        <Route path="/customer/order/:orderId" element={<OrderDetails />} />
        <Route path="/customer/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}
