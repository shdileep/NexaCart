import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { getOrders, getCurrentUser, getProducts } from '../../utils/auth';

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const currentCustomer = getCurrentUser();

  React.useEffect(() => {
    if (currentCustomer) {
      // Load user-specific orders
      async function loadData() {
        const userOrders = await getOrders();
        setOrders(userOrders);
        const prods = await getProducts();
        setProducts(prods);
      }
      loadData();
    }
  }, [currentCustomer?.id]);

  const [filterDelivered, setFilterDelivered] = React.useState(false);
  const [filterOnTheWay, setFilterOnTheWay] = React.useState(false);
  const [filterCancelled, setFilterCancelled] = React.useState(false);
  const [filterPending, setFilterPending] = React.useState(false);
  const [searchVal, setSearchVal] = React.useState('');

  const filteredOrders = orders.filter(item => {
    // Search filter
    if (searchVal.trim() && !item.productTitle.toLowerCase().includes(searchVal.toLowerCase())) {
      return false;
    }
    
    // Status filter
    const noneSelected = !filterDelivered && !filterOnTheWay && !filterCancelled && !filterPending;
    if (noneSelected) return true;

    if (filterDelivered && item.status.toLowerCase() === 'delivered') return true;
    if (filterOnTheWay && (item.status.toLowerCase() === 'on the way' || item.status.toLowerCase() === 'shipping' || item.status.toLowerCase() === 'processing')) return true;
    if (filterCancelled && item.status.toLowerCase() === 'cancelled') return true;
    if (filterPending && item.status.toLowerCase() === 'pending') return true;

    return false;
  });

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="mt-[80px] flex-grow max-w-[1440px] mx-auto w-full px-margin-desktop py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md mb-8 text-left">
          <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-semibold">My Orders</span>
        </nav>

        <div className="grid grid-cols-12 gap-gutter text-left">
          {/* Left Sidebar: Filters */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg border border-outline-variant overflow-hidden">
              <div className="p-6 border-b border-outline-variant">
                <h2 className="font-headline-md text-xl font-bold text-primary">Filters</h2>
              </div>
              <div className="p-6 space-y-8">
                {/* Order Status */}
                <section>
                  <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider font-bold">Order Status</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filterPending}
                        onChange={(e) => setFilterPending(e.target.checked)}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer" 
                      />
                      <span className={`font-body-md text-body-md transition-colors ${filterPending ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                        Pending
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filterOnTheWay}
                        onChange={(e) => setFilterOnTheWay(e.target.checked)}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer" 
                      />
                      <span className={`font-body-md text-body-md transition-colors ${filterOnTheWay ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                        On the way / Shipping
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filterDelivered}
                        onChange={(e) => setFilterDelivered(e.target.checked)}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer" 
                      />
                      <span className={`font-body-md text-body-md transition-colors ${filterDelivered ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                        Delivered
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filterCancelled}
                        onChange={(e) => setFilterCancelled(e.target.checked)}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer" 
                      />
                      <span className={`font-body-md text-body-md transition-colors ${filterCancelled ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                        Cancelled
                      </span>
                    </label>
                  </div>
                </section>
              </div>
            </div>
          </aside>

          {/* Right Content Area: Orders List */}
          <section className="col-span-12 lg:col-span-9 space-y-gutter">
            {/* Search Orders Bar */}
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full h-12 bg-white border border-outline-variant rounded-lg px-4 font-body-md text-body-md focus:outline-none focus:border-primary transition-all outline-none" 
                  placeholder="Search your orders here..." 
                />
              </div>
            </div>

            {/* Orders list */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-outline-variant p-12 text-center rounded-lg">
                <span className="material-symbols-outlined text-6xl text-outline mb-4">inventory_2</span>
                <h2 className="text-xl font-bold mb-2">No orders found</h2>
                <p className="text-secondary">You haven't placed any matching orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((item) => {
                  const matchingProd = products.find(p => p.id === item.productId);
                  const imageUrl = matchingProd ? matchingProd.image : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGQVYwq6toyaqKihU5OTaSdq_wE_bRBx233knZ9g82WE-mdfGFqTfEA-wPB39bK2bBl9nMNfiC10RM86m5NBio0bljWOmVcseUk57BV20Ia7FA1_Ce3SBUqmaYAX_FBzYQ844gbhVHhYmKOMllwshZk8mBev9bWqagGYN5MD958VJQ4q9U1-aP_5BPn1tYyUj_bpMe_QOsrdvNnoW-qjCji2JSA5jfO1i0MIFL7noPummd37ZNQOnmAps1GIn7nuCF2oF8uKHnF3g';
                  const statusColor = item.status === 'Delivered' ? 'bg-green-600' :
                                      item.status === 'Cancelled' ? 'bg-red-600' : 'bg-blue-500';

                  return (
                    <div 
                      key={item.id} 
                      onClick={() => navigate(`/customer/order/${item.id}`)}
                      className="bg-white border border-outline-variant rounded-lg p-6 flex flex-col md:flex-row items-start gap-8 hover:shadow-sm hover:border-primary transition-all cursor-pointer"
                    >
                      <div className="w-24 h-24 flex-shrink-0 bg-surface-container p-2 rounded-lg border border-outline-variant flex items-center justify-center font-bold text-primary">
                        {item.productTitle.charAt(0)}
                      </div>
                      
                      <div className="flex-grow text-left">
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <h3 className="font-headline-md text-lg font-bold text-primary leading-tight">
                            {item.productTitle}
                          </h3>
                          <span className="font-headline-md text-lg font-bold text-primary shrink-0">₹{item.amount.toLocaleString()}</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6">Order ID: {item.id}</p>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                          <span className="font-body-md text-body-md text-primary font-semibold">Ordered on: {item.date}</span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">Fulfillment Status: {item.status}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
