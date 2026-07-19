import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getCurrentUser } from '../../utils/auth';

export default function SellerCoupons() {
  const navigate = useNavigate();
  const seller = getCurrentUser() || { id: 0 };

  const [coupons, setCoupons] = React.useState([]);
  const [couponModalOpen, setCouponModalOpen] = React.useState(false);
  
  // Coupon Form States
  const [couponCode, setCouponCode] = React.useState('');
  const [discountType, setDiscountType] = React.useState('Percentage (%)');
  const [discountValue, setDiscountValue] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [usageLimit, setUsageLimit] = React.useState('');

  const loadCoupons = () => {
    const key = `seller_coupons_${seller.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setCoupons(JSON.parse(stored));
    } else {
      const defaultCoupons = [
        {
          code: 'WELCOME50',
          type: 'Percentage (%)',
          value: '50',
          expiry: '2026-12-31',
          limit: '1000',
          used: 42,
          status: 'Active'
        },
        {
          code: 'TECHFEST15',
          type: 'Percentage (%)',
          value: '15',
          expiry: '2026-10-31',
          limit: '500',
          used: 120,
          status: 'Active'
        }
      ];
      localStorage.setItem(key, JSON.stringify(defaultCoupons));
      setCoupons(defaultCoupons);
    }
  };

  React.useEffect(() => {
    loadCoupons();
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCouponModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [seller.id]);

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!couponCode || !discountValue || !expiryDate || !usageLimit) {
      alert("Please fill in all coupon fields.");
      return;
    }
    
    const newCoupon = {
      code: couponCode.toUpperCase().trim(),
      type: discountType,
      value: discountValue,
      expiry: expiryDate,
      limit: usageLimit,
      used: 0,
      status: new Date(expiryDate) > new Date() ? 'Active' : 'Expired'
    };

    const updated = [newCoupon, ...coupons];
    setCoupons(updated);
    localStorage.setItem(`seller_coupons_${seller.id}`, JSON.stringify(updated));
    setCouponModalOpen(false);

    // Reset Form
    setCouponCode('');
    setDiscountValue('');
    setExpiryDate('');
    setUsageLimit('');
  };

  const usageRate = coupons.length > 0 
    ? ((coupons.reduce((sum, c) => sum + parseInt(c.used), 0) / coupons.reduce((sum, c) => sum + parseInt(c.limit), 0)) * 100).toFixed(1) + '%'
    : '0.0%';

  return (
    <>
      <SellerSidebar active="coupons" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12 text-left">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-display-lg text-display-lg text-primary mb-2">Marketing &amp; Coupons</h2>
              <p className="text-on-secondary-container max-w-2xl">Drive conversions and reward loyalty with precise promotional tools. Manage your merchant campaign ecosystem from a single dashboard.</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white rounded-full font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg cursor-pointer" onClick={() => setCouponModalOpen(true)}>
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Create New Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">Coupon Usage Rate</h3>
                  <p className="font-label-sm text-on-secondary-container uppercase tracking-widest mt-1">Global Campaign Tracking</p>
                </div>
                <div className="text-right">
                  <span className="text-display-lg font-bold text-primary">{usageRate}</span>
                </div>
              </div>

              <div className="h-48 w-full bg-surface-container-low rounded flex items-end justify-between px-4 pb-4 gap-2">
                <div className="w-full bg-primary h-[40%] rounded-t shadow-lg"></div>
                <div className="w-full bg-primary h-[65%] rounded-t shadow-lg"></div>
                <div className="w-full bg-primary h-[85%] rounded-t shadow-lg"></div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="flex-1 glass-card rounded-xl p-6 bg-white border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary-container rounded-lg text-primary">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <span className="font-label-sm text-on-secondary-container">Active Campaigns</span>
                </div>
                <p className="text-display-lg font-bold text-primary">{coupons.filter(c => c.status === 'Active').length}</p>
                <p className="text-on-secondary-container font-body-md mt-2">Ready for customers to apply</p>
              </div>
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-surface-container rounded-lg text-primary">
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <span className="font-label-sm text-on-secondary-container font-semibold">Total Campaigns Created</span>
                </div>
                <p className="text-display-lg font-bold text-primary">{coupons.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-bold text-xs uppercase tracking-wider">
                    <th className="px-6 py-4">Coupon Code</th>
                    <th className="px-6 py-4">Discount Type</th>
                    <th className="px-6 py-4">Value</th>
                    <th className="px-6 py-4">Usage Tracker</th>
                    <th className="px-6 py-4">Expiry Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {coupons.map((c, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-6">
                        <span className="font-mono font-bold text-primary tracking-wider">{c.code}</span>
                      </td>
                      <td className="px-6 py-6 font-medium text-on-surface">{c.type}</td>
                      <td className="px-6 py-6">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                          {c.type.includes('Percentage') ? `${c.value}% OFF` : `₹${c.value} OFF`}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <p className="font-label-sm text-xs text-on-secondary-container">{c.used} / {c.limit} Used</p>
                      </td>
                      <td className="px-6 py-6 text-on-secondary-container">{c.expiry}</td>
                      <td className="px-6 py-6">
                        <span className={`inline-flex items-center gap-1.5 font-semibold text-xs ${c.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                          <span className={`w-2 h-2 rounded-full ${c.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {coupons.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-on-surface-variant">No coupons created. Click the button to create.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* CREATE NEW COUPON MODAL */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden text-left">
            <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-surface">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary">Create New Coupon</h2>
                <p className="text-on-secondary-container text-body-md">Set up your promotional rules and constraints.</p>
              </div>
              <button className="p-2 hover:bg-surface-container rounded-full transition-colors cursor-pointer" onClick={() => setCouponModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateCoupon} className="p-8 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block font-label-sm text-on-secondary-container uppercase mb-2">Coupon Code</label>
                <input 
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-mono focus:ring-0 focus:border-primary uppercase" 
                  placeholder="e.g. SUMMER_VIBES_20" 
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  required
                  type="text" 
                />
              </div>
              <div className="col-span-1">
                <label className="block font-label-sm text-on-secondary-container uppercase mb-2">Discount Type</label>
                <select 
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary"
                  value={discountType}
                  onChange={e => setDiscountType(e.target.value)}
                >
                  <option>Percentage (%)</option>
                  <option>Fixed Amount (₹)</option>
                  <option>Free Shipping</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block font-label-sm text-on-secondary-container uppercase mb-2">Value</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary pr-10" 
                    placeholder="20" 
                    value={discountValue}
                    onChange={e => setDiscountValue(e.target.value)}
                    required
                    type="number" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-primary">
                    {discountType.includes('Percentage') ? '%' : '₹'}
                  </span>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block font-label-sm text-on-secondary-container uppercase mb-2">Expiry Date</label>
                <input 
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary" 
                  type="date" 
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block font-label-sm text-on-secondary-container uppercase mb-2">Usage Limit</label>
                <input 
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary" 
                  placeholder="500" 
                  value={usageLimit}
                  onChange={e => setUsageLimit(e.target.value)}
                  required
                  type="number" 
                />
              </div>
              <div className="col-span-2 pt-4 flex gap-4">
                <button className="flex-1 px-6 py-3 border border-outline-variant rounded-lg font-semibold hover:bg-surface transition-colors cursor-pointer" onClick={() => setCouponModalOpen(false)} type="button">Cancel</button>
                <button className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg cursor-pointer" type="submit">Generate Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
