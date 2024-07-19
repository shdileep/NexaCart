import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerFinance() {
  const navigate = useNavigate();

  return (
    <>
      <SellerSidebar active="finance" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">
<div className="max-w-container-max mx-auto space-y-8">

<section className="flex justify-between items-end">
<div>
<h2 className="font-headline-md text-headline-md font-bold">Finance &amp; Payouts</h2>
<p className="text-on-surface-variant mt-1">Track your earnings, platform fees, and withdrawal history.</p>
</div>
<div className="flex items-center space-x-2 text-sm font-label-sm">
<span className="text-on-surface-variant">Last updated:</span>
<span className="font-bold">Oct 24, 2023, 14:30 PM</span>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="glass-effect p-8 rounded-xl border border-outline-variant bg-white">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-secondary-container rounded-lg">
<span className="material-symbols-outlined text-primary">account_balance_wallet</span>
</div>
<span className="font-label-sm text-green-600 bg-green-50 px-2 py-1 rounded text-xs">+12.5%</span>
</div>
<p className="text-on-surface-variant text-sm font-medium">Available Balance</p>
<h3 className="font-display-lg text-display-lg mt-2">$24,580.00</h3>
<div className="mt-6 flex items-center text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm mr-1">info</span>
                        Ready for instant withdrawal to linked bank.
                    </div>
</div>

<div className="bg-white p-8 rounded-xl border border-outline-variant">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-surface-container rounded-lg">
<span className="material-symbols-outlined text-on-surface-variant">pending_actions</span>
</div>
<span className="font-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded text-xs">Clearing</span>
</div>
<p className="text-on-surface-variant text-sm font-medium">Pending Payout</p>
<h3 className="font-display-lg text-display-lg mt-2">$4,210.50</h3>
<div className="mt-6 flex items-center text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm mr-1">schedule</span>
                        Estimated release: Oct 28, 2023.
                    </div>
</div>

<div className="bg-white p-8 rounded-xl border border-outline-variant">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-tertiary-container rounded-lg">
<span className="material-symbols-outlined text-tertiary-fixed">payments</span>
</div>
<span className="font-label-sm text-on-surface-variant text-xs">YTD Earnings</span>
</div>
<p className="text-on-surface-variant text-sm font-medium">Total Earnings</p>
<h3 className="font-display-lg text-display-lg mt-2">$182,904.00</h3>
<div className="mt-6 flex items-center text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                        24% increase from previous year.
                    </div>
</div>
</section>

<section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
<div className="lg:col-span-3 bg-white border border-outline-variant rounded-xl p-8">
<div className="flex justify-between items-center mb-10">
<div>
<h4 className="font-bold text-lg">Revenue vs. Platform Charges</h4>
<p className="text-sm text-on-surface-variant">Comparison of Gross Income and NexaCart service fees.</p>
</div>
<div className="flex space-x-4">
<div className="flex items-center space-x-2">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="text-xs font-label-sm">Gross Income</span>
</div>
<div className="flex items-center space-x-2">
<span className="w-3 h-3 rounded-full bg-on-primary-container"></span>
<span className="text-xs font-label-sm">NexaCart Fee (5%)</span>
</div>
</div>
</div>
<div className="chart-container flex items-end justify-between space-x-2">

<div className="flex flex-col items-center flex-1">
<div className="w-full flex flex-col-reverse items-center gap-1">
<div className="bg-primary w-8 h-48 rounded-t"></div>
<div className="bg-on-primary-container w-8 h-8 rounded-t"></div>
</div>
<span className="font-label-sm text-[10px] mt-2">JAN</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full flex flex-col-reverse items-center gap-1">
<div className="bg-primary w-8 h-40 rounded-t"></div>
<div className="bg-on-primary-container w-8 h-6 rounded-t"></div>
</div>
<span className="font-label-sm text-[10px] mt-2">FEB</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full flex flex-col-reverse items-center gap-1">
<div className="bg-primary w-8 h-56 rounded-t"></div>
<div className="bg-on-primary-container w-8 h-10 rounded-t"></div>
</div>
<span className="font-label-sm text-[10px] mt-2">MAR</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full flex flex-col-reverse items-center gap-1">
<div className="bg-primary w-8 h-64 rounded-t"></div>
<div className="bg-on-primary-container w-8 h-12 rounded-t"></div>
</div>
<span className="font-label-sm text-[10px] mt-2">APR</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full flex flex-col-reverse items-center gap-1">
<div className="bg-primary w-8 h-52 rounded-t"></div>
<div className="bg-on-primary-container w-8 h-9 rounded-t"></div>
</div>
<span className="font-label-sm text-[10px] mt-2">MAY</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full flex flex-col-reverse items-center gap-1">
<div className="bg-primary w-8 h-72 rounded-t"></div>
<div className="bg-on-primary-container w-8 h-14 rounded-t"></div>
</div>
<span className="font-label-sm text-[10px] mt-2">JUN</span>
</div>
</div>
</div>
<div className="bg-primary-container text-white rounded-xl p-8 flex flex-col justify-between">
<div>
<h4 className="font-bold text-lg text-white">Fee Structure</h4>
<p className="text-on-primary-container text-sm mt-2">Your current seller tier: <span className="text-white font-bold">Gold</span></p>
</div>
<div className="space-y-4 py-8">
<div className="flex justify-between border-b border-white/10 pb-2">
<span className="text-on-primary-container text-xs">Standard Fee</span>
<span className="text-white font-label-sm">5.0%</span>
</div>
<div className="flex justify-between border-b border-white/10 pb-2">
<span className="text-on-primary-container text-xs">Payment Processing</span>
<span className="text-white font-label-sm">2.9% + $0.30</span>
</div>
<div className="flex justify-between border-b border-white/10 pb-2">
<span className="text-on-primary-container text-xs">Marketplace Tax</span>
<span className="text-white font-label-sm">Variable</span>
</div>
</div>
<button className="w-full py-3 rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/10 transition-colors">
                        View Detailed Agreement
                    </button>
</div>
</section>

<section className="bg-white border border-outline-variant rounded-xl overflow-hidden">
<div className="p-8 flex justify-between items-center border-b border-outline-variant">
<div>
<h4 className="font-bold text-lg">Recent Transactions</h4>
<p className="text-sm text-on-surface-variant">Breakdown of earnings and fees for your latest orders.</p>
</div>
<button className="flex items-center text-sm font-semibold hover:underline">
                        Download CSV <span className="material-symbols-outlined text-sm ml-1">download</span>
</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead className="bg-surface-container-low font-label-sm text-label-sm">
<tr>
<th className="px-8 py-4 text-on-surface-variant">DATE &amp; ORDER ID</th>
<th className="px-8 py-4 text-on-surface-variant">CUSTOMER</th>
<th className="px-8 py-4 text-on-surface-variant">GROSS AMOUNT</th>
<th className="px-8 py-4 text-on-surface-variant">PLATFORM FEE</th>
<th className="px-8 py-4 text-on-surface-variant text-right">NET INCOME</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container">
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-8 py-6">
<div className="font-bold">Oct 24, 2023</div>
<div className="text-xs text-on-surface-variant">ORD-9923842</div>
</td>
<td className="px-8 py-6">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center mr-3 text-xs font-bold text-primary">SC</div>
<span className="">Sarah Connor</span>
</div>
</td>
<td className="px-8 py-6 font-semibold">$1,250.00</td>
<td className="px-8 py-6">
<div className="text-error font-medium">-$62.50</div>
<div className="text-[10px] text-on-surface-variant">5% NexaCart Fee</div>
</td>
<td className="px-8 py-6 text-right font-bold text-primary">$1,187.50</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-8 py-6">
<div className="font-bold">Oct 23, 2023</div>
<div className="text-xs text-on-surface-variant">ORD-9923811</div>
</td>
<td className="px-8 py-6">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center mr-3 text-xs font-bold text-white">MW</div>
<span className="">Marcus Wright</span>
</div>
</td>
<td className="px-8 py-6 font-semibold">$840.00</td>
<td className="px-8 py-6">
<div className="text-error font-medium">-$42.00</div>
<div className="text-[10px] text-on-surface-variant">5% NexaCart Fee</div>
</td>
<td className="px-8 py-6 text-right font-bold text-primary">$798.00</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-8 py-6">
<div className="font-bold">Oct 22, 2023</div>
<div className="text-xs text-on-surface-variant">ORD-9923790</div>
</td>
<td className="px-8 py-6">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-outline-variant flex items-center justify-center mr-3 text-xs font-bold text-on-surface">KA</div>
<span className="">Kyle Armstrong</span>
</div>
</td>
<td className="px-8 py-6 font-semibold">$2,100.00</td>
<td className="px-8 py-6">
<div className="text-error font-medium">-$105.00</div>
<div className="text-[10px] text-on-surface-variant">5% NexaCart Fee</div>
</td>
<td className="px-8 py-6 text-right font-bold text-primary">$1,995.00</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-8 py-6">
<div className="font-bold">Oct 22, 2023</div>
<div className="text-xs text-on-surface-variant">ORD-9923765</div>
</td>
<td className="px-8 py-6">
<div className="flex items-center">
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3 text-xs font-bold text-white">DL</div>
<span className="">Dina Laurel</span>
</div>
</td>
<td className="px-8 py-6 font-semibold">$450.00</td>
<td className="px-8 py-6">
<div className="text-error font-medium">-$22.50</div>
<div className="text-[10px] text-on-surface-variant">5% NexaCart Fee</div>
</td>
<td className="px-8 py-6 text-right font-bold text-primary">$427.50</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-outline-variant flex justify-center">
<button className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Load More Transactions</button>
</div>
</section>
</div>
</main>
    </>
  );
}
