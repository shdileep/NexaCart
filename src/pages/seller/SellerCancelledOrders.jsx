import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, getOrders, getCurrentUser } from '../../utils/auth';

export default function SellerCancelledOrders() {
  const navigate = useNavigate();
  const currentSeller = getCurrentUser();
  const [cancelledOrders, setCancelledOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      if (!currentSeller?.id) return;
      setLoading(true);
      const allProds = await getProducts();
      const sellerProds = allProds.filter(p => p.seller_id === currentSeller.id);

      const allOrders = await getOrders();
      // Filter orders belonging to this seller's products where status is Cancelled
      const filtered = allOrders.filter(o => 
        sellerProds.some(sp => sp.id === o.productId) && 
        o.status.toLowerCase() === 'cancelled'
      );
      setCancelledOrders(filtered);
      setLoading(false);
    }
    loadData();
  }, [currentSeller?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Cancelled Orders...</p>
      </div>
    );
  }

  return (
    <>
      <SellerSidebar active="orders" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12 text-left">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <nav className="flex items-center gap-2 text-on-secondary-container font-label-sm mb-2">
                <span>Orders</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-primary font-semibold">Cancelled Orders</span>
              </nav>
              <h2 className="font-display-lg text-display-lg text-primary tracking-tight">Cancelled Orders</h2>
              <p className="text-on-secondary-container mt-1">Manage and audit transactions that were terminated before completion.</p>
            </div>
          </div>

          <div className="flex items-center gap-8 border-b border-outline-variant mb-6">
            <button className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative cursor-pointer" onClick={() => navigate("/seller/processing-orders")}>
              All Orders / Processing
            </button>
            <button className="pb-4 px-1 font-body-md text-primary font-semibold relative cursor-pointer">
              Cancelled
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"></div>
            </button>
            <button className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative cursor-pointer" onClick={() => navigate("/seller/returns")}>
              Returns
            </button>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
              <div className="text-label-sm text-on-secondary-container">
                Showing {cancelledOrders.length} cancelled orders
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Cancellation Reason</th>
                    <th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Refund Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {cancelledOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-5">
                        <span className="font-mono font-bold text-primary">#{ord.id}</span>
                        <div className="text-[11px] text-on-secondary-container">{ord.date}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-semibold text-xs">
                            {ord.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-body-md font-medium text-primary">{ord.customerName}</div>
                            <div className="text-xs text-on-secondary-container">{ord.customerEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-body-md font-semibold text-primary">₹{parseFloat(ord.amount).toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm">
                          Customer Request
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="font-body-md text-sm text-on-surface">Refunded</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {cancelledOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-on-surface-variant text-sm">No cancelled orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
