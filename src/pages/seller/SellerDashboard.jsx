import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, getOrders, getCurrentUser, getReviews } from '../../utils/auth';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState({
    products: 0,
    productsGrowth: null,
    orders: 0,
    ordersGrowth: null,
    revenue: 0,
    revenueGrowth: null,
    rating: 'No Rating Yet'
  });
  const [sellerOrders, setSellerOrders] = React.useState([]);

  const currentSeller = getCurrentUser();

  const loadData = async () => {
    if (!currentSeller) return;

    const allProds = await getProducts();
    // Filter active (non-deleted) products for this seller
    const sellerProds = allProds.filter(p => p.seller_id === currentSeller.id && p.status !== 'deleted');
    
    const allOrders = await getOrders();
    // Filter orders belonging to this seller's products
    const filteredOrders = allOrders.filter(o => sellerProds.some(sp => sp.id === o.productId));
    setSellerOrders(filteredOrders);

    const totalRev = filteredOrders.reduce((sum, o) => sum + o.amount, 0);

    // Dynamic Growth Calculation
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Products
    const prodsCurrent = sellerProds.filter(p => p.created_at >= thirtyDaysAgo).length;
    const prodsPrevious = sellerProds.filter(p => p.created_at >= sixtyDaysAgo && p.created_at < thirtyDaysAgo).length;

    // Orders
    const ordersCurrent = filteredOrders.filter(o => o.date >= thirtyDaysAgo).length;
    const ordersPrevious = filteredOrders.filter(o => o.date >= sixtyDaysAgo && o.date < thirtyDaysAgo).length;

    // Revenue
    const revCurrent = filteredOrders.filter(o => o.date >= thirtyDaysAgo).reduce((sum, o) => sum + o.amount, 0);
    const revPrevious = filteredOrders.filter(o => o.date >= sixtyDaysAgo && o.date < thirtyDaysAgo).reduce((sum, o) => sum + o.amount, 0);

    const calculateGrowth = (current, previous) => {
      if (current === 0 && previous === 0) return null;
      if (previous === 0) return 100;
      const val = ((current - previous) / previous) * 100;
      return parseFloat(val.toFixed(1));
    };

    const allReviews = await getReviews();
    const sellerReviews = allReviews.filter(r => sellerProds.some(sp => sp.id === r.productId));
    let ratingVal = null;
    if (sellerReviews.length > 0) {
      const totalRating = sellerReviews.reduce((sum, r) => sum + r.rating, 0);
      ratingVal = (totalRating / sellerReviews.length).toFixed(1);
    }

    setStats({
      products: sellerProds.length,
      productsGrowth: calculateGrowth(prodsCurrent, prodsPrevious),
      orders: filteredOrders.length,
      ordersGrowth: calculateGrowth(ordersCurrent, ordersPrevious),
      revenue: totalRev,
      revenueGrowth: calculateGrowth(revCurrent, revPrevious),
      rating: ratingVal ? `${ratingVal}/5` : 'No Rating Yet'
    });
  };

  React.useEffect(() => {
    loadData();
  }, [currentSeller?.id]);

  const sellerName = currentSeller ? currentSeller.name : 'Merchant';

  const renderGrowthBadge = (growth, isDarkCard = false) => {
    if (growth === null) return null;
    const isPositive = growth >= 0;
    const textClass = isPositive 
      ? (isDarkCard ? 'text-emerald-300' : 'text-emerald-600') 
      : (isDarkCard ? 'text-red-300' : 'text-red-600');
    const icon = isPositive ? 'trending_up' : 'trending_down';
    const sign = isPositive ? '+' : '';

    return (
      <span className={`font-label-sm text-label-sm flex items-center gap-1 ${textClass}`}>
        <span className="material-symbols-outlined text-xs">{icon}</span>
        {sign}{growth}%
      </span>
    );
  };

  return (
    <>
      <SellerSidebar active="dashboard" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">
        <section className="mb-10 flex justify-between items-end text-left">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary">Welcome back, {sellerName}.</h2>
            <p className="font-body-lg text-body-lg text-on-secondary-container mt-1">Here is what's happening with NexaCart store today.</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
          <div className="glass-card p-6 rounded-lg group hover:border-primary transition-all duration-300 bg-white border border-outline-variant cursor-pointer" onClick={() => navigate('/seller/products')}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              {renderGrowthBadge(stats.productsGrowth)}
            </div>
            <p className="font-label-sm text-label-sm text-on-secondary-container uppercase tracking-widest text-left">Total Products</p>
            <h3 className="font-headline-md text-display-lg-mobile font-bold mt-1 text-left">{stats.products}</h3>
          </div>

          <div className="glass-card p-6 rounded-lg group hover:border-primary transition-all duration-300 bg-white border border-outline-variant cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              {renderGrowthBadge(stats.ordersGrowth)}
            </div>
            <p className="font-label-sm text-label-sm text-on-secondary-container uppercase tracking-widest text-left">Orders</p>
            <h3 className="font-headline-md text-display-lg-mobile font-bold mt-1 text-left">{stats.orders}</h3>
          </div>

          <div className="glass-card p-6 rounded-lg group hover:border-primary transition-all duration-300 bg-primary-container text-on-primary cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-surface-container-lowest/10 rounded-lg text-on-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
              {renderGrowthBadge(stats.revenueGrowth, true)}
            </div>
            <p className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest text-left">Revenue</p>
            <h3 className="font-headline-md text-display-lg-mobile font-bold mt-1 text-left">₹{stats.revenue.toLocaleString()}</h3>
          </div>

          <div className="glass-card p-6 rounded-lg group hover:border-primary transition-all duration-300 bg-white border border-outline-variant">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-surface-container-high rounded-lg text-primary">
                <span className="material-symbols-outlined">star</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-secondary-container">Lifetime</span>
            </div>
            <p className="font-label-sm text-label-sm text-on-secondary-container uppercase tracking-widest text-left">Store Rating</p>
            <h3 className="font-headline-md text-display-lg-mobile font-bold mt-1 text-left">{stats.rating}</h3>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 glass-card rounded-lg p-6 flex flex-col h-[450px] bg-white border border-outline-variant">
            <div className="flex justify-between items-center mb-8">
              <div className="text-left">
                <h4 className="font-headline-md text-headline-md">Revenue Overview</h4>
                <p className="text-on-secondary-container font-body-md">Transactional volume across all channels</p>
              </div>
            </div>
            <div className="flex-1 w-full relative flex items-center justify-center border-b pb-8">
              <span className="text-xs text-on-surface-variant font-medium">Monthly revenue synced with admin dashboard: ₹{stats.revenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-gutter">
            <div className="glass-card rounded-lg p-6 bg-white border border-outline-variant text-left">
              <h4 className="font-headline-md text-headline-md mb-6">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-4 p-4 bg-surface-container-low hover:bg-surface-container transition-all rounded-lg group cursor-pointer" onClick={() => navigate("/seller/products")}>
                  <div className="p-2 bg-surface-container-lowest border border-outline-variant rounded group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined">add_box</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-on-surface">Add Product</p>
                    <p className="text-xs text-on-secondary-container">List new items to store</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-4 p-4 bg-surface-container-low hover:bg-surface-container transition-all rounded-lg group cursor-pointer" onClick={() => navigate("/seller/products")}>
                  <div className="p-2 bg-surface-container-lowest border border-outline-variant rounded group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined">warehouse</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-on-surface">Manage Inventory</p>
                    <p className="text-xs text-on-secondary-container">Update stock &amp; pricing</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
