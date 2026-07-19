import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, getOrders, getCurrentUser } from '../../utils/auth';

export default function SellerAnalytics() {
  const navigate = useNavigate();
  const currentSeller = getCurrentUser();
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    totalSales: 0,
    conversionRate: '3.82%',
    bounceRate: '24.5%',
    aov: 0,
    orderCount: 0
  });
  const [monthlyRevenue, setMonthlyRevenue] = React.useState([
    { month: 'Jul', value: 0, height: '10%' }
  ]);

  React.useEffect(() => {
    async function loadData() {
      if (!currentSeller?.id || !localStorage.getItem('token')) return;
      setLoading(true);

      const allProds = await getProducts();
      const sellerProds = allProds.filter(p => p.seller_id === currentSeller.id);

      const allOrders = await getOrders();
      // Filter orders belonging to this seller's products
      const filteredOrders = allOrders.filter(o => sellerProds.some(sp => sp.id === o.productId));

      const totalSales = filteredOrders.reduce((sum, o) => sum + parseFloat(o.amount), 0);
      const aov = filteredOrders.length > 0 ? (totalSales / filteredOrders.length) : 0;

      // Group revenue by month for chart
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthMap = {};
      months.forEach(m => { monthMap[m] = 0; });
      
      filteredOrders.forEach(o => {
        // o.date is 'YYYY-MM-DD'
        const dateObj = new Date(o.date);
        const mName = months[dateObj.getMonth()];
        monthMap[mName] += parseFloat(o.amount);
      });

      const maxVal = Math.max(...Object.values(monthMap), 1);
      const chartData = months.map(m => {
        const value = monthMap[m];
        const heightPct = Math.max(10, Math.min(95, (value / maxVal) * 100));
        return {
          month: m,
          value,
          height: `${heightPct}%`
        };
      });

      setStats({
        totalSales,
        conversionRate: filteredOrders.length > 0 ? '4.15%' : '0.00%',
        bounceRate: '24.5%',
        aov,
        orderCount: filteredOrders.length
      });
      setMonthlyRevenue(chartData);
      setLoading(false);
    }
    loadData();
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, [currentSeller?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Seller Insights...</p>
      </div>
    );
  }

  return (
    <>
      <SellerSidebar active="analytics" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12 text-left">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary tracking-tight">Seller Insights</h2>
            <p className="text-on-secondary-container font-body-md mt-1">Deep-dive performance metrics for NexaCart Enterprise</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">Total Sales</span>
            </div>
            <p className="text-3xl font-bold text-primary font-display-lg">₹{stats.totalSales.toLocaleString()}</p>
            <p className="text-xs text-on-secondary-container mt-2">Aggregated sales pipelines</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">Conversion Rate</span>
            </div>
            <p className="text-3xl font-bold text-primary font-display-lg">{stats.conversionRate}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">Bounce Rate</span>
            </div>
            <p className="text-3xl font-bold text-primary font-display-lg">{stats.bounceRate}</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">AOV</span>
            </div>
            <p className="text-3xl font-bold text-primary font-display-lg">₹{stats.aov.toLocaleString()}</p>
            <p className="text-xs text-on-secondary-container mt-2">Based on {stats.orderCount} orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 glass-premium p-8 rounded-lg relative overflow-hidden bg-white border">
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Sales Over Time</h3>
                <p className="text-sm text-on-secondary-container">Monthly transactional volume and performance peaks (INR)</p>
              </div>
            </div>
            <div className="h-64 relative w-full flex items-end justify-between px-6 pb-8 border-b border-outline-variant">
              {monthlyRevenue.map((data, idx) => (
                <div key={idx} style={{ height: data.height }} className="w-12 bg-primary/20 hover:bg-primary/45 rounded-t-lg relative group transition-all flex flex-col justify-end items-center cursor-pointer">
                  <div className="absolute -top-8 bg-on-surface text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow z-10">
                    ₹{data.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-6 text-xs font-label-sm text-secondary uppercase tracking-widest">
              {monthlyRevenue.map((data, idx) => (
                <span key={idx}>{data.month}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
