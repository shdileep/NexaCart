import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerCoupons() {
  const navigate = useNavigate();
  const [couponModalOpen, setCouponModalOpen] = React.useState(false);
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCouponModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SellerSidebar active="coupons" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">
        <div className="max-w-container-max mx-auto">

<div className="flex justify-between items-end mb-8">
<div>
<h2 className="font-display-lg text-display-lg text-primary mb-2">Marketing &amp; Coupons</h2>
<p className="text-on-secondary-container max-w-2xl">Drive conversions and reward loyalty with precise promotional tools. Manage your merchant campaign ecosystem from a single dashboard.</p>
</div>
<button className="px-6 py-3 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white rounded-full font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg" onClick={() => setCouponModalOpen(true)}>
<span className="material-symbols-outlined text-[20px]">add</span>
<span className="">Create New Coupon</span>
</button>
</div>

<div className="grid grid-cols-12 gap-6 mb-12">
<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden">
<div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">

</div>
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="font-headline-md text-headline-md text-primary">Coupon Usage Rate</h3>
<p className="font-label-sm text-on-secondary-container uppercase tracking-widest mt-1">Last 30 Days</p>
</div>
<div className="text-right">
<span className="text-display-lg font-bold text-primary">24.8%</span>
<div className="flex items-center justify-end text-green-600 font-semibold gap-1 text-label-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="">+4.2%</span>
</div>
</div>
</div>

<div className="h-48 w-full bg-surface-container-low rounded flex items-end justify-between px-4 pb-4 gap-2">
<div className="w-full bg-primary-container h-[20%] opacity-20 rounded-t"></div>
<div className="w-full bg-primary-container h-[35%] opacity-30 rounded-t"></div>
<div className="w-full bg-primary-container h-[25%] opacity-20 rounded-t"></div>
<div className="w-full bg-primary-container h-[55%] opacity-40 rounded-t"></div>
<div className="w-full bg-primary-container h-[45%] opacity-30 rounded-t"></div>
<div className="w-full bg-primary-container h-[75%] opacity-60 rounded-t"></div>
<div className="w-full bg-primary h-[90%] rounded-t shadow-lg shadow-primary/20"></div>
<div className="w-full bg-primary-container h-[60%] opacity-40 rounded-t"></div>
</div>
</div>
<div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
<div className="flex-1 glass-card rounded-xl p-6">
<div className="flex items-center gap-3 mb-4">
<div className="p-2 bg-tertiary-container rounded-lg">
<span className="material-symbols-outlined text-white">payments</span>
</div>
<span className="font-label-sm text-on-secondary-container">Revenue via Promotions</span>
</div>
<p className="text-display-lg font-bold text-primary">$142,500</p>
<p className="text-on-secondary-container font-body-md mt-2">Driven by 12 active campaigns</p>
</div>
<div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
<div className="flex items-center gap-3 mb-4">
<div className="p-2 bg-surface-container rounded-lg text-primary">
<span className="material-symbols-outlined">group</span>
</div>
<span className="font-label-sm text-on-secondary-container">Average Order Value (Coupons)</span>
</div>
<p className="text-display-lg font-bold text-primary">$84.20</p>
<p className="text-on-secondary-container font-body-md mt-2">15% higher than non-coupon orders</p>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
<div className="flex gap-4">
<button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold text-body-md">All Coupons</button>
<button className="px-4 py-2 text-on-secondary-container hover:bg-surface-container rounded-lg font-medium text-body-md transition-colors">Active</button>
<button className="px-4 py-2 text-on-secondary-container hover:bg-surface-container rounded-lg font-medium text-body-md transition-colors">Scheduled</button>
<button className="px-4 py-2 text-on-secondary-container hover:bg-surface-container rounded-lg font-medium text-body-md transition-colors">Expired</button>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-on-secondary-container">Filter by:</span>
<select className="bg-transparent border-none focus:ring-0 font-semibold text-body-md text-primary">
<option>Most Recent</option>
<option>Highest Discount</option>
<option>Usage Count</option>
</select>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">
<th className="px-6 py-4 font-medium">Coupon Details</th>
<th className="px-6 py-4 font-medium">Discount</th>
<th className="px-6 py-4 font-medium">Usage</th>
<th className="px-6 py-4 font-medium">Expiry</th>
<th className="px-6 py-4 font-medium">Status</th>
<th className="px-6 py-4 font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/30">

<tr className="hover:bg-surface transition-colors">
<td className="px-6 py-6">
<div>
<p className="font-label-sm text-primary font-bold text-lg mb-1">SUMMER2024</p>
<p className="text-on-secondary-container text-body-md opacity-70">Sitewide Summer Sale Campaign</p>
</div>
</td>
<td className="px-6 py-6">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                                        25% OFF
                                    </span>
</td>
<td className="px-6 py-6">
<div className="flex flex-col gap-1">
<div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-3/4"></div>
</div>
<p className="font-label-sm text-[10px] text-on-secondary-container">750 / 1000 Used</p>
</div>
</td>
<td className="px-6 py-6 font-label-sm text-on-secondary-container">
                                    Aug 31, 2024
                                </td>
<td className="px-6 py-6">
<span className="flex items-center gap-1.5 text-green-600 font-semibold text-body-md">
<span className="w-2 h-2 rounded-full bg-green-600"></span>
                                        Active
                                    </span>
</td>
<td className="px-6 py-6 text-right">
<button className="text-on-secondary-container hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>

<tr className="hover:bg-surface transition-colors">
<td className="px-6 py-6">
<div>
<p className="font-label-sm text-primary font-bold text-lg mb-1">WELCOME50</p>
<p className="text-on-secondary-container text-body-md opacity-70">First-time Customer Bonus</p>
</div>
</td>
<td className="px-6 py-6">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                                        $50.00 OFF
                                    </span>
</td>
<td className="px-6 py-6">
<div className="flex flex-col gap-1">
<div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-[95%]"></div>
</div>
<p className="font-label-sm text-[10px] text-on-secondary-container">4,821 / 5,000 Used</p>
</div>
</td>
<td className="px-6 py-6 font-label-sm text-on-secondary-container">
                                    No Expiry
                                </td>
<td className="px-6 py-6">
<span className="flex items-center gap-1.5 text-green-600 font-semibold text-body-md">
<span className="w-2 h-2 rounded-full bg-green-600"></span>
                                        Active
                                    </span>
</td>
<td className="px-6 py-6 text-right">
<button className="text-on-secondary-container hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>

<tr className="hover:bg-surface transition-colors bg-surface-container-low/10">
<td className="px-6 py-6 opacity-60">
<div>
<p className="font-label-sm text-primary font-bold text-lg mb-1">WINTER23</p>
<p className="text-on-secondary-container text-body-md opacity-70 line-through">Winter Seasonal Clearance</p>
</div>
</td>
<td className="px-6 py-6 opacity-60">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-highest text-on-surface-variant">
                                        40% OFF
                                    </span>
</td>
<td className="px-6 py-6 opacity-60">
<div className="flex flex-col gap-1">
<div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-on-secondary-container w-full"></div>
</div>
<p className="font-label-sm text-[10px] text-on-secondary-container">2,000 / 2,000 Used</p>
</div>
</td>
<td className="px-6 py-6 font-label-sm text-on-secondary-container opacity-60">
                                    Dec 31, 2023
                                </td>
<td className="px-6 py-6">
<span className="flex items-center gap-1.5 text-on-secondary-container font-semibold text-body-md">
<span className="w-2 h-2 rounded-full bg-on-secondary-container"></span>
                                        Expired
                                    </span>
</td>
<td className="px-6 py-6 text-right">
<button className="text-on-secondary-container hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant flex items-center justify-between">
<p className="font-label-sm text-on-secondary-container">Showing 1-10 of 42 promotions</p>
<div className="flex gap-2">
<button className="p-2 border border-outline-variant rounded hover:bg-surface transition-colors disabled:opacity-30" disabled="">
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button className="p-2 border border-outline-variant rounded hover:bg-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>

<div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${couponModalOpen ? "" : "hidden"}`}>
<div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setCouponModalOpen(false)}></div>
<div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
<div className="p-8 border-b border-outline-variant flex justify-between items-center bg-surface">
<div>
<h2 className="font-headline-md text-headline-md text-primary">Create New Coupon</h2>
<p className="text-on-secondary-container text-body-md">Set up your promotional rules and constraints.</p>
</div>
<button className="p-2 hover:bg-surface-container rounded-full transition-colors" onClick={() => setCouponModalOpen(false)}>
<span className="material-symbols-outlined">close</span>
</button>
</div>
<form className="p-8 grid grid-cols-2 gap-6">
<div className="col-span-2">
<label className="block font-label-sm text-on-secondary-container uppercase mb-2">Coupon Code</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-label-sm focus:ring-0 focus:border-primary uppercase" placeholder="e.g. SUMMER_VIBES_20" type="text" />
</div>
<div className="col-span-1">
<label className="block font-label-sm text-on-secondary-container uppercase mb-2">Discount Type</label>
<select className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary">
<option>Percentage (%)</option>
<option>Fixed Amount ($)</option>
<option>Free Shipping</option>
</select>
</div>
<div className="col-span-1">
<label className="block font-label-sm text-on-secondary-container uppercase mb-2">Value</label>
<div className="relative">
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary pr-10" placeholder="20" type="number" />
<span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-primary">%</span>
</div>
</div>
<div className="col-span-1">
<label className="block font-label-sm text-on-secondary-container uppercase mb-2">Expiry Date</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary" type="date" />
</div>
<div className="col-span-1">
<label className="block font-label-sm text-on-secondary-container uppercase mb-2">Usage Limit</label>
<input className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-md focus:ring-0 focus:border-primary" placeholder="500" type="number" />
</div>
<div className="col-span-2 pt-4 flex gap-4">
<button className="flex-1 px-6 py-3 border border-outline-variant rounded-lg font-semibold hover:bg-surface transition-colors" onClick={() => setCouponModalOpen(false)} type="button">Cancel</button>
<button className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg" type="submit">Generate Coupon</button>
</div>
</form>
</div>
</div>

<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

</div>
    </>
  );
}
