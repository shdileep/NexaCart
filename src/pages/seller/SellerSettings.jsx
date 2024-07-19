import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';

export default function SellerSettings() {
  const navigate = useNavigate();
  const [activeSettingsTab, setActiveSettingsTab] = React.useState('profile');

  return (
    <>
      <SellerSidebar active="settings" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12 max-w-[1440px]">
<div className="flex flex-col gap-8 max-w-5xl mx-auto">

<div className="flex items-end justify-between">
<div>
<h2 className="font-display-lg text-display-lg text-primary tracking-tight">Seller Settings</h2>
<p className="text-on-surface-variant font-body-md mt-1">Manage your enterprise store profile, security, and global preferences.</p>
</div>
<button className="signature-button text-on-primary font-semibold py-3 px-8 rounded-full flex items-center gap-2 hover:opacity-90 transition-all scale-100 active:scale-95">
                    Save Configuration
                </button>
</div>

<div className="grid grid-cols-12 gap-6">

<div className="col-span-3">
<div className="flex flex-col gap-1 p-2 bg-surface-container-lowest border border-outline-variant rounded-xl sticky top-[104px]">
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all w-full ${activeSettingsTab === "profile" ? "bg-primary text-on-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container font-medium"}`} onClick={() => setActiveSettingsTab("profile")}>
<span className="material-symbols-outlined" data-icon="storefront">storefront</span>
                            Store Profile
                        </button>
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all w-full ${activeSettingsTab === "business" ? "bg-primary text-on-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container font-medium"}`} onClick={() => setActiveSettingsTab("business")}><span className="material-symbols-outlined" data-icon="business_center">business_center</span>
                            Business Details
                        </button>
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all w-full ${activeSettingsTab === "security" ? "bg-primary text-on-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container font-medium"}`} onClick={() => setActiveSettingsTab("security")}><span className="material-symbols-outlined" data-icon="shield">shield</span>
                            Security
                        </button>
<button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all w-full ${activeSettingsTab === "notifications" ? "bg-primary text-on-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container font-medium"}`} onClick={() => setActiveSettingsTab("notifications")}><span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
                            Notifications
                        </button>
</div>
</div>

<div className="col-span-9 space-y-6">

<div className="p-8 bg-surface-container-lowest border border-outline-variant rounded-xl">
<h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-container-high pb-4">Store Profile</h3>
<div className="grid grid-cols-2 gap-8">
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Store Name</label>
<input className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary outline-none transition-all font-body-md" type="text" value="NexaCart Global Hub" />
</div>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Support Email</label>
<input className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary outline-none transition-all font-body-md" type="email" value="priority@nexacart.com" />
</div>
<div className="col-span-2 space-y-2">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Bio / Description</label>
<textarea className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary outline-none transition-all font-body-md" rows="3">Premium electronics and software solutions for enterprise-level logistics and supply chain optimization.</textarea>
</div>
</div>
</div>

<div className="p-8 bg-surface-container-lowest border border-outline-variant rounded-xl">
<h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-container-high pb-4">Business Details</h3>
<div className="grid grid-cols-2 gap-8">
<div className="space-y-2 col-span-2">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Business Address</label>
<input className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary outline-none transition-all font-body-md" type="text" value="1200 Innovation Way, Suite 400, San Francisco, CA 94105" />
</div>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Tax Identification Number (TIN)</label>
<input className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary outline-none transition-all font-body-md" type="text" value="XX-XXXX4821" />
</div>
<div className="space-y-2">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Registration Type</label>
<select className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:border-primary outline-none transition-all font-body-md appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em]">
<option>Corporation (C-Corp)</option>
<option>Limited Liability Company (LLC)</option>
<option>Partnership</option>
</select>
</div>
</div>
</div>

<div className="grid grid-cols-2 gap-6">

<div className="glass-highlight p-8 rounded-xl flex flex-col h-full">
<div className="flex items-center justify-between mb-4">
<h4 className="font-headline-md text-headline-md">Security</h4>
<span className="material-symbols-outlined text-primary" data-icon="verified_user" style={{"fontVariationSettings": "'FILL' 1"}}>verified_user</span>
</div>
<p className="text-on-surface-variant text-sm mb-6">Last login: 14 mins ago from SF, CA</p>
<div className="space-y-4 mt-auto">
<div className="flex items-center justify-between">
<span className="font-body-md">Two-Factor Authentication</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-center justify-between">
<span className="font-body-md">Hardware Key Login</span>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>

<div className="glass-highlight p-8 rounded-xl flex flex-col h-full">
<div className="flex items-center justify-between mb-4">
<h4 className="font-headline-md text-headline-md">Alerts</h4>
<span className="material-symbols-outlined text-primary" data-icon="campaign">campaign</span>
</div>
<p className="text-on-surface-variant text-sm mb-6">Manage how you receive critical system updates.</p>
<div className="space-y-4 mt-auto">
<div className="flex items-center justify-between">
<span className="font-body-md">New Order SMS</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-center justify-between">
<span className="font-body-md">Analytics Reports (Weekly)</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>
</div>

<div className="flex items-center justify-between py-6 px-8 bg-primary-container text-on-primary-container rounded-xl">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined" data-icon="cloud_done">cloud_done</span>
<span className="font-body-md">All changes are drafted. Press save to push live.</span>
</div>
<div className="flex gap-4">
<button className="bg-surface-container-lowest text-primary px-6 py-2 rounded-lg font-semibold hover:bg-surface-container-high transition-colors">Discard</button>
<button className="bg-on-primary-container text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">Push to Production</button>
</div>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
