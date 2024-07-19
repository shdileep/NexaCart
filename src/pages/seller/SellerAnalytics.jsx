import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerAnalytics() {
  const navigate = useNavigate();

  return (
    <>
      <SellerSidebar active="analytics" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">

<div className="mb-10 flex justify-between items-end">
<div>
<h2 className="font-display-lg text-display-lg text-primary tracking-tight">Seller Insights</h2>
<p className="text-on-secondary-container font-body-md mt-1">Deep-dive performance metrics for NexaCart Enterprise</p>
</div>
<div className="flex gap-2">
<button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-sm font-medium hover:bg-surface-container-low transition-colors">7 Days</button>
<button className="px-4 py-2 bg-primary text-on-primary border border-primary rounded text-sm font-medium">30 Days</button>
<button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-sm font-medium hover:bg-surface-container-low transition-colors">90 Days</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
<div className="flex justify-between items-start mb-4">
<span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">Total Sales</span>
<span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">+12.4%</span>
</div>
<p className="text-3xl font-bold text-primary font-display-lg">$428,192.00</p>
<p className="text-xs text-on-secondary-container mt-2">vs. $381,000.00 last month</p>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
<div className="flex justify-between items-start mb-4">
<span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">Conversion Rate</span>
<span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">+0.8%</span>
</div>
<p className="text-3xl font-bold text-primary font-display-lg">3.82%</p>
<p className="text-xs text-on-secondary-container mt-2">vs. 3.02% last month</p>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
<div className="flex justify-between items-start mb-4">
<span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">Bounce Rate</span>
<span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px] font-bold">-2.1%</span>
</div>
<p className="text-3xl font-bold text-primary font-display-lg">24.5%</p>
<p className="text-xs text-on-secondary-container mt-2">vs. 26.6% last month</p>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
<div className="flex justify-between items-start mb-4">
<span className="text-on-secondary-container text-xs font-label-sm uppercase tracking-widest">AOV</span>
<span className="text-on-secondary-container bg-surface-container px-2 py-0.5 rounded text-[10px] font-bold">STABLE</span>
</div>
<p className="text-3xl font-bold text-primary font-display-lg">$114.50</p>
<p className="text-xs text-on-secondary-container mt-2">vs. $114.20 last month</p>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-8 glass-premium p-8 rounded-lg relative overflow-hidden">
<div className="flex justify-between items-center mb-8 relative z-10">
<div>
<h3 className="text-xl font-bold tracking-tight">Sales Over Time</h3>
<p className="text-sm text-on-secondary-container">Daily transactional volume and performance peaks</p>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-primary rounded-full"></span>
<span className="text-xs font-label-sm uppercase">This Month</span>
</div>
<div className="flex items-center gap-2 opacity-30">
<span className="w-3 h-3 bg-secondary rounded-full"></span>
<span className="text-xs font-label-sm uppercase">Prev Month</span>
</div>
</div>
</div>
<div className="h-64 chart-grid relative w-full flex items-end justify-between px-4">

<div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-primary/5 to-transparent opacity-20 pointer-events-none"></div>

<svg className="absolute inset-x-0 bottom-4 w-full h-48 preserve-3d" preserveAspectRatio="none" viewBox="0 0 800 200">
<path d="M0,150 Q100,50 200,120 T400,60 T600,140 T800,20" fill="none" stroke="black" strokeLinecap="round" strokeWidth="3"></path>
<circle cx="200" cy="120" fill="black" r="4"></circle>
<circle cx="400" cy="60" fill="black" r="4"></circle>
<circle cx="800" cy="20" fill="black" r="4"></circle>
</svg>
<div className="w-full flex justify-between pt-4 mt-auto border-t border-outline-variant/30 text-[10px] font-label-sm text-on-secondary-container">
<span className="">OCT 01</span><span className="">OCT 07</span><span className="">OCT 14</span><span className="">OCT 21</span><span className="">OCT 28</span><span className="">OCT 31</span>
</div>
</div>
</div>

<div className="lg:col-span-4 glass-premium p-8 rounded-lg">
<h3 className="text-xl font-bold tracking-tight mb-2">Traffic Sources</h3>
<p className="text-sm text-on-secondary-container mb-8">Channel attribution breakdown</p>
<div className="relative w-48 h-48 mx-auto mb-8">

<div className="w-full h-full rounded-full" style={{"background": "conic-gradient(#000 0% 45%, #515f74 45% 75%, #eceef0 75% 90%, #d8dadc 90% 100%)"}}></div>
<div className="absolute inset-8 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center text-center">
<p className="text-2xl font-bold">1.2M</p>
<p className="text-[10px] font-label-sm uppercase text-on-secondary-container">Visits</p>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="w-3 h-3 bg-primary rounded-full"></span>
<span className="text-sm">Organic Search</span>
</div>
<span className="font-label-sm text-xs">45%</span>
</div>
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="w-3 h-3 bg-secondary rounded-full"></span>
<span className="text-sm">Social Media</span>
</div>
<span className="font-label-sm text-xs">30%</span>
</div>
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="w-3 h-3 bg-surface-container-high rounded-full"></span>
<span className="text-sm">Direct Traffic</span>
</div>
<span className="font-label-sm text-xs">15%</span>
</div>
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="w-3 h-3 bg-surface-dim rounded-full"></span>
<span className="text-sm">Referral</span>
</div>
<span className="font-label-sm text-xs">10%</span>
</div>
</div>
</div>

<div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-8 rounded-lg">
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="text-xl font-bold tracking-tight">Geographic Distribution</h3>
<p className="text-sm text-on-secondary-container">Top ordering regions globally</p>
</div>
<div className="text-right">
<p className="font-label-sm text-xs text-on-secondary-container uppercase">Main Market</p>
<p className="font-bold text-primary">North America</p>
</div>
</div>
<div className="w-full h-80 rounded bg-surface-container-low overflow-hidden relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
<div className="px-4 py-2 bg-primary text-on-primary text-xs font-label-sm rounded-lg shadow-xl animate-bounce">
                            San Francisco: +24% Sales
                        </div>
</div>
<div className="w-full h-full bg-cover bg-center" data-alt="A sophisticated digital world map with data-driven hot spots and glowing network lines. The aesthetic is monochromatic and ultra-modern, using deep blacks and cool greys with minimal white accents. The lighting is low-key, professional, and suggests high-tech enterprise intelligence. This image should feel like an executive mission control dashboard interface." style={{"backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7c7Yp3fP7u_dV0lJ7d2mIzRCSkv4D4KPShShvAP-noFVi9aARXGDcwWnvXeSy23PXC3odyRUsxvNKO99VTgFwuHNm5ADWfK3Uk7wzDQv40j1PB2lHECpGUB3jSQWCY1TpmX2PXudQKK1PA5AvG8BZ2ybOEwfn3SZu-O01zcqzzM3gofy96hXTvkJQzjPFii0Y7AJJszghuXHG-hhQpvIiTDxPsDkxIsbaEmhf2A8bo-5UPeNOh5tZdbvr0U9oyzCYC-uYPYg_O7Y')"}}></div>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant p-8 rounded-lg flex flex-col">
<h3 className="text-xl font-bold tracking-tight mb-6">AI Optimization Insights</h3>
<div className="space-y-6 flex-1">
<div className="p-4 bg-tertiary-fixed rounded-lg border border-tertiary-container/10">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-tertiary">bolt</span>
<div>
<p className="text-sm font-bold text-on-tertiary-fixed mb-1">Stock Recommendation</p>
<p className="text-xs text-on-tertiary-fixed-variant">"Premium Leather Watch" is trending in the EU market. Consider increasing inventory by 20% to avoid stockouts in Q4.</p>
</div>
</div>
</div>
<div className="p-4 bg-surface-container rounded-lg">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary">campaign</span>
<div>
<p className="text-sm font-bold text-primary mb-1">Campaign Opportunity</p>
<p className="text-xs text-on-secondary-fixed-variant">Social media traffic has a 4.2% higher conversion rate than last month. Double-down on Instagram ad spend for best ROI.</p>
</div>
</div>
</div>
<div className="p-4 bg-error-container/30 rounded-lg border border-error-container">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-error">warning</span>
<div>
<p className="text-sm font-bold text-error mb-1">Checkout Friction</p>
<p className="text-xs text-on-error-container">Drop-off at 'Shipping Selection' has increased by 5%. Review international shipping rates for cost-optimization.</p>
</div>
</div>
</div>
</div>
<button className="w-full mt-8 py-3 border border-primary text-primary font-semibold text-sm rounded hover:bg-primary hover:text-on-primary transition-all duration-300">
                    View Comprehensive Audit
                </button>
</div>
</div>

<div className="mt-12 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
<div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center">
<h3 className="text-lg font-bold">Store Performance Metrics</h3>
<div className="flex gap-4">
<select className="text-xs font-label-sm bg-transparent border-outline-variant rounded">
<option>All Product Categories</option>
<option>Apparel</option>
<option>Electronics</option>
</select>
</div>
</div>
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low">
<th className="px-8 py-4 font-label-sm text-[10px] uppercase tracking-widest text-on-secondary-container">Category</th>
<th className="px-8 py-4 font-label-sm text-[10px] uppercase tracking-widest text-on-secondary-container text-right">Orders</th>
<th className="px-8 py-4 font-label-sm text-[10px] uppercase tracking-widest text-on-secondary-container text-right">Revenue</th>
<th className="px-8 py-4 font-label-sm text-[10px] uppercase tracking-widest text-on-secondary-container text-right">Conv. Rate</th>
<th className="px-8 py-4 font-label-sm text-[10px] uppercase tracking-widest text-on-secondary-container text-center">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/30">
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-sm">laptop_mac</span>
</div>
<div>
<p className="font-semibold text-sm">Consumer Electronics</p>
<p className="text-xs text-on-secondary-container">High-margin products</p>
</div>
</div>
</td>
<td className="px-8 py-5 text-right font-label-sm text-sm">1,204</td>
<td className="px-8 py-5 text-right font-bold text-sm">$182,400.00</td>
<td className="px-8 py-5 text-right text-sm">4.2%</td>
<td className="px-8 py-5 text-center">
<span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">EXCELLENT</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-sm">checkroom</span>
</div>
<div>
<p className="font-semibold text-sm">Luxury Apparel</p>
<p className="text-xs text-on-secondary-container">Fashion &amp; Lifestyle</p>
</div>
</div>
</td>
<td className="px-8 py-5 text-right font-label-sm text-sm">4,520</td>
<td className="px-8 py-5 text-right font-bold text-sm">$154,290.00</td>
<td className="px-8 py-5 text-right text-sm">3.1%</td>
<td className="px-8 py-5 text-center">
<span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">EXCELLENT</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-8 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-sm">home</span>
</div>
<div>
<p className="font-semibold text-sm">Home Decor</p>
<p className="text-xs text-on-secondary-container">Modern Interior</p>
</div>
</div>
</td>
<td className="px-8 py-5 text-right font-label-sm text-sm">842</td>
<td className="px-8 py-5 text-right font-bold text-sm">$85,502.00</td>
<td className="px-8 py-5 text-right text-sm">1.8%</td>
<td className="px-8 py-5 text-center">
<span className="px-2 py-1 bg-surface-container text-on-secondary-container text-[10px] font-bold rounded">AVERAGE</span>
</td>
</tr>
</tbody>
</table>
<div className="px-8 py-4 bg-surface-container-low flex justify-center">
<button className="text-xs font-label-sm text-on-secondary-container hover:text-primary transition-colors flex items-center gap-2">
                    LOAD ALL CATEGORIES <span className="material-symbols-outlined text-sm">expand_more</span>
</button>
</div>
</div>
</main>
    </>
  );
}
