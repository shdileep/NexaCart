import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, getOrders, getCurrentUser } from '../../utils/auth';

export default function SellerFinance() {
  const navigate = useNavigate();
  const currentSeller = getCurrentUser();
  const [loading, setLoading] = React.useState(true);
  const [finance, setFinance] = React.useState({
    availableBalance: 0,
    pendingPayout: 0,
    totalEarnings: 0
  });
  const [monthlyCharges, setMonthlyCharges] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      if (!currentSeller?.id) return;
      setLoading(true);

      const allProds = await getProducts();
      const sellerProds = allProds.filter(p => p.seller_id === currentSeller.id);

      const allOrders = await getOrders();
      const filteredOrders = allOrders.filter(o => sellerProds.some(sp => sp.id === o.productId));

      // Delivered orders constitute Total Earnings
      const deliveredOrders = filteredOrders.filter(o => o.status.toLowerCase() === 'delivered');
      const totalEarnings = deliveredOrders.reduce((sum, o) => sum + parseFloat(o.amount), 0);

      // Pending/processing orders constitute Pending Payout
      const pendingOrders = filteredOrders.filter(o => o.status.toLowerCase() === 'pending' || o.status.toLowerCase() === 'processing' || o.status.toLowerCase() === 'shipped');
      const pendingPayout = pendingOrders.reduce((sum, o) => sum + parseFloat(o.amount), 0);

      // Available balance is earnings minus a standard platform fee (5%)
      const availableBalance = totalEarnings * 0.95;

      // Generate mock charges data for last 6 months based on actual sales
      const months = ['May', 'Jun', 'Jul'];
      const monthMap = { 'May': 0, 'Jun': 0, 'Jul': 0 };
      deliveredOrders.forEach(o => {
        const d = new Date(o.date);
        const mName = d.toLocaleString('default', { month: 'short' });
        if (monthMap[mName] !== undefined) {
          monthMap[mName] += parseFloat(o.amount);
        }
      });

      const chartData = months.map(m => {
        const gross = monthMap[m] || 0;
        const fee = gross * 0.05;
        const grossHeight = Math.max(10, Math.min(100, (gross / (totalEarnings || 1)) * 100));
        const feeHeight = Math.max(5, grossHeight * 0.2);
        return {
          month: m,
          gross,
          fee,
          grossHeight: `${grossHeight}%`,
          feeHeight: `${feeHeight}%`
        };
      });

      setFinance({
        availableBalance,
        pendingPayout,
        totalEarnings
      });
      setMonthlyCharges(chartData);
      setLoading(false);
    }
    loadData();
  }, [currentSeller?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-primary font-bold animate-pulse">Loading Financial Ledger...</p>
      </div>
    );
  }

  return (
    <>
      <SellerSidebar active="finance" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12 text-left">
        <div className="max-w-container-max mx-auto space-y-8">
          <section className="flex justify-between items-end">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold">Finance &amp; Payouts</h2>
              <p className="text-on-surface-variant mt-1">Track your earnings, platform fees, and withdrawal history.</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect p-8 rounded-xl border border-outline-variant bg-white">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-secondary-container rounded-lg text-primary">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm font-medium">Available Balance (Gross minus 5% Fee)</p>
              <h3 className="font-display-lg text-display-lg mt-2">₹{finance.availableBalance.toLocaleString()}</h3>
            </div>

            <div className="bg-white p-8 rounded-xl border border-outline-variant">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-surface-container rounded-lg text-primary">
                  <span className="material-symbols-outlined">pending_actions</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm font-medium">Pending Payout (In-Transit)</p>
              <h3 className="font-display-lg text-display-lg mt-2">₹{finance.pendingPayout.toLocaleString()}</h3>
            </div>

            <div className="bg-white p-8 rounded-xl border border-outline-variant">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-tertiary-container rounded-lg text-primary">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm font-medium">Total Gross Earnings</p>
              <h3 className="font-display-lg text-display-lg mt-2">₹{finance.totalEarnings.toLocaleString()}</h3>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-4 bg-white border border-outline-variant rounded-xl p-8">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h4 className="font-bold text-lg">Revenue vs. Platform Charges</h4>
                  <p className="text-sm text-on-surface-variant">Comparison of Gross Income and NexaCart service fees (5%).</p>
                </div>
              </div>
              <div className="flex justify-between items-end gap-6 h-64 border-b border-outline-variant/30 pb-4">
                {monthlyCharges.map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col-reverse items-center gap-1.5 h-48 justify-end">
                      <div className="bg-primary w-12 rounded-t transition-all hover:opacity-85" style={{ height: data.grossHeight }}></div>
                      <div className="bg-on-primary-container w-12 rounded-t opacity-80" style={{ height: data.feeHeight }}></div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider mt-4">{data.month}</span>
                    <div className="text-[10px] text-on-surface-variant mt-1">
                      <p>Gross: ₹{data.gross.toLocaleString()}</p>
                      <p>Fee: ₹{data.fee.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {monthlyCharges.length === 0 && (
                  <p className="text-center w-full py-12 text-on-surface-variant">No finance ledger records found.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
