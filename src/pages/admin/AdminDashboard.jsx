import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getProducts, getOrders, getLogs, getAdminUsersList } from '../../utils/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const currentUser = getCurrentUser();
  const adminName = currentUser ? currentUser.name : 'System Admin';

  const [products, setProducts] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Stats
  const [stats, setStats] = React.useState({
    totalCustomers: 0,
    totalSellers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    platformEarnings: 0
  });

  const loadData = async () => {
    try {
      const allProds = await getProducts();
      setProducts(allProds);

      const allOrders = await getOrders();
      setOrders(allOrders);

      const allLogs = await getLogs();
      setLogs(allLogs);

      const allUsers = await getAdminUsersList();
      setUsers(allUsers);

      const totalCustomers = allUsers.filter(u => u.role === 'customer').length;
      const totalSellers = allUsers.filter(u => u.role === 'seller').length;
      const totalOrders = allOrders.length;
      const totalRevenue = allOrders.reduce((sum, o) => sum + parseFloat(o.amount), 0);

      // Platform earnings = 5% of order product amounts + 50% of delivery charges (₹50 per order)
      const platformEarnings = allOrders.reduce((sum, o) => {
        const amt = parseFloat(o.amount);
        const delCharge = parseFloat(o.delivery_charge || 0);
        return sum + (amt * 0.05) + (delCharge * 0.5);
      }, 0);

      setStats({
        totalCustomers,
        totalSellers,
        totalOrders,
        totalRevenue,
        platformEarnings
      });
    } catch (err) {
      console.error('Error loading admin dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
    // Poll data every 5 seconds for real-time synchronization without delay
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, []);

  // Helper helper to get current logged in user
  function getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      return JSON.parse(atob(parts[1]));
    } catch (err) {
      return null;
    }
  }

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-left">
      <Header />
      <Sidebar />
      
      <main className="ml-64 pt-24 px-margin-desktop pb-12 max-w-[1440px]">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Welcome back, {adminName}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Monitor your marketplace, manage users, and track business growth in real time.</p>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-10">
          {/* Customer Card */}
          <div onClick={() => navigate("/admin/customers")} className="bg-white p-6 rounded-xl border border-outline-variant card-lift cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-container/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
            <h3 className="text-on-surface-variant font-body-md text-body-md mb-1">Total Customers</h3>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">{stats.totalCustomers}</p>
          </div>

          {/* Sellers Card */}
          <div onClick={() => navigate("/admin/sellers")} className="bg-white p-6 rounded-xl border border-outline-variant card-lift cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-container/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">storefront</span>
              </div>
            </div>
            <h3 className="text-on-surface-variant font-body-md text-body-md mb-1">Total Sellers</h3>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">{stats.totalSellers}</p>
          </div>

          {/* Orders Card */}
          <div onClick={() => navigate("/admin/orders")} className="bg-white p-6 rounded-xl border border-outline-variant card-lift cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-container/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
            </div>
            <h3 className="text-on-surface-variant font-body-md text-body-md mb-1">Total Orders</h3>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">{stats.totalOrders}</p>
          </div>

          {/* Platform Earnings Card */}
          <div onClick={() => navigate("/admin/orders")} className="bg-white p-6 rounded-xl border border-outline-variant card-lift cursor-pointer bg-primary-container/5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary rounded-lg text-white">
                <span className="material-symbols-outlined">payments</span>
              </div>
            </div>
            <h3 className="text-on-surface-variant font-body-md text-body-md mb-1 font-bold text-primary">Platform Earnings</h3>
            <p className="font-headline-md text-headline-md font-bold text-primary">₹{stats.platformEarnings.toLocaleString('en-IN')}</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="font-headline-md text-headline-md mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button onClick={() => navigate('/admin/sellers')} className="flex items-center gap-3 p-5 bg-white rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-left group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">storefront</span>
              </div>
              <span className="font-body-md text-body-md font-medium">Manage Seller</span>
            </button>
            <button onClick={() => navigate('/admin/customers')} className="flex items-center gap-3 p-5 bg-white rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-left group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">person</span>
              </div>
              <span className="font-body-md text-body-md font-medium">Manage Customer</span>
            </button>
            <button onClick={() => navigate('/admin/orders')} className="flex items-center gap-3 p-5 bg-white rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-left group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">visibility</span>
              </div>
              <span className="font-body-md text-body-md font-medium">View Orders</span>
            </button>
          </div>
        </section>

        {/* Recent Logs Activity */}
        <section className="bg-white border border-outline-variant rounded-xl p-6 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md font-bold">Activity Logs</h2>
            <button onClick={() => navigate('/admin/logs')} className="text-primary text-sm font-semibold hover:underline cursor-pointer">View All Logs</button>
          </div>
          <div className="space-y-4">
            {logs.slice(0, 5).map((log, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-3 border-gray-100">
                <div>
                  <p className="font-semibold text-sm text-gray-800">{log.action}</p>
                  <p className="text-xs text-gray-500">{log.details}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{log.created_at || 'Just now'}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-sm text-center py-6 text-on-surface-variant">No activity logs found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
