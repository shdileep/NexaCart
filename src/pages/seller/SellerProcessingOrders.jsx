import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerProcessingOrders() {
  const navigate = useNavigate();

  return (
    <>
      <SellerSidebar active="orders" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">

<div className="p-gutter max-w-container-max mx-auto">

<div className="flex justify-between items-end mb-8">
<div>
<nav className="flex items-center gap-2 text-on-secondary-container mb-2">
<span className="text-[12px]">Dashboard</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="text-[12px] font-semibold text-primary">Orders</span>
</nav>
<h2 className="font-headline-md text-headline-md text-primary">Order Management</h2>
<p className="text-on-secondary-container mt-1">Manage and fulfillment of your enterprise sales pipeline.</p>
</div>
<button className="px-6 py-3 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-on-primary rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
<span className="material-symbols-outlined text-[20px] group-active:scale-90 transition-transform">bolt</span>
                    Bulk Process
                </button>
</div>

<div className="grid grid-cols-4 gap-6 mb-8">
<div className="glass-card p-6 rounded-lg">
<p className="text-on-secondary-container font-label-sm mb-2">AWAITING SHIPMENT</p>
<div className="flex items-end justify-between">
<h3 className="text-[32px] font-bold text-primary">124</h3>
<span className="text-error font-semibold flex items-center gap-1 text-[14px]">
<span className="material-symbols-outlined text-[16px]">trending_up</span> +12%
                        </span>
</div>
</div>
<div className="glass-card p-6 rounded-lg">
<p className="text-on-secondary-container font-label-sm mb-2">AVG. PROCESSING TIME</p>
<div className="flex items-end justify-between">
<h3 className="text-[32px] font-bold text-primary">4.2h</h3>
<span className="text-on-secondary-container text-[14px]">-0.5h from avg</span>
</div>
</div>
<div className="glass-card p-6 rounded-lg">
<p className="text-on-secondary-container font-label-sm mb-2">PICK LISTS READY</p>
<div className="flex items-end justify-between">
<h3 className="text-[32px] font-bold text-primary">18</h3>
<span className="material-symbols-outlined text-primary">description</span>
</div>
</div>
<div className="glass-card p-6 rounded-lg bg-primary-container border-none overflow-hidden relative group">
<div className="relative z-10">
<p className="text-on-primary-container font-label-sm mb-2">SHIPPING QUOTA</p>
<h3 className="text-[32px] font-bold text-white">88%</h3>
</div>
<div className="absolute bottom-0 left-0 h-1 bg-white transition-all duration-1000" style={{"width": "88%"}}></div>
</div>
</div>

<div className="mb-6 flex items-center justify-between border-b border-outline-variant">
<div className="flex gap-8">
<button  className="pb-4 text-on-secondary-container font-medium hover:text-primary transition-colors relative" onClick={() => navigate("/seller/processing-orders")}>
                        All Orders
                    </button>
<button  className="pb-4 text-primary font-semibold relative" onClick={() => navigate("/seller/processing-orders")}>
                        Processing
                        <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary"></div>
</button>
<button  className="pb-4 text-on-secondary-container font-medium hover:text-primary transition-colors relative" onClick={() => navigate("/seller/cancelled-orders")}>
                        Cancelled
                    </button>
<button  className="pb-4 text-on-secondary-container font-medium hover:text-primary transition-colors relative" onClick={() => navigate("/seller/returns")}>
                        Returns
                    </button>
</div>
<div className="flex items-center gap-4 pb-2">
<button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
<span className="text-body-md">Filters</span>
</button>
<button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-[18px]">export_notes</span>
<span className="text-body-md">Export</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant">
<th className="p-4 w-12">
<input className="rounded-[0.25rem] border-outline-variant text-primary focus:ring-primary h-4 w-4" type="checkbox" />
</th>
<th className="p-4 font-label-sm text-label-sm">ORDER ID</th>
<th className="p-4 font-label-sm text-label-sm">CUSTOMER</th>
<th className="p-4 font-label-sm text-label-sm">PRODUCT</th>
<th className="p-4 font-label-sm text-label-sm">AMOUNT</th>
<th className="p-4 font-label-sm text-label-sm">STATUS</th>
<th className="p-4 font-label-sm text-label-sm text-right">ACTION</th>
</tr>
</thead>
<tbody className="divide-y divide-[#f1f5f9]">

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="p-4">
<input className="rounded-[0.25rem] border-outline-variant text-primary focus:ring-primary h-4 w-4" type="checkbox" />
</td>
<td className="p-4">
<span className="font-label-sm text-primary font-bold">#ORD-88219</span>
</td>
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-[12px]">JD</div>
<div>
<p className="font-semibold text-primary">Jonathan Davis</p>
<p className="text-[12px] text-on-secondary-container">jon.davis@enterprise.com</p>
</div>
</div>
</td>
<td className="p-4">
<div>
<p className="text-primary">Apex Pro Workstation x2</p>
<p className="text-[12px] text-on-secondary-container">SKU: APX-2024-WKS</p>
</div>
</td>
<td className="p-4">
<span className="font-semibold text-primary">$4,598.00</span>
</td>
<td className="p-4">
<span className="px-3 py-1 bg-surface-container text-on-secondary-container rounded font-label-sm text-[11px] flex items-center gap-1.5 w-fit">
<span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container"></span>
                                    Awaiting Shipment
                                </span>
</td>
<td className="p-4 text-right">
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="p-4">
<input className="rounded-[0.25rem] border-outline-variant text-primary focus:ring-primary h-4 w-4" type="checkbox" />
</td>
<td className="p-4">
<span className="font-label-sm text-primary font-bold">#ORD-88220</span>
</td>
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-white font-bold text-[12px]">SK</div>
<div>
<p className="font-semibold text-primary">Sarah Koenig</p>
<p className="text-[12px] text-on-secondary-container">s.koenig@media.net</p>
</div>
</div>
</td>
<td className="p-4">
<div>
<p className="text-primary">Lumina Display 32"</p>
<p className="text-[12px] text-on-secondary-container">SKU: LUM-32-ULT</p>
</div>
</td>
<td className="p-4">
<span className="font-semibold text-primary">$1,299.00</span>
</td>
<td className="p-4">
<span className="px-3 py-1 bg-surface-container text-on-secondary-container rounded font-label-sm text-[11px] flex items-center gap-1.5 w-fit">
<span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container"></span>
                                    Awaiting Shipment
                                </span>
</td>
<td className="p-4 text-right">
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="p-4">
<input className="rounded-[0.25rem] border-outline-variant text-primary focus:ring-primary h-4 w-4" type="checkbox" />
</td>
<td className="p-4">
<span className="font-label-sm text-primary font-bold">#ORD-88224</span>
</td>
<td className="p-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-[12px]">MB</div>
<div>
<p className="font-semibold text-primary">Marcus Black</p>
<p className="text-[12px] text-on-secondary-container">m.black@logistics.co</p>
</div>
</div>
</td>
<td className="p-4">
<div>
<p className="text-primary">Evo Mouse Gen 3 x12</p>
<p className="text-[12px] text-on-secondary-container">SKU: EVO-M3-BLK</p>
</div>
</td>
<td className="p-4">
<span className="font-semibold text-primary">$840.00</span>
</td>
<td className="p-4">
<span className="px-3 py-1 bg-surface-container text-on-secondary-container rounded font-label-sm text-[11px] flex items-center gap-1.5 w-fit">
<span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container"></span>
                                    Awaiting Shipment
                                </span>
</td>
<td className="p-4 text-right">
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="p-4">
<input className="rounded-[0.25rem] border-outline-variant text-primary focus:ring-primary h-4 w-4" type="checkbox" />
</td>
<td className="p-4">
<span className="font-label-sm text-primary font-bold">#ORD-88225</span>
</td>
<td className="p-4">
<div className="flex items-center gap-3">
<img className="w-8 h-8 rounded-full object-cover" data-alt="Corporate headshot of a female executive, high contrast black and white photography, professional and minimalist." src="https://lh3.googleusercontent.com/aida-public/AB6AXuARp90oIC-SpM7ALI7jmEluICH2ys_HJllE5YUY8-t_rdQOi0K1c6sAcvzI_I1ia4zVba4LlocR3qsp_vtyH3CxxQ_BYExwtGkgIYtaPCzjSPMysI5vYuAzzIlzftvWCZfS5Y2fX_TAvt6hKoQsqmzzEEMH8qkfmp53US5CahO-hQFc-xzU0RQtxpdXVHdP1xJVIjz5uLkEjm2yb_pnBdDSn8wifxphg_KFv_vGjvxi4KkGZZ_1tfARhtT8_4ZUtKDNwMe1mxMKsWM" />
<div>
<p className="font-semibold text-primary">Linda Zhao</p>
<p className="text-[12px] text-on-secondary-container">l.zhao@fintech.io</p>
</div>
</div>
</td>
<td className="p-4">
<div>
<p className="text-primary">Quantum SSD 4TB</p>
<p className="text-[12px] text-on-secondary-container">SKU: QNT-SSD-4T</p>
</div>
</td>
<td className="p-4">
<span className="font-semibold text-primary">$650.00</span>
</td>
<td className="p-4">
<span className="px-3 py-1 bg-surface-container text-on-secondary-container rounded font-label-sm text-[11px] flex items-center gap-1.5 w-fit">
<span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container"></span>
                                    Awaiting Shipment
                                </span>
</td>
<td className="p-4 text-right">
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>

<div className="p-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant">
<p className="text-[12px] text-on-secondary-container">Showing 4 of 124 processing orders</p>
<div className="flex gap-2">
<button className="p-2 border border-outline-variant rounded hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="px-3 py-1 border border-outline-variant rounded bg-primary text-on-primary text-[12px] font-bold">1</button>
<button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container text-[12px]">2</button>
<button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container text-[12px]">3</button>
<button className="p-2 border border-outline-variant rounded hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="mt-12 grid grid-cols-3 gap-8">
<div className="flex gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary">local_shipping</span>
</div>
<div>
<h4 className="font-semibold text-primary">Logistics API</h4>
<p className="text-[12px] text-on-secondary-container">Connected to FedEx &amp; UPS systems. All labels are generating normally.</p>
</div>
</div>
<div className="flex gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary">inventory</span>
</div>
<div>
<h4 className="font-semibold text-primary">Stock Synchronized</h4>
<p className="text-[12px] text-on-secondary-container">Inventory levels updated 3 mins ago across all global nodes.</p>
</div>
</div>
<div className="flex gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary">security</span>
</div>
<div>
<h4 className="font-semibold text-primary">Risk Assessment</h4>
<p className="text-[12px] text-on-secondary-container">98.2% of current orders cleared fraud verification automatically.</p>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
