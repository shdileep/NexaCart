import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerCustomers() {
  const navigate = useNavigate();

  return (
    <>
      <SellerSidebar active="customers" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">

<div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-headline-md text-display-lg-mobile md:text-headline-md text-primary tracking-tight">Customer Intelligence</h2>
<p className="text-on-secondary-container mt-1 max-w-2xl">Monitor merchant relationships, analyze lifetime value, and segment your high-performance buyer base with institutional precision.</p>
</div>
<div className="flex items-center gap-3">
<button className="px-4 py-2 rounded border border-outline-variant bg-surface-container-lowest text-primary font-medium text-sm flex items-center gap-2 hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">filter_list</span>
                    Advanced Filters
                </button>
<button className="px-4 py-2 rounded border border-outline-variant bg-surface-container-lowest text-primary font-medium text-sm flex items-center gap-2 hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">download</span>
                    Export CSV
                </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

<div className="glass-card p-6 rounded-lg flex flex-col justify-between overflow-hidden relative group">
<div className="relative z-10">
<div className="flex items-center justify-between mb-4">
<span className="text-on-secondary-container font-label-sm text-label-sm">RETURNING CUSTOMER RATE</span>
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings": "'FILL' 1"}}>trending_up</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-primary">64.2%</span>
<span className="text-xs font-semibold text-primary">+4.5%</span>
</div>
</div>
<div className="mt-6 h-12 w-full flex items-end gap-1 relative z-10">
<div className="w-full h-1/2 bg-surface-container rounded-t-sm group-hover:bg-primary-container transition-all duration-300"></div>
<div className="w-full h-2/3 bg-surface-container rounded-t-sm group-hover:bg-primary-container transition-all duration-300"></div>
<div className="w-full h-3/4 bg-surface-container rounded-t-sm group-hover:bg-primary-container transition-all duration-300"></div>
<div className="w-full h-1/2 bg-surface-container rounded-t-sm group-hover:bg-primary-container transition-all duration-300"></div>
<div className="w-full h-5/6 bg-primary rounded-t-sm"></div>
</div>
<div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent opacity-50"></div>
</div>

<div className="glass-card p-6 rounded-lg flex flex-col justify-between overflow-hidden relative group">
<div className="relative z-10">
<div className="flex items-center justify-between mb-4">
<span className="text-on-secondary-container font-label-sm text-label-sm">AVG ORDER FREQUENCY</span>
<span className="material-symbols-outlined text-primary">sync</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-primary">12.4</span>
<span className="text-xs font-label-sm text-label-sm text-on-secondary-container uppercase">Days / Order</span>
</div>
</div>
<div className="mt-6 flex items-center justify-between relative z-10">
<div className="text-xs text-on-secondary-container">Target: 10.0</div>
<div className="w-2/3 h-1 bg-surface-container-highest rounded-full overflow-hidden">
<div className="w-4/5 h-full bg-primary"></div>
</div>
</div>
<div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent opacity-50"></div>
</div>

<div className="glass-card p-6 rounded-lg flex flex-col justify-between bg-primary-container relative">
<div className="relative z-10">
<div className="flex items-center justify-between mb-4">
<span className="text-on-primary-container font-label-sm text-label-sm">NEW ACQUISITIONS</span>
<span className="material-symbols-outlined text-on-primary">person_add</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-on-primary">1,284</span>
<span className="text-xs font-semibold text-on-primary-container">MTD</span>
</div>
</div>
<div className="mt-6 flex gap-2 relative z-10">
<span className="px-2 py-1 bg-on-primary-fixed-variant text-[10px] text-on-primary rounded font-bold uppercase tracking-widest">Enterprise</span>
<span className="px-2 py-1 bg-surface-container-lowest/10 text-[10px] text-on-primary rounded font-bold uppercase tracking-widest">Global</span>
</div>
</div>

<div className="glass-card p-6 rounded-lg flex flex-col justify-between relative">
<div className="relative z-10">
<div className="flex items-center justify-between mb-4">
<span className="text-on-secondary-container font-label-sm text-label-sm">CHURN PROBABILITY</span>
<span className="material-symbols-outlined text-error">warning</span>
</div>
<div className="flex items-baseline gap-2">
<span className="text-3xl font-bold text-primary">2.1%</span>
<span className="text-xs font-semibold text-error">Stable</span>
</div>
</div>
<div className="mt-6 flex items-center gap-1">
<div className="h-1 flex-1 bg-error/20 rounded-full"></div>
<div className="h-1 flex-1 bg-error/20 rounded-full"></div>
<div className="h-1 flex-1 bg-surface-container rounded-full"></div>
<div className="h-1 flex-1 bg-surface-container rounded-full"></div>
<div className="h-1 flex-1 bg-surface-container rounded-full"></div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded border border-outline-variant overflow-hidden">
<div className="p-6 border-b border-outline-variant flex items-center justify-between">
<h3 className="font-bold text-primary text-lg">Merchant Master List</h3>
<div className="flex gap-4">
<select className="text-xs border-outline-variant rounded bg-surface-container-low font-medium py-1 px-3 focus:ring-0">
<option>All Segments</option>
<option>High LTV</option>
<option>At Risk</option>
</select>
</div>
</div>
<div className="overflow-x-auto custom-scrollbar">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant">
<tr>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Profile</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Customer Name</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Email Address</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider text-right">Total Orders</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider text-right">Lifetime Value</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Last Purchase</th>
<th className="px-6 py-4 font-label-sm text-label-sm text-on-secondary-fixed-variant uppercase tracking-wider text-center">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<img className="w-10 h-10 rounded-full border border-outline-variant" data-alt="Close-up headshot of a female executive in her 40s, looking professional and approachable. She is set against a blurred background of a modern architectural interior with clean lines and soft daylight. The lighting is crisp and flattering, emphasizing a high-end corporate aesthetic. The style is minimal, bright, and polished." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI3Vzpu5_CViPOy5nM_w2fVqR1jkjnvktXvZAPZVAvpa8NMWHHelrBjDTEHtF-eGYm6_u8QXv-Z7Ce7FgoqT5WhxPynSjDASErmdQdC9p2inKOM6df-ZyrxgJtf6deX-YCcs_UoDy1RyXdAiTzA9MuOdLazQ5LzL0WQXsbnZIHbpqfgr-pILJTWA7Je8Vshk28wU25CcVgaPdDHBt-CaFaaVk7kckTju4yzHU9eICKu4iRhb2Ygs_CCqvG9sayh_0jq1AWjlGv4Ho" />
</td>
<td className="px-6 py-4">
<span className="font-semibold text-primary block">Eleanor Vance</span>
<span className="text-xs text-on-secondary-container">Premium Tier</span>
</td>
<td className="px-6 py-4">
<span className="text-on-surface-variant font-label-sm">e.vance@vanguard-logistics.com</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-semibold">142</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-bold">$24,905.00</span>
</td>
<td className="px-6 py-4">
<span className="text-on-secondary-container text-sm">Oct 24, 2023</span>
</td>
<td className="px-6 py-4 text-center">
<span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-[10px] font-bold uppercase">Active</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<img className="w-10 h-10 rounded-full border border-outline-variant" data-alt="Professional portrait of a male business owner in a modern, brightly lit environment. He is wearing a tailored navy suit and looks confident. The background is a sophisticated office space with blurred minimalist furniture and large windows letting in natural light. The overall mood is serious, professional, and trustworthy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBviHHfE93iB9EG45gdm9yOcHw_2sRxrjaVhJNDeDeeKzRNEjyKZrMfLTxT1zQaehwQoXDnpBTG1lxDtAkZvQLDM4_9MxBo1Lm7iSNng4aadXXvaYefmt6_4vi7WepKha2mfWm-Dq4g4XkTdlO2LQ7qdz0MCKj3xVJkpsS8u1dHs2zo6gcf-Zz9pbdkI66qzqSoYzbyJxug5XW7GsIW_U83i2DYDNML9lTMJ4sFPBzCPIQQ79S-Af7I2VH6k_OhbPGK8Fp7RbYGh1o" />
</td>
<td className="px-6 py-4">
<span className="font-semibold text-primary block">Marcus Thorne</span>
<span className="text-xs text-on-secondary-container">Wholesale Account</span>
</td>
<td className="px-6 py-4">
<span className="text-on-surface-variant font-label-sm">marcus.t@thornemedia.io</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-semibold">89</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-bold">$18,240.50</span>
</td>
<td className="px-6 py-4">
<span className="text-on-secondary-container text-sm">Oct 23, 2023</span>
</td>
<td className="px-6 py-4 text-center">
<span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-[10px] font-bold uppercase">Active</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<img className="w-10 h-10 rounded-full border border-outline-variant" data-alt="A clean, minimalist profile photo of a tech professional in a bright, modern setting. The subject is a young woman wearing a structured cream blazer. The background is an out-of-focus high-end workspace with white desks and indoor plants. Lighting is bright and neutral, creating a polished, institutional look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRVwSGpMnfBKYzgA_z1K4S-Sb9QnFAR_TJ4XEUGRHsXt8cJ53Ie8kYW4CX2MY65NgnYqojUsCJkZG22SMjBEoG86Wq-bLtui665-LyDMYOJcL8GI9e2wxDZ8YxZUAwkK2szZiBeZuOBpo2boWoHwnaYGDM5hiQgC0PG_3p1zEjOnXHcEHO23gkdiKAOMPOwORLah8CVmWBu_NJOWWUr5Cl-sFK1sYch-hsNklG8uCBdvsv1iEUOrOn2PTJEcNSWuivTrLaulf25Jw" />
</td>
<td className="px-6 py-4">
<span className="font-semibold text-primary block">Sarah Jenkins</span>
<span className="text-xs text-on-secondary-container">Standard Consumer</span>
</td>
<td className="px-6 py-4">
<span className="text-on-surface-variant font-label-sm">jenkins.sarah@gmail.com</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-semibold">12</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-bold">$1,450.00</span>
</td>
<td className="px-6 py-4">
<span className="text-on-secondary-container text-sm">Oct 18, 2023</span>
</td>
<td className="px-6 py-4 text-center">
<span className="px-2 py-1 bg-surface-container text-on-secondary-variant rounded text-[10px] font-bold uppercase">Dormant</span>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold border border-outline-variant">
                                    JW
                                </div>
</td>
<td className="px-6 py-4">
<span className="font-semibold text-primary block">Julian Ward</span>
<span className="text-xs text-on-secondary-container">Global Partner</span>
</td>
<td className="px-6 py-4">
<span className="text-on-surface-variant font-label-sm">j.ward@horizon-intl.com</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-semibold">256</span>
</td>
<td className="px-6 py-4 text-right">
<span className="text-primary font-bold">$104,800.20</span>
</td>
<td className="px-6 py-4">
<span className="text-on-secondary-container text-sm">Oct 25, 2023</span>
</td>
<td className="px-6 py-4 text-center">
<span className="px-2 py-1 bg-primary text-on-primary rounded text-[10px] font-bold uppercase">VIP</span>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
<span className="text-xs text-on-secondary-container font-medium">Showing 1 to 10 of 1,284 customers</span>
<div className="flex items-center gap-2">
<button className="p-1 rounded border border-outline-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="px-3 py-1 rounded border border-primary bg-primary text-on-primary text-xs font-bold">1</button>
<button className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container text-xs font-medium">2</button>
<button className="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container text-xs font-medium">3</button>
<button className="p-1 rounded border border-outline-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
<p className="text-[10px] font-label-sm uppercase tracking-widest text-on-surface-variant">NexaCart ERP Systems • Internal Use Only</p>
<div className="flex gap-6">
<a className="text-[10px] font-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary" href="#">System Status</a>
<a className="text-[10px] font-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary" href="#">Data Protection</a>
<a className="text-[10px] font-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary" href="#">Support Desk</a>
</div>
</div>
</main>
    </>
  );
}
