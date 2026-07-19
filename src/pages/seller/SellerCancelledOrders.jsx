import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerCancelledOrders() {
  const navigate = useNavigate();

  return (
    <>
      <SellerSidebar active="orders" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">

<div className="flex justify-between items-end mb-8">
<div>
<nav className="flex items-center gap-2 text-on-secondary-container font-label-sm mb-2">
<span className="">Orders</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span className="text-primary font-semibold">Cancelled Orders</span>
</nav>
<h2 className="font-display-lg text-display-lg text-primary tracking-tight">Cancelled Orders</h2>
<p className="text-on-secondary-container mt-1">Manage and audit transactions that were terminated before completion.</p>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container transition-all font-body-md">
<span className="material-symbols-outlined text-[20px]">file_download</span>
                    Export CSV
                </button>
<button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-full hover:opacity-90 transition-all font-body-md font-semibold">
<span className="material-symbols-outlined text-[20px]">add</span>
                    Create Manual Refund
                </button>
</div>
</div>

<div className="flex items-center gap-8 border-b border-outline-variant mb-6">
<button  className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative" onClick={() => navigate("/seller/processing-orders")}>
                All Orders
            </button>
<button  className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative" onClick={() => navigate("/seller/processing-orders")}>
                Pending
            </button>
<button  className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative" onClick={() => navigate("/seller/processing-orders")}>
                Shipped
            </button>
<button  className="pb-4 px-1 font-body-md text-primary font-semibold relative" onClick={() => navigate("/seller/cancelled-orders")}>
                Cancelled
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full"></div>
</button>
<button className="pb-4 px-1 font-body-md text-on-secondary-container hover:text-primary transition-all relative">
                Archived
            </button>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">

<div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
<div className="flex gap-4">
<div className="relative">
<select className="pl-3 pr-10 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm font-body-md focus:ring-0 focus:border-primary appearance-none">
<option>Reason: All</option>
<option>Out of Stock</option>
<option>Customer Request</option>
<option>Fraud Detected</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-secondary-container text-[20px]">expand_more</span>
</div>
<div className="relative">
<select className="pl-3 pr-10 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm font-body-md focus:ring-0 focus:border-primary appearance-none">
<option>Refund: All</option>
<option>Completed</option>
<option>Processing</option>
<option>Failed</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-secondary-container text-[20px]">expand_more</span>
</div>
</div>
<div className="text-label-sm text-on-secondary-container">
                    Showing 124 cancelled orders
                </div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low/50">
<th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Order ID</th>
<th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Customer</th>
<th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Amount</th>
<th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Cancellation Reason</th>
<th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider">Refund Status</th>
<th className="px-6 py-4 font-label-sm text-on-secondary-container border-b border-outline-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-5">
<span className="font-label-sm text-primary">#NC-89241</span>
<div className="text-[11px] text-on-secondary-container">2 mins ago</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-semibold text-xs">JD</div>
<div>
<div className="font-body-md font-medium text-primary">Julianne Devis</div>
<div className="text-xs text-on-secondary-container">julianne@example.com</div>
</div>
</div>
</td>
<td className="px-6 py-5 font-body-md font-semibold text-primary">$1,240.00</td>
<td className="px-6 py-5">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm">
                                    Out of Stock
                                </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
<span className="font-body-md text-sm text-on-surface">Completed</span>
</div>
</td>
<td className="px-6 py-5 text-right">
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-on-secondary-container">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-5">
<span className="font-label-sm text-primary">#NC-89238</span>
<div className="text-[11px] text-on-secondary-container">14 mins ago</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-fixed font-semibold text-xs">MR</div>
<div>
<div className="font-body-md font-medium text-primary">Marcus Raine</div>
<div className="text-xs text-on-secondary-container">m.raine@enterprise.io</div>
</div>
</div>
</td>
<td className="px-6 py-5 font-body-md font-semibold text-primary">$450.20</td>
<td className="px-6 py-5">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm">
                                    Customer Request
                                </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-amber-400"></div>
<span className="font-body-md text-sm text-on-surface">Processing</span>
</div>
</td>
<td className="px-6 py-5 text-right">
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-on-secondary-container">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-5">
<span className="font-label-sm text-primary">#NC-89215</span>
<div className="text-[11px] text-on-secondary-container">1 hour ago</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-secondary-container font-semibold text-xs">SK</div>
<div>
<div className="font-body-md font-medium text-primary">Sarah Kensley</div>
<div className="text-xs text-on-secondary-container">sarah.k@webmail.com</div>
</div>
</div>
</td>
<td className="px-6 py-5 font-body-md font-semibold text-primary">$2,890.00</td>
<td className="px-6 py-5">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm">
                                    Fraud Detected
                                </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2 text-error">
<span className="material-symbols-outlined text-sm">block</span>
<span className="font-body-md text-sm">No Refund Req.</span>
</div>
</td>
<td className="px-6 py-5 text-right">
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-on-secondary-container">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-5">
<span className="font-label-sm text-primary">#NC-89190</span>
<div className="text-[11px] text-on-secondary-container">3 hours ago</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-semibold text-xs">TH</div>
<div>
<div className="font-body-md font-medium text-primary">Thomas H.</div>
<div className="text-xs text-on-secondary-container">t.h@delivery.net</div>
</div>
</div>
</td>
<td className="px-6 py-5 font-body-md font-semibold text-primary">$89.99</td>
<td className="px-6 py-5">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm">
                                    Out of Stock
                                </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
<span className="font-body-md text-sm text-on-surface">Completed</span>
</div>
</td>
<td className="px-6 py-5 text-right">
<button className="p-2 rounded-lg hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-on-secondary-container">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-4 border-t border-outline-variant flex justify-between items-center">
<button className="px-4 py-1.5 rounded-lg border border-outline-variant text-sm font-medium hover:bg-surface-container transition-all flex items-center gap-1">
<span className="material-symbols-outlined text-sm">chevron_left</span>
                    Previous
                </button>
<div className="flex gap-1">
<button className="w-8 h-8 rounded bg-primary text-on-primary text-sm font-semibold">1</button>
<button className="w-8 h-8 rounded hover:bg-surface-container text-sm">2</button>
<button className="w-8 h-8 rounded hover:bg-surface-container text-sm">3</button>
<span className="px-2">...</span>
<button className="w-8 h-8 rounded hover:bg-surface-container text-sm">12</button>
</div>
<button className="px-4 py-1.5 rounded-lg border border-outline-variant text-sm font-medium hover:bg-surface-container transition-all flex items-center gap-1">
                    Next
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
<div className="glass-effect p-6 rounded-xl">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-error-container/20 rounded-lg">
<span className="material-symbols-outlined text-error">cancel_presentation</span>
</div>
<span className="text-error font-label-sm">+4.2%</span>
</div>
<h4 className="font-label-sm text-on-secondary-container uppercase">Cancellation Rate</h4>
<div className="text-3xl font-display-lg text-primary mt-1">2.4%</div>
<p className="text-xs text-on-secondary-container mt-2">Target benchmark: under 1.5%</p>
</div>
<div className="glass-effect p-6 rounded-xl">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-emerald-100 rounded-lg">
<span className="material-symbols-outlined text-emerald-600">currency_exchange</span>
</div>
<span className="text-emerald-600 font-label-sm">-12%</span>
</div>
<h4 className="font-label-sm text-on-secondary-container uppercase">Avg. Refund Time</h4>
<div className="text-3xl font-display-lg text-primary mt-1">18.4 hrs</div>
<p className="text-xs text-on-secondary-container mt-2">Improved from 21.0 hrs last month</p>
</div>
<div className="bg-primary text-on-primary p-6 rounded-xl relative overflow-hidden group">
<div className="relative z-10">
<h4 className="font-label-sm text-on-primary-container uppercase">Projected Loss Recovery</h4>
<div className="text-3xl font-display-lg mt-1">$42,390.11</div>
<p className="text-xs opacity-70 mt-2">Revenue recovered through re-stocking &amp; re-engagement</p>
<button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 transition-all rounded-lg font-label-sm">
                        View Audit Log
                    </button>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
<span className="material-symbols-outlined text-[120px]">trending_up</span>
</div>
</div>
</div>
</main>
    </>
  );
}
