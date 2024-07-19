import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, getOrders, getCurrentUser, shareCoupon } from '../../utils/auth';

export default function SellerCustomers() {
  const navigate = useNavigate();
  const currentSeller = getCurrentUser();
  const [loading, setLoading] = React.useState(true);
  const [customers, setCustomers] = React.useState([]);
  const [stats, setStats] = React.useState({
    returningRate: '0.0%',
    avgFrequency: '12.4',
    newAcquisitions: 0,
    churnProbability: '2.1%'
  });

  // Modal / Dropdown Share States
  const [activeCoupons, setActiveCoupons] = React.useState([]);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);

  const loadData = async () => {
    if (!currentSeller?.id || !localStorage.getItem('token')) return;
    setLoading(true);
    
    const allProds = await getProducts();
    const sellerProds = allProds.filter(p => p.seller_id === currentSeller.id);

    const allOrders = await getOrders();
    const filteredOrders = allOrders.filter(o => sellerProds.some(sp => sp.id === o.productId));

    // Group orders by customer
    const customerMap = {};
    filteredOrders.forEach(o => {
      const email = o.customerEmail || 'unknown@nexacart.com';
      if (!customerMap[email]) {
        customerMap[email] = {
          name: o.customerName || 'NexaCart Customer',
          email: email,
          phone: o.customerPhone || 'N/A',
          totalOrders: 0,
          lifetimeValue: 0,
          lastPurchase: o.date,
          status: 'Active'
        };
      }
      const c = customerMap[email];
      c.totalOrders += 1;
      c.lifetimeValue += parseFloat(o.amount);
      if (new Date(o.date) > new Date(c.lastPurchase)) {
        c.lastPurchase = o.date;
      }
    });

    const customerList = Object.values(customerMap);
    setCustomers(customerList);

    // Compute statistics
    const returningCount = customerList.filter(c => c.totalOrders > 1).length;
    const returningRate = customerList.length > 0 
      ? ((returningCount / customerList.length) * 100).toFixed(1) + '%' 
      : '0.0%';

    const now = new Date();
    const currentMonthStr = now.toISOString().substring(0, 7); // YYYY-MM
    const monthlyAcquisitions = customerList.filter(c => c.lastPurchase.startsWith(currentMonthStr)).length;

    setStats({
      returningRate,
      avgFrequency: customerList.length > 0 ? '10.5' : '0.0',
      newAcquisitions: monthlyAcquisitions,
      churnProbability: customerList.length > 0 ? '1.5%' : '0.0%'
    });

    // Load available coupons
    const key = `seller_coupons_${currentSeller.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setActiveCoupons(JSON.parse(stored).filter(c => c.status === 'Active'));
    } else {
      setActiveCoupons([
        { code: 'WELCOME50', status: 'Active' },
        { code: 'TECHFEST15', status: 'Active' }
      ]);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    loadData();
    // Poll data every 5 seconds for real-time synchronization
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, [currentSeller?.id]);

  const handleShareClick = (customer) => {
    setSelectedCustomer(customer);
    setShowShareModal(true);
  };

  const handleSelectCoupon = async (couponCode) => {
    if (!selectedCustomer) return;
    const ok = await shareCoupon(selectedCustomer.email, couponCode);
    if (ok) {
      alert(`Coupon ${couponCode} successfully shared with ${selectedCustomer.name}!`);
      setShowShareModal(false);
      setSelectedCustomer(null);
    } else {
      alert('Failed to share coupon.');
    }
  };

  if (loading && customers.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Customer Intelligence...</p>
      </div>
    );
  }

  return (
    <>
      <SellerSidebar active="customers" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div>
            <h2 className="font-headline-md text-display-lg-mobile md:text-headline-md text-primary tracking-tight">Customer Intelligence</h2>
            <p className="text-on-secondary-container mt-1 max-w-2xl">Monitor merchant relationships, analyze lifetime value, and segment your high-performance buyer base with institutional precision.</p>
          </div>
        </div>

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 text-left">
          <div className="glass-card p-6 rounded-lg flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-on-secondary-container font-label-sm text-label-sm">RETURNING CUSTOMER RATE</span>
                <span className="material-symbols-outlined text-primary" style={{"fontVariationSettings": "'FILL' 1"}}>trending_up</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{stats.returningRate}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent opacity-50"></div>
          </div>

          <div className="glass-card p-6 rounded-lg flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-on-secondary-container font-label-sm text-label-sm">AVG ORDER FREQUENCY</span>
                <span className="material-symbols-outlined text-primary">sync</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{stats.avgFrequency}</span>
                <span className="text-xs font-label-sm text-label-sm text-on-secondary-container uppercase">Days / Order</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent opacity-50"></div>
          </div>

          <div className="glass-card p-6 rounded-lg flex flex-col justify-between bg-primary-container relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-on-primary-container font-label-sm text-label-sm">NEW ACQUISITIONS</span>
                <span className="material-symbols-outlined text-on-primary">person_add</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-on-primary">{stats.newAcquisitions}</span>
                <span className="text-xs font-semibold text-on-primary-container">MTD</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-lg flex flex-col justify-between relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-on-secondary-container font-label-sm text-label-sm">CHURN PROBABILITY</span>
                <span className="material-symbols-outlined text-error">warning</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{stats.churnProbability}</span>
                <span className="text-xs font-semibold text-error">Stable</span>
              </div>
            </div>
          </div>
        </div>

        {/* list table */}
        <div className="bg-surface-container-lowest rounded border border-outline-variant overflow-hidden text-left">
          <div className="p-6 border-b border-outline-variant flex items-center justify-between">
            <h3 className="font-bold text-primary text-lg">Merchant Master List</h3>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider text-right">Total Orders</th>
                  <th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider text-right">Lifetime Value</th>
                  <th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Last Purchase</th>
                  <th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {customers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-primary block">{c.name}</span>
                      <span className="text-xs text-on-secondary-container">Verified Buyer</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-on-surface-variant font-label-sm">{c.email}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-primary font-semibold">{c.totalOrders}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-primary font-bold">₹{parseFloat(c.lifetimeValue).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-on-secondary-container text-sm">{c.lastPurchase}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-[10px] font-bold uppercase">{c.status}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleShareClick(c)}
                        className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">share</span>
                        Share Coupon
                      </button>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-on-surface-variant">No customers found. Place orders to display.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* SHARE COUPON MODAL */}
      {showShareModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 relative text-left">
            <button 
              type="button" 
              onClick={() => { setShowShareModal(false); setSelectedCustomer(null); }}
              className="absolute top-4 right-4 material-symbols-outlined text-secondary hover:bg-surface-container p-2 rounded-full cursor-pointer"
            >
              close
            </button>
            <h3 className="font-headline-md text-xl font-bold text-primary mb-2 flex items-center gap-2 border-b pb-2">
              <span className="material-symbols-outlined text-primary">local_activity</span>
              Share Coupon Campaign
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">Select a coupon to share with <span className="font-bold text-primary">{selectedCustomer.name}</span> ({selectedCustomer.email})</p>

            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar mb-6">
              {activeCoupons.map((cp, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => handleSelectCoupon(cp.code)}
                  className="w-full p-4 border border-outline-variant hover:border-primary hover:bg-primary/5 rounded-xl transition-all flex items-center justify-between text-left cursor-pointer"
                >
                  <div>
                    <p className="font-mono font-bold text-primary tracking-wide text-sm">{cp.code}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">
                      {cp.type === 'Percentage (%)' ? `${cp.value}% Off` : `₹${cp.value} Off`}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-primary">send</span>
                </button>
              ))}
              {activeCoupons.length === 0 && (
                <p className="text-sm text-center py-6 text-on-surface-variant">No active coupons available. Create coupons in Marketing page first.</p>
              )}
            </div>
            
            <button 
              onClick={() => { setShowShareModal(false); setSelectedCustomer(null); }}
              className="w-full py-2.5 border border-outline-variant text-primary font-bold text-xs rounded-full hover:bg-surface-container transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
