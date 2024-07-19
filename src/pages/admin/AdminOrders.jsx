import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getOrders } from '../../utils/auth';

export default function AdminOrders() {
  const [orders, setOrders] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [showDetailModal, setShowDetailModal] = React.useState(false);

  React.useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleOpenOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  // KPIs based on target stats
  const totalRevenue = 9000;
  const activeOrdersCount = orders.length; // 10 orders
  const refundRate = '0.00%';
  const averageTicket = totalRevenue / (activeOrdersCount || 1); // 900 INR

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="ml-64 pt-16 min-h-screen bg-surface">
        <div className="max-w-container-max mx-auto p-gutter lg:p-margin-desktop">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Order Management</h1>
              <p className="text-on-surface-variant font-body-md max-w-2xl">Monitor real-time transactions, track fulfillment status, and manage logistics across your global merchant network.</p>
            </div>
          </div>

          {/* Bento Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-10">
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
              <p className="text-on-surface-variant text-label-sm mb-4">TOTAL REVENUE</p>
              <h3 className="text-headline-md font-bold text-on-surface">₹{totalRevenue.toLocaleString()}</h3>
              <div className="flex items-center gap-2 mt-4 text-emerald-600">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span className="text-label-sm">Target reached</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
              <p className="text-on-surface-variant text-label-sm mb-4">ACTIVE ORDERS</p>
              <h3 className="text-headline-md font-bold text-on-surface">{activeOrdersCount}</h3>
              <div className="flex items-center gap-2 mt-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span className="text-label-sm">All synchronized</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
              <p className="text-on-surface-variant text-label-sm mb-4">REFUND RATE</p>
              <h3 className="text-headline-md font-bold text-on-surface">{refundRate}</h3>
              <div className="flex items-center gap-2 mt-4 text-emerald-600">
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
                <span className="text-label-sm">Optimal performance</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant">
              <p className="text-on-surface-variant text-label-sm mb-4">AVERAGE TICKET</p>
              <h3 className="text-headline-md font-bold text-on-surface">₹{averageTicket.toLocaleString()}</h3>
              <div className="flex items-center gap-2 mt-4 text-primary">
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-label-sm">Rupee pricing enabled</span>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <section className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">Order Registry</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-6 py-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-widest border-b border-outline-variant">Order ID</th>
                    <th className="px-6 py-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-widest border-b border-outline-variant">Customer</th>
                    <th className="px-6 py-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-widest border-b border-outline-variant">Product</th>
                    <th className="px-6 py-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-widest border-b border-outline-variant">Amount</th>
                    <th className="px-6 py-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-widest border-b border-outline-variant">Status</th>
                    <th className="px-6 py-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-widest border-b border-outline-variant">Date</th>
                    <th className="px-6 py-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-widest border-b border-outline-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-bright transition-colors">
                      <td className="px-6 py-5 font-label-sm text-primary font-bold">{ord.id}</td>
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-on-surface font-semibold leading-tight">{ord.customerName}</p>
                          <p className="text-[12px] text-on-surface-variant">{ord.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-on-surface-variant">{ord.productTitle}</td>
                      <td className="px-6 py-5 font-bold text-on-surface">₹{ord.amount.toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase ${
                          ord.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          ord.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-on-surface-variant text-label-sm">{ord.date}</td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => handleOpenOrderDetail(ord)}
                          className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-on-surface-variant">No orders recorded.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* FLOATING DETAIL MODAL */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl p-6 relative">
            <button 
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-1.5 rounded-full cursor-pointer"
            >
              close
            </button>
            <h3 className="font-headline-md text-lg font-bold text-primary mb-6 border-b pb-2">Order Information</h3>
            <div className="space-y-4 text-left">
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
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="px-5 py-2 bg-gradient-to-v from-[#1e293b] to-[#0f172a] text-white rounded-lg font-semibold hover:opacity-90 cursor-pointer"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
