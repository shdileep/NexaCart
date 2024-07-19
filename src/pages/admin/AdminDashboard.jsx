import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getProducts, getOrders, getLogs, getCurrentUser, getAdminUsersList } from '../../utils/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = React.useState(null); // 'orders', 'products', 'orderDetail'
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const currentUser = getCurrentUser();
  const adminName = currentUser ? currentUser.name : 'System Admin';

  const [products, setProducts] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [stats, setStats] = React.useState({
    totalCustomers: 20,
    totalSellers: 30,
    totalOrders: 10,
    totalRevenue: 9000
  });

  const [monthlyRevenueData, setMonthlyRevenueData] = React.useState([
    { month: 'Feb', value: 1500, height: '40%' },
    { month: 'Mar', value: 2000, height: '55%' },
    { month: 'Apr', value: 1500, height: '40%' },
    { month: 'May', value: 1000, height: '30%' },
    { month: 'Jun', value: 1800, height: '50%' },
    { month: 'Jul', value: 1200, height: '45%' },
  ]);

  const loadData = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const allProds = await getProducts();
      setProducts(allProds);

      const allOrders = await getOrders();
      setOrders(allOrders);

      const allLogs = await getLogs();
      setLogs(allLogs);

      const allUsers = await getAdminUsersList();

      const totalCustomers = allUsers.filter(u => u.role === 'customer').length;
      const totalSellers = allUsers.filter(u => u.role === 'seller').length;
      const totalOrders = allOrders.length;
      
      // Total revenue includes product amount + delivery charge + platform fee
      const totalRevenue = allOrders.reduce((sum, o) => {
        const amt = parseFloat(o.amount);
        const del = parseFloat(o.delivery_charge || 100);
        return sum + amt + del + 50;
      }, 0);

      setStats({
        totalCustomers,
        totalSellers,
        totalOrders,
        totalRevenue
      });

      // Calculate dynamic monthly revenue
      const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
      const monthMap = { 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0 };
      allOrders.forEach(o => {
        const dateStr = o.created_at || o.date;
        if (!dateStr) return;
        const d = new Date(dateStr);
        const mName = d.toLocaleString('default', { month: 'short' });
        if (monthMap[mName] !== undefined) {
          const amt = parseFloat(o.amount);
          const del = parseFloat(o.delivery_charge || 100);
          monthMap[mName] += amt + del + 50;
        }
      });
      const maxVal = Math.max(...Object.values(monthMap), 1);
      const updatedMonthlyData = months.map(m => {
        const val = monthMap[m];
        const pct = Math.max(10, Math.min(95, (val / maxVal) * 100));
        return {
          month: m,
          value: val,
          height: `${pct}%`
        };
      });
      setMonthlyRevenueData(updatedMonthlyData);
    } catch (err) {
      console.error('Error loading admin dashboard details:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenOrderDetail = (order) => {
    setSelectedOrder(order);
    setActiveModal('orderDetail');
  };

  return (
    <div className="min-h-screen bg-background">
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
              <span className="font-label-sm text-label-sm text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
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
              <span className="font-label-sm text-label-sm text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
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
              <span className="font-label-sm text-label-sm text-green-600 bg-green-50 px-2 py-1 rounded">+16%</span>
            </div>
            <h3 className="text-on-surface-variant font-body-md text-body-md mb-1">Total Orders</h3>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">{stats.totalOrders}</p>
          </div>

          {/* Revenue Card */}
          <div onClick={() => navigate("/admin/orders")} className="bg-white p-6 rounded-xl border border-outline-variant card-lift cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-container/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="font-label-sm text-label-sm text-green-600 bg-green-50 px-2 py-1 rounded">+22%</span>
            </div>
            <h3 className="text-on-surface-variant font-body-md text-body-md mb-1">Total Revenue</h3>
            <p className="font-headline-md text-headline-md font-bold text-on-surface">₹{stats.totalRevenue.toLocaleString()}</p>
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
            <button onClick={() => setActiveModal('orders')} className="flex items-center gap-3 p-5 bg-white rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-left group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">visibility</span>
              </div>
              <span className="font-body-md text-body-md font-medium">View Orders</span>
            </button>
            <button onClick={() => setActiveModal('products')} className="flex items-center gap-3 p-5 bg-white rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-left group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">inventory</span>
              </div>
              <span className="font-body-md text-body-md font-medium">Manage Products</span>
            </button>
          </div>
        </section>

        {/* Analytics Bento Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Monthly Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-outline-variant p-8 relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-headline-md text-headline-md mb-1">Monthly Revenue</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Transactional volume up to July 2026</p>
              </div>
              <div className="bg-surface-container rounded-lg font-label-sm text-label-sm px-4 py-2">
                Total: ₹{totalRevenue.toLocaleString()}
              </div>
            </div>
            
            <div className="flex-1 min-h-[220px] w-full flex items-end justify-between px-6 pb-8 border-b border-outline-variant">
              {monthlyRevenueData.map((data, idx) => (
                <div key={idx} style={{ height: data.height }} className="w-16 bg-primary/20 hover:bg-primary/45 rounded-t-lg relative group transition-all flex flex-col justify-end items-center cursor-pointer">
                  <div className="absolute -top-8 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow z-10">
                    ₹{data.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-6 text-xs font-label-sm text-secondary uppercase tracking-widest">
              {monthlyRevenueData.map((data, idx) => (
                <span key={idx}>{data.month}</span>
              ))}
            </div>
          </div>

          {/* Activity Log (Real-time events) */}
          <div className="bg-white rounded-xl border border-outline-variant p-8 flex flex-col h-[380px]">
            <h2 className="font-headline-md text-headline-md mb-1">Activity Log</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Real-time marketplace operations</p>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {logs.slice(0, 15).map((log) => (
                <div key={log.id} className="text-xs border-b border-outline-variant/30 pb-2 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-primary uppercase tracking-wider text-[9px] bg-primary/10 px-1.5 py-0.5 rounded">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{log.timestamp}</span>
                  </div>
                  <p className="text-on-surface font-medium">{log.details}</p>
                </div>
              ))}
              {logs.length === 0 && (
                <p className="text-xs text-on-surface-variant text-center pt-8">No activities recorded yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* Secondary Content: Recent Orders */}
        <section className="mt-gutter">
          <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md">Recent Orders</h2>
              <button onClick={() => navigate('/admin/orders')} className="text-primary font-bold font-body-md hover:underline cursor-pointer">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Product</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low font-body-md">
                  {orders.slice(0, 10).map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer" onClick={() => handleOpenOrderDetail(ord)}>
                      <td className="px-8 py-4 font-label-sm text-primary font-bold">{ord.id}</td>
                      <td className="px-8 py-4 font-medium">{ord.customerName}</td>
                      <td className="px-8 py-4 text-on-surface-variant">{ord.productTitle}</td>
                      <td className="px-8 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-tighter ${
                          ord.status === 'Delivered' ? 'bg-green-50 text-green-700' :
                          ord.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 font-bold text-primary">₹{ord.amount.toLocaleString()}</td>
                      <td className="px-8 py-4 text-on-surface-variant">{ord.date}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-on-surface-variant">No orders placed yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING MODAL: VIEW ORDERS */}
      {activeModal === 'orders' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-md text-xl font-bold text-primary">Marketplace Orders</h3>
              <button onClick={() => setActiveModal(null)} className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-1 rounded-full cursor-pointer">
                close
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low font-label-sm text-xs text-secondary uppercase tracking-wider">
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-bright">
                      <td className="px-4 py-3 text-sm font-semibold">{ord.id}</td>
                      <td className="px-4 py-3 text-sm font-medium">{ord.customerName}</td>
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{ord.productTitle}</td>
                      <td className="px-4 py-3 text-sm font-bold text-primary">₹{ord.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleOpenOrderDetail(ord)} className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded hover:opacity-90 cursor-pointer">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING MODAL: MANAGE PRODUCTS */}
      {activeModal === 'products' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-md text-xl font-bold text-primary">Manage Products Queue</h3>
              <button onClick={() => setActiveModal(null)} className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-1 rounded-full cursor-pointer">
                close
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low font-label-sm text-xs text-secondary uppercase tracking-wider">
                    <th className="px-4 py-3">Upload Date</th>
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-surface-bright">
                      <td className="px-4 py-3 text-sm text-on-surface-variant">{prod.uploadDate}</td>
                      <td className="px-4 py-3 text-sm font-semibold">{prod.title}</td>
                      <td className="px-4 py-3 text-sm font-medium">{prod.category}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          prod.status === 'approved' ? 'bg-green-50 text-green-700' :
                          prod.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {prod.status === 'approved' ? 'Uploaded' : prod.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING MODAL: CUSTOMER ORDER DETAIL (SUB-MODAL) */}
      {activeModal === 'orderDetail' && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl p-6 relative">
            <button onClick={() => setActiveModal(activeModal === 'orderDetail' && selectedOrder ? null : 'orders')} className="absolute top-4 right-4 material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-1.5 rounded-full cursor-pointer">
              close
            </button>
            <h3 className="font-headline-md text-lg font-bold text-primary mb-6 border-b pb-2">Order Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Product Name</label>
                <p className="text-on-surface font-semibold text-body-md mt-0.5">{selectedOrder.productTitle}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Order ID</label>
                <p className="text-primary font-mono font-bold text-sm mt-0.5">{selectedOrder.id}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Ordered By</label>
                <p className="text-on-surface font-medium text-body-md mt-0.5">{selectedOrder.customerName} ({selectedOrder.customerEmail})</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Delivery Date</label>
                <p className="text-on-surface-variant text-body-md mt-0.5">{selectedOrder.deliveryDate}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Price</label>
                <p className="text-primary font-bold text-headline-md mt-0.5">₹{selectedOrder.amount.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => {
                setActiveModal(null);
                setSelectedOrder(null);
              }} className="px-5 py-2 bg-gradient-to-v from-[#1e293b] to-[#0f172a] text-white rounded-lg font-semibold hover:opacity-90 cursor-pointer">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
