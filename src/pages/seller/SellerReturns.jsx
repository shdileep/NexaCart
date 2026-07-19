import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerReturns() {
  const navigate = useNavigate();

  return (
    <>
      <SellerSidebar active="orders" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">
<div className="max-w-container-max mx-auto">

<div className="flex justify-between items-end mb-8">
<div>
<nav className="flex items-center gap-2 mb-2">
<span className="font-label-sm text-xs text-on-secondary-container">ORDERS</span>
<span className="material-symbols-outlined text-xs text-on-secondary-container">chevron_right</span>
<span className="font-label-sm text-xs text-primary font-bold">RETURNS</span>
</nav>
<h2 className="font-display-lg text-display-lg text-primary">Returns Management</h2>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2 border border-outline-variant bg-white rounded-lg font-body-md text-sm hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">download</span>
                        Export Report
                    </button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-body-md text-sm font-semibold shadow-lg hover:opacity-90 transition-all">
<span className="material-symbols-outlined text-sm">add</span>
                        Bulk Action
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-8">
<div className="bg-white p-6 border border-outline-variant rounded-lg">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-secondary-container rounded-lg">
<span className="material-symbols-outlined text-secondary">assignment_return</span>
</div>
<span className="text-enterprise-blue font-label-sm text-xs">+12.5%</span>
</div>
<p className="text-on-secondary-container font-label-sm text-xs mb-1">OPEN REQUESTS</p>
<h3 className="font-headline-md text-2xl font-bold">142</h3>
</div>
<div className="bg-white p-6 border border-outline-variant rounded-lg">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-secondary-container rounded-lg">
<span className="material-symbols-outlined text-secondary">pending_actions</span>
</div>
<span className="text-error font-label-sm text-xs">+3.2%</span>
</div>
<p className="text-on-secondary-container font-label-sm text-xs mb-1">PENDING REVIEW</p>
<h3 className="font-headline-md text-2xl font-bold">48</h3>
</div>
<div className="bg-white p-6 border border-outline-variant rounded-lg">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-secondary-container rounded-lg">
<span className="material-symbols-outlined text-secondary">verified</span>
</div>
<span className="text-enterprise-blue font-label-sm text-xs">98.2%</span>
</div>
<p className="text-on-secondary-container font-label-sm text-xs mb-1">RESOLUTION RATE</p>
<h3 className="font-headline-md text-2xl font-bold">24h Avg</h3>
</div>
<div className="bg-white p-6 border border-outline-variant rounded-lg overflow-hidden relative">

<div className="relative z-10">
<p className="text-on-secondary-container font-label-sm text-xs mb-1">TOTAL REFUNDED</p>
<h3 className="font-headline-md text-2xl font-bold">$12,490.50</h3>
<p className="text-[10px] text-on-secondary-container mt-2">Fiscal Month: October</p>
</div>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-lg overflow-hidden">
<div className="border-b border-outline-variant px-6 flex items-center justify-between">
<div className="flex gap-8">
<button  className="py-4 border-b-2 border-primary font-body-md text-sm font-semibold text-primary" onClick={() => navigate("/seller/returns")}>Return Requests</button>
<button className="py-4 border-b-2 border-transparent font-body-md text-sm text-on-secondary-container hover:text-primary transition-colors">In-Transit</button>
<button className="py-4 border-b-2 border-transparent font-body-md text-sm text-on-secondary-container hover:text-primary transition-colors">Completed</button>
<button className="py-4 border-b-2 border-transparent font-body-md text-sm text-on-secondary-container hover:text-primary transition-colors">Disputed</button>
</div>
<div className="flex items-center gap-4">
<button className="flex items-center gap-2 font-body-md text-xs text-on-secondary-container hover:text-primary">
<span className="material-symbols-outlined text-sm">filter_list</span>
                            Filter
                        </button>
<button className="flex items-center gap-2 font-body-md text-xs text-on-secondary-container hover:text-primary">
<span className="material-symbols-outlined text-sm">sort</span>
                            Sort
                        </button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-6 py-4 font-label-sm text-[11px] uppercase tracking-wider text-on-secondary-container">Order ID</th>
<th className="px-6 py-4 font-label-sm text-[11px] uppercase tracking-wider text-on-secondary-container">Product</th>
<th className="px-6 py-4 font-label-sm text-[11px] uppercase tracking-wider text-on-secondary-container">Return Reason</th>
<th className="px-6 py-4 font-label-sm text-[11px] uppercase tracking-wider text-on-secondary-container">Condition</th>
<th className="px-6 py-4 font-label-sm text-[11px] uppercase tracking-wider text-on-secondary-container">Status</th>
<th className="px-6 py-4 font-label-sm text-[11px] uppercase tracking-wider text-on-secondary-container text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container">

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4">
<span className="font-label-sm text-sm text-primary">#ORD-99201</span>
<p className="text-[10px] text-on-secondary-container">2 hours ago</p>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container rounded-sm flex-shrink-0 overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A clean product shot of a high-end minimalist mechanical keyboard in matte black with subtle blue LED backlighting. The image is taken on a white marble surface in a bright, modern studio. The perspective is a shallow depth of field shot, emphasizing industrial design quality and premium manufacturing details consistent with professional technology hardware." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ1A_CKxFmxPGZm_yHZEvinaAZpFD0wZpsmQb13RueOyi4YuA3qdxggimChNkp4Mh1U0_1hPmJLxvKUHwIc87WWwKaZqy3DM_OL0kKQ1IXn3vGuQy7mc2vhzJAwrtOLoP8ZZhQOc_h8us8wgvaHP3r3MPtoU_yDN-fYp0ByV2vTWZ4j2krpfe7nMgsHdPNPI9aGcpsChslfpD298phueG4hQGSRSxitjnygq57SeG2l2d_6NNEGbeJv6OBM05wAFv6KoS_aQUenkk" />
</div>
<div>
<p className="text-sm font-medium">Lumina Pro Keyboard</p>
<p className="text-[10px] text-on-secondary-container">SKU: KBD-BLK-MX</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<p className="text-sm">Item defective / Won't turn on</p>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container text-on-secondary-container rounded text-[10px] font-label-sm">UNOPENED</span>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-enterprise-blue/10 text-enterprise-blue border border-enterprise-blue/20">
<span className="w-1.5 h-1.5 rounded-full bg-enterprise-blue"></span>
                                        Pending Review
                                    </span>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="px-3 py-1 bg-primary text-white text-[11px] font-semibold rounded hover:bg-opacity-80">Approve</button>
<button className="px-3 py-1 border border-outline-variant text-[11px] font-semibold rounded hover:bg-surface-container">Reject</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4">
<span className="font-label-sm text-sm text-primary">#ORD-99184</span>
<p className="text-[10px] text-on-secondary-container">5 hours ago</p>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container rounded-sm flex-shrink-0 overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A macro studio shot of a premium obsidian glass smartphone screen, showcasing high-definition clarity and structural integrity. The device is placed on a minimalist dark surface with architectural lighting that creates subtle gradients. The overall aesthetic is sleek, expensive, and professional, focused on high-quality material textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ArP9W1iHUyJkpZkzs2-iIqeaAZb-yVsHeUtFVmm7SNYack5ZIx1YzhpBETepfSckZor9anrrlBUzIDGLv--XNmy6KONk6tzabsGY9FuSN0YB23_wMDovKAXof63nvBnkiUIfNWzi3YCRDixhvir6mb9eSv8r9DM6y6EW9cETzDCEpOI2UzFaGnjKs5jdLCs5rvFL11KC_SFKsKviBR20ZXzFgvXLYUHVB2XAtuoM_EEmFK74Zg6Kk81img4KrGoizrYVmPFHfxA" />
</div>
<div>
<p className="text-sm font-medium">Edge X Smartphone</p>
<p className="text-[10px] text-on-secondary-container">SKU: PHN-X-256</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<p className="text-sm">Incompatible with software</p>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container text-on-secondary-container rounded text-[10px] font-label-sm">OPENED</span>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-enterprise-blue/10 text-enterprise-blue border border-enterprise-blue/20">
<span className="w-1.5 h-1.5 rounded-full bg-enterprise-blue"></span>
                                        Pending Review
                                    </span>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="px-3 py-1 bg-primary text-white text-[11px] font-semibold rounded hover:bg-opacity-80">Approve</button>
<button className="px-3 py-1 border border-outline-variant text-[11px] font-semibold rounded hover:bg-surface-container">Reject</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4">
<span className="font-label-sm text-sm text-primary">#ORD-99150</span>
<p className="text-[10px] text-on-secondary-container">12 hours ago</p>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container rounded-sm flex-shrink-0 overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A professional product photograph of studio-quality noise-canceling headphones in matte silver and premium white leather. The product is captured in a minimalist, airy studio setting with soft directional lighting. The composition highlights the premium craftsmanship and ergonomic design, utilizing a clean and corporate visual style with no distractions." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAUynS4ObWBkoqkLC2Mtvmz94TRFhqSbxuq8Z-FYxOFuQoJp6lKnt9wCFdOmEgpApLD8SweBLNTeIlVUQkRhBbnrZv2FCE0AUyp5caK6_OZvdi9fv_GliIu3K8dLq2gJSS3HC9WdhueRpXig_YKnv-Qnlp-T3zEwfFTVjpPK-vEjQT57q0fVZI-IpnpVVRddWlfG9QTYPB9wcpDfqFKQD0PrhHDdyV6ZDsvLNM7vqsKU_CNpdu1ZMrEQnNNsU3kOmehct2-8khyVE" />
</div>
<div>
<p className="text-sm font-medium">Sonic-Flow Headset</p>
<p className="text-[10px] text-on-secondary-container">SKU: AUD-SF-WHT</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<p className="text-sm">Changed mind / Better price found</p>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container text-on-secondary-container rounded text-[10px] font-label-sm">DAMAGED BOX</span>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-tertiary-container/20 text-tertiary border border-outline">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                                        Returned
                                    </span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-on-secondary-container hover:text-primary transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4">
<span className="font-label-sm text-sm text-primary">#ORD-99102</span>
<p className="text-[10px] text-on-secondary-container">Yesterday</p>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-surface-container rounded-sm flex-shrink-0 overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A sharp, minimalist architectural shot of a sleek desktop computer workstation, featuring a high-resolution curved monitor and brushed aluminum components. The setting is a modern, high-tech office with cool, professional lighting. The image emphasizes high-end enterprise equipment and precision engineering in a corporate context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2qzOB2Y9PngiAUy8PCGhLDj7kc6b9hbuT-bTROyDfxibRntuP-LPCQ8CUTQkXoO1-RBpvZKhTuzm7rYg8hbvZbeMUbiXXKv8OCkASN219IZ_YMgq_GiZ51PZ5VgIKJWXaU0f6ezJIPkMi-RR3oRBVT_MuB0fCh6voEfbwtbJPCnvhPxvB1CbH25BXW2Ql2JEgROZ41cDQEN-bayrZGoFm1mo9dvd__xhq23QupPwRnPsK7HEZfs6i4KXISApgF7_tadsBxHx6nxI" />
</div>
<div>
<p className="text-sm font-medium">Ultra-Wide 34" Monitor</p>
<p className="text-[10px] text-on-secondary-container">SKU: MON-UW-34</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<p className="text-sm">Arrived damaged (Screen crack)</p>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-error-container text-on-error-container rounded text-[10px] font-label-sm">DAMAGED</span>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-enterprise-blue/10 text-enterprise-blue border border-enterprise-blue/20">
<span className="w-1.5 h-1.5 rounded-full bg-enterprise-blue"></span>
                                        Pending Review
                                    </span>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="px-3 py-1 bg-primary text-white text-[11px] font-semibold rounded hover:bg-opacity-80">Approve</button>
<button className="px-3 py-1 border border-outline-variant text-[11px] font-semibold rounded hover:bg-surface-container">Reject</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
<p className="font-label-sm text-xs text-on-secondary-container">Showing 4 of 142 results</p>
<div className="flex items-center gap-2">
<button className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-lg">chevron_left</span>
</button>
<div className="flex gap-1">
<button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-xs">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container text-xs">3</button>
</div>
<button className="p-1 border border-outline-variant rounded hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-lg">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-gutter">
<div className="lg:col-span-2 bg-white border border-outline-variant rounded-lg p-6">
<h4 className="font-headline-md text-lg mb-4">Return Policy Effectiveness</h4>
<div className="h-48 flex items-end gap-4 px-4 pb-8 border-b border-outline-variant relative">

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-surface-container-high rounded-t h-3/4 relative group">
<div className="absolute bottom-0 w-full bg-enterprise-blue rounded-t transition-all duration-500" style={{"height": "65%"}}></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">Electronics: 65%</div>
</div>
<span className="font-label-sm text-[10px]">ELEC</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-surface-container-high rounded-t h-full relative group">
<div className="absolute bottom-0 w-full bg-enterprise-blue rounded-t transition-all duration-500" style={{"height": "40%"}}></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">Apparel: 40%</div>
</div>
<span className="font-label-sm text-[10px]">APRL</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-surface-container-high rounded-t h-full relative group">
<div className="absolute bottom-0 w-full bg-enterprise-blue rounded-t transition-all duration-500" style={{"height": "85%"}}></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">Home: 85%</div>
</div>
<span className="font-label-sm text-[10px]">HOME</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-surface-container-high rounded-t h-full relative group">
<div className="absolute bottom-0 w-full bg-enterprise-blue rounded-t transition-all duration-500" style={{"height": "25%"}}></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">Beauty: 25%</div>
</div>
<span className="font-label-sm text-[10px]">BEAU</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-surface-container-high rounded-t h-full relative group">
<div className="absolute bottom-0 w-full bg-enterprise-blue rounded-t transition-all duration-500" style={{"height": "55%"}}></div>
<div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">Tools: 55%</div>
</div>
<span className="font-label-sm text-[10px]">TOOL</span>
</div>
</div>
<div className="mt-4 flex justify-between">
<p className="text-xs text-on-secondary-container">Trends indicate a 5% drop in "defective" claims this month.</p>
<button className="text-enterprise-blue text-xs font-semibold hover:underline">View detailed analytics</button>
</div>
</div>
<div className="glass-premium p-6 rounded-lg border border-outline-variant">
<h4 className="font-headline-md text-lg mb-4">Quick Insights</h4>
<ul className="space-y-4">
<li className="flex gap-3">
<div className="p-2 bg-enterprise-blue/10 rounded">
<span className="material-symbols-outlined text-enterprise-blue text-sm">trending_up</span>
</div>
<div>
<p className="text-sm font-semibold">High Return SKU</p>
<p className="text-xs text-on-secondary-container">SKU: KBD-BLK-MX has 14% higher return rate than average.</p>
</div>
</li>
<li className="flex gap-3">
<div className="p-2 bg-enterprise-blue/10 rounded">
<span className="material-symbols-outlined text-enterprise-blue text-sm">info</span>
</div>
<div>
<p className="text-sm font-semibold">Refund Delay</p>
<p className="text-xs text-on-secondary-container">Finance processing is currently 4h slower than SLA.</p>
</div>
</li>
<li className="flex gap-3">
<div className="p-2 bg-enterprise-blue/10 rounded">
<span className="material-symbols-outlined text-enterprise-blue text-sm">auto_awesome</span>
</div>
<div>
<p className="text-sm font-semibold">AI Recommendation</p>
<p className="text-xs text-on-secondary-container">Suggest updating product description for Edge X Smartphone.</p>
</div>
</li>
</ul>
</div>
</div>
</div>
</main>
    </>
  );
}
