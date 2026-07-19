import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, getOrders, getCurrentUser, updateOrder } from '../../utils/auth';

export default function SellerProcessingOrders() {
  const navigate = useNavigate();
  const currentSeller = getCurrentUser();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [processingCount, setProcessingCount] = React.useState(0);

  const loadData = async () => {
    if (!currentSeller?.id) return;
    setLoading(true);
    const allProds = await getProducts();
    const sellerProds = allProds.filter(p => p.seller_id === currentSeller.id);

    const allOrders = await getOrders();
    // Filter orders belonging to this seller's products excluding cancelled ones
    const filtered = allOrders.filter(o => 
      sellerProds.some(sp => sp.id === o.productId) && 
      o.status.toLowerCase() !== 'cancelled'
    );
    
    setOrders(filtered);
    setProcessingCount(filtered.filter(o => o.status.toLowerCase() === 'pending' || o.status.toLowerCase() === 'processing').length);
    setLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, [currentSeller?.id]);

  const handleUpdateStatus = async (orderId, nextStatus) => {
    const ok = await updateOrder(orderId, { status: nextStatus });
    if (ok) {
      alert(`Order status updated to ${nextStatus}`);
      await loadData();
    } else {
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Order Management...</p>
      </div>
    );
  }

  return (
    <>
      <SellerSidebar active="orders" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12 text-left">
        <div className="p-gutter max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <nav className="flex items-center gap-2 text-on-secondary-container mb-2">
                <span className="text-[12px]">Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-[12px] font-semibold text-primary">Orders</span>
              </nav>
              <h2 className="font-headline-md text-headline-md text-primary">Order Management</h2>
              <p className="text-on-secondary-container mt-1">Manage and fulfill your enterprise sales pipeline.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-lg bg-white border">
              <p className="text-on-secondary-container font-label-sm mb-2">ACTIVE PROCESSING</p>
              <h3 className="text-[32px] font-bold text-primary">{processingCount}</h3>
            </div>
            <div className="glass-card p-6 rounded-lg bg-white border">
              <p className="text-on-secondary-container font-label-sm mb-2">TOTAL COMPLETED ORDERS</p>
              <h3 className="text-[32px] font-bold text-primary">{orders.filter(o => o.status.toLowerCase() === 'delivered').length}</h3>
            </div>
            <div className="glass-card p-6 rounded-lg bg-primary-container border-none overflow-hidden relative">
              <p className="text-on-primary-container font-label-sm mb-2">TOTAL PIPELINE VALUE</p>
              <h3 className="text-[32px] font-bold text-white">₹{orders.reduce((sum, o) => sum + parseFloat(o.amount), 0).toLocaleString()}</h3>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between border-b border-outline-variant">
            <div className="flex gap-8">
              <button className="pb-4 text-primary font-semibold relative cursor-pointer">
                Processing / Active
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>
              </button>
              <button className="pb-4 text-on-secondary-container font-medium hover:text-primary transition-colors relative cursor-pointer" onClick={() => navigate("/seller/cancelled-orders")}>
                Cancelled
              </button>
              <button className="pb-4 text-on-secondary-container font-medium hover:text-primary transition-colors relative cursor-pointer" onClick={() => navigate("/seller/returns")}>
                Returns
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase tracking-wider">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Product Title</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Fulfillment Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-4">
                      <span className="font-mono font-bold text-primary">#{ord.id}</span>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-primary">{ord.customerName}</p>
                      <p className="text-xs text-on-secondary-container">{ord.customerEmail}</p>
                    </td>
                    <td className="p-4 font-medium text-on-surface-variant">{ord.productTitle}</td>
                    <td className="p-4 font-bold text-primary">₹{parseFloat(ord.amount).toLocaleString()}</td>
                    <td className="p-4 text-sm text-on-secondary-container">{ord.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        ord.status.toLowerCase() === 'delivered' ? 'bg-emerald-50 text-emerald-700' :
                        ord.status.toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {ord.status.toLowerCase() !== 'delivered' && (
                        <select 
                          className="text-xs border border-outline-variant rounded bg-surface p-1 focus:ring-0 cursor-pointer"
                          value={ord.status}
                          onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-on-surface-variant text-sm">No active processing orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
