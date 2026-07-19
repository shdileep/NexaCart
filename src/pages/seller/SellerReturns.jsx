import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, getOrders, getCurrentUser } from '../../utils/auth';

export default function SellerReturns() {
  const navigate = useNavigate();
  const currentSeller = getCurrentUser();
  const [returnOrders, setReturnOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      if (!currentSeller?.id || !localStorage.getItem('token')) return;
      setLoading(true);
      const allProds = await getProducts();
      const sellerProds = allProds.filter(p => p.seller_id === currentSeller.id);

      const allOrders = await getOrders();
      // Filter orders belonging to this seller's products where status is Returned or Refunded
      const filtered = allOrders.filter(o => 
        sellerProds.some(sp => sp.id === o.productId) && 
        (o.status.toLowerCase().includes('return') || o.status.toLowerCase().includes('refund'))
      );
      setReturnOrders(filtered);
      setLoading(false);
    }
    loadData();
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, [currentSeller?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Returns Management...</p>
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
              <nav className="flex items-center gap-2 mb-2 text-xs text-on-secondary-container font-label-sm">
                <span>ORDERS</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary font-bold">RETURNS</span>
              </nav>
              <h2 className="font-display-lg text-display-lg text-primary">Returns Management</h2>
            </div>
          </div>

          <div className="flex items-center gap-8 border-b border-outline-variant mb-6">
            <button className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative cursor-pointer" onClick={() => navigate("/seller/processing-orders")}>
              All Orders / Processing
            </button>
            <button className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative cursor-pointer" onClick={() => navigate("/seller/cancelled-orders")}>
              Cancelled
            </button>
            <button className="pb-4 px-1 font-body-md text-primary font-semibold relative cursor-pointer">
              Returns
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"></div>
            </button>
          </div>

          <div className="bg-white border border-outline-variant rounded-lg overflow-hidden">
            <div className="border-b border-outline-variant px-6 py-4 flex items-center justify-between bg-surface-container-low/30">
              <span className="text-sm font-semibold text-primary">Showing {returnOrders.length} returned items</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low font-bold text-xs uppercase tracking-wider text-on-surface-variant">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Product Title</th>
                    <th className="px-6 py-4">Refund Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {returnOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-primary">#{ord.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-body-md font-medium text-primary">{ord.customerName}</div>
                        <div className="text-xs text-on-secondary-container">{ord.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-on-surface-variant">{ord.productTitle}</td>
                      <td className="px-6 py-4 font-bold text-primary">₹{parseFloat(ord.amount).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 font-label-sm text-xs font-bold rounded-full uppercase">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {returnOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-on-surface-variant text-sm">No return requests found.</td>
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
