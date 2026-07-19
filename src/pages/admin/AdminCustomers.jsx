import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getOrders, updateUserBlockStatus, updateOrder, getAdminUsersList } from '../../utils/auth';

export default function AdminCustomers() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [activeModal, setActiveModal] = React.useState(null); // 'viewOrders', 'editOrderStatus'
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [statusVal, setStatusVal] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');

  const loadData = async () => {
    const allUsers = await getAdminUsersList();
    const customers = allUsers.filter(u => u.role === 'customer');
    setUsers(customers);
    const ords = await getOrders();
    setOrders(ords);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleBlockUnblock = async (userId, currentBlocked) => {
    await updateUserBlockStatus(userId, !currentBlocked);
    await loadData();
  };

  const handleViewOrders = (customer) => {
    setSelectedCustomer(customer);
    setActiveModal('viewOrders');
  };

  const handleOpenEditOrder = (order) => {
    setSelectedOrder(order);
    setStatusVal(order.status);
    setActiveModal('editOrderStatus');
  };

  const handleSaveOrderStatus = async () => {
    if (selectedOrder) {
      await updateOrder(selectedOrder.id, { status: statusVal });
      setActiveModal('viewOrders');
      await loadData();
    }
  };

  // KPIs
  const totalActiveUsersKPI = 1000;
  const avgOrdersKPI = 30;
  // Customer Lifetime Value (CLV) = Sum of all orders revenue
  const totalClv = orders.reduce((sum, o) => sum + o.amount, 0);

  // Filtered customers
  const filteredUsers = users.filter(user => {
    const customerOrders = orders.filter(o => o.customerId === user.id);
    const orderCount = customerOrders.length;
    let computedStatus = user.isBlocked ? 'Blocked' : (orderCount >= 3 ? 'Active' : 'Inactive');

    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery);

    const matchesStatus = statusFilter === '' || computedStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="md:pl-64 pt-16 min-h-screen">
        <div className="p-6 md:p-margin-desktop max-w-container-max mx-auto">
          {/* Section Header */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-display-lg text-display-lg text-primary">Customers</h1>
                <p className="text-body-lg text-on-surface-variant mt-1">Manage and monitor customer activity across your enterprise.</p>
              </div>
            </div>
            {/* Search & Filters */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-wrap items-center gap-4 shadow-sm">
              <div className="flex-1 min-w-[280px]">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                  <input 
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-primary text-body-md" 
                    placeholder="Search by name, email or ID..." 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="bg-surface-container-low border border-outline-variant rounded-lg py-2 px-4 focus:outline-none focus:border-primary text-body-md min-w-[140px]"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-6 py-4 font-semibold text-on-surface-variant font-label-sm uppercase tracking-wider">Profile</th>
                    <th className="px-6 py-4 font-semibold text-on-surface-variant font-label-sm uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 font-semibold text-on-surface-variant font-label-sm uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 font-semibold text-on-surface-variant font-label-sm uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 font-semibold text-on-surface-variant font-label-sm uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-4 font-semibold text-on-surface-variant font-label-sm uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold text-on-surface-variant font-label-sm uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {filteredUsers.map((user) => {
                    const customerOrders = orders.filter(o => o.customerId === user.id);
                    const orderCount = customerOrders.length;
                    const computedStatus = user.isBlocked ? 'Blocked' : (orderCount >= 3 ? 'Active' : 'Inactive');
                    const statusColor = computedStatus === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                                      computedStatus === 'Blocked' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-700 border-slate-200';
                    const dotColor = computedStatus === 'Active' ? 'bg-green-600' :
                                   computedStatus === 'Blocked' ? 'bg-red-600' : 'bg-slate-500';

                    return (
                      <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center border border-outline-variant text-primary font-bold">
                            {user.name.charAt(0)}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-primary">{user.name}</td>
                        <td className="px-6 py-4 text-on-surface-variant">{user.email}</td>
                        <td className="px-6 py-4 text-on-surface-variant font-label-sm">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-surface-container rounded-full text-label-sm font-label-sm">{orderCount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-label-sm font-semibold border ${statusColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                            {computedStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleViewOrders(user)}
                              className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                              title="View Orders"
                            >
                              <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                            <button 
                              onClick={() => handleBlockUnblock(user.id, user.isBlocked)}
                              className={`p-2 transition-colors cursor-pointer ${user.isBlocked ? 'text-green-600 hover:text-green-800' : 'text-on-surface-variant hover:text-error'}`}
                              title={user.isBlocked ? 'Unblock Customer' : 'Block Customer'}
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {user.isBlocked ? 'check_circle' : 'block'}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-on-surface-variant">No customers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
              <div>
                <p className="text-on-surface-variant font-label-sm uppercase">Total Active Users</p>
                <h3 className="text-headline-md font-bold text-primary">{totalActiveUsersKPI.toLocaleString()}</h3>
                <p className="text-label-sm text-green-600 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">person_check</span>
              </div>
            </div>
            <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
              <div>
                <p className="text-on-surface-variant font-label-sm uppercase">Average Orders per User</p>
                <h3 className="text-headline-md font-bold text-primary">{avgOrdersKPI}</h3>
                <p className="text-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
                  Stable engagement
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined">analytics</span>
              </div>
            </div>
            <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
              <div>
                <p className="text-on-surface-variant font-label-sm uppercase">Customer Lifetime Value</p>
                <h3 className="text-headline-md font-bold text-primary">₹{totalClv.toLocaleString()}</h3>
                <p className="text-label-sm text-green-600 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  +3.4% YoY
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined">payments</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING MODAL: VIEW CUSTOMER ORDERS */}
      {activeModal === 'viewOrders' && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline-md text-lg font-bold text-primary">Orders placed by {selectedCustomer.name}</h3>
              <button onClick={() => setActiveModal(null)} className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-1 rounded-full cursor-pointer">
                close
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low font-label-sm text-xs text-secondary uppercase tracking-wider">
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {orders.filter(o => o.customerId === selectedCustomer.id).map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-bright">
                      <td className="px-4 py-3 text-sm font-semibold">{ord.id}</td>
                      <td className="px-4 py-3 text-sm">{ord.productTitle}</td>
                      <td className="px-4 py-3 text-sm font-bold text-primary">₹{ord.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleOpenEditOrder(ord)} className="px-3 py-1.5 border border-outline text-primary text-xs font-semibold rounded hover:bg-surface-container-low cursor-pointer">
                          Edit Status
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.filter(o => o.customerId === selectedCustomer.id).length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-on-surface-variant text-sm">No orders placed by this customer.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING MODAL: EDIT ORDER STATUS */}
      {activeModal === 'editOrderStatus' && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full shadow-2xl p-6 relative">
            <button onClick={() => setActiveModal('viewOrders')} className="absolute top-4 right-4 material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-1.5 rounded-full cursor-pointer">
              close
            </button>
            <h3 className="font-headline-md text-md font-bold text-primary mb-6 border-b pb-2">Edit Order Status</h3>
            <div className="space-y-4">
              <p className="text-sm font-medium">Order: <span className="font-mono text-primary font-bold">{selectedOrder.id}</span></p>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-2">Fulfillment Status</label>
                <select 
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary"
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setActiveModal('viewOrders')} className="px-4 py-2 border border-outline rounded-lg text-sm font-semibold hover:bg-surface-container-low cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSaveOrderStatus} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 cursor-pointer">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
