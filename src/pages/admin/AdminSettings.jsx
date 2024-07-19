import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('general');
  const [maintenance, setMaintenance] = React.useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
<main className="ml-64 mt-16 p-margin-desktop min-h-[calc(100vh-64px)]">
<div className="max-w-[1200px] mx-auto">
<header className="mb-10">
<h1 className="font-display-lg text-display-lg text-primary mb-2">Platform Settings</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Configure your enterprise platform parameters and security protocols.</p>
</header>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/* Settings Sub-Navigation */}
<div className="lg:col-span-3">
<nav className="flex flex-col space-y-1 sticky top-24">
<button className={`tab-btn flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'general' ? 'font-semibold bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} id="tab-general" onClick={() => setActiveTab('general')}>
<span className="material-symbols-outlined">tune</span>
<span>General</span>
</button>
<button className={`tab-btn flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'security' ? 'font-semibold bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} id="tab-security" onClick={() => setActiveTab('security')}>
<span className="material-symbols-outlined">verified_user</span>
<span>Security</span>
</button>
<button className={`tab-btn flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'notifications' ? 'font-semibold bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} id="tab-notifications" onClick={() => setActiveTab('notifications')}>
<span className="material-symbols-outlined">notifications_active</span>
<span>Notifications</span>
</button>
<button className={`tab-btn flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'payments' ? 'font-semibold bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} id="tab-payments" onClick={() => setActiveTab('payments')}>
<span className="material-symbols-outlined">payments</span>
<span>Payments</span>
</button>
<button className={`tab-btn flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'api' ? 'font-semibold bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} id="tab-api" onClick={() => setActiveTab('api')}>
<span className="material-symbols-outlined">integration_instructions</span>
<span>API &amp; Integrations</span>
</button>
<button className={`tab-btn flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'team' ? 'font-semibold bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} id="tab-team" onClick={() => setActiveTab('team')}>
<span className="material-symbols-outlined">groups</span>
<span>Team Management</span>
</button>
</nav>
</div>
{/* Settings Content Canvas */}
<div className="lg:col-span-9">
{/* General Settings Pane */}
<div className={activeTab === 'general' ? 'space-y-gutter' : 'hidden'}>
<section className="bg-surface-container-lowest border border-outline-variant rounded-brand p-8 shadow-sm">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-md text-headline-md">Brand Configuration</h3>
<span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">System Default</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-4">
<label className="block">
<span className="block font-semibold text-sm mb-1">Brand Name</span>
<input className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-0 transition-all font-body-md" type="text" value="NexaCart Enterprise"/>
<p className="text-xs text-on-surface-variant mt-1">This name will appear in transaction emails and invoices.</p>
</label>
<label className="block">
<span className="block font-semibold text-sm mb-1">Support Email</span>
<input className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-0 transition-all font-body-md" type="email" value="support@nexacart.com"/>
</label>
</div>
<div className="space-y-4">
<span className="block font-semibold text-sm mb-1">Platform Logo</span>
<div className="flex items-center gap-6 p-4 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low">
<div className="w-16 h-16 bg-primary flex items-center justify-center rounded-xl">
<span className="material-symbols-outlined text-on-primary text-3xl">shopping_cart</span>
</div>
<div className="flex flex-col gap-2">
<button className="text-sm font-semibold text-primary hover:underline">Replace Logo</button>
<span className="text-xs text-on-surface-variant">SVG, PNG or JPG. Max 2MB.</span>
</div>
</div>
</div>
</div>
</section>
{/* Regional Settings */}
<section className="bg-surface-container-lowest border border-outline-variant rounded-brand p-8 shadow-sm">
<h3 className="font-headline-md text-headline-md mb-6">Regional Settings</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<label>
<span className="block font-semibold text-sm mb-1">Currency</span>
<select className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-0">
<option>USD ($) - US Dollar</option>
<option>EUR (€) - Euro</option>
<option>GBP (£) - British Pound</option>
</select>
</label>
<label>
<span className="block font-semibold text-sm mb-1">Timezone</span>
<select className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-0">
<option>(GMT-05:00) Eastern Time</option>
<option>(GMT+00:00) London</option>
<option>(GMT+08:00) Singapore</option>
</select>
</label>
<label>
<span className="block font-semibold text-sm mb-1">Locale</span>
<select className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-0">
<option>English (United States)</option>
<option>French (France)</option>
<option>German (Germany)</option>
</select>
</label>
</div>
</section>
{/* Maintenance Mode */}
<section className="bg-surface-container-lowest border border-outline-variant rounded-brand p-8 shadow-sm">
<div className="flex items-start justify-between">
<div className="max-w-xl">
<h3 className="font-headline-md text-headline-md mb-2">Maintenance Mode</h3>
<p className="text-on-surface-variant mb-4">Temporarily disable public access to your store while you perform updates. Admins can still access the dashboard and storefront.</p>
<div className="inline-flex items-center gap-3 bg-error-container text-on-error-container px-4 py-2 rounded-lg text-sm">
<span className="material-symbols-outlined text-lg">warning</span>
<span>Enabling this will halt all checkout processes immediately.</span>
</div>
</div>
<div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in mt-2">
<input className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-outline-variant appearance-none cursor-pointer z-10 outline-none transition-transform duration-200 ease-in-out" id="maintenance-toggle" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} type="checkbox"/>
<label className="switch-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="maintenance-toggle"></label>
</div>
</div>
</section>
</div>
{/* Security Settings Pane (Hidden by default) */}
<div className={activeTab === 'security' ? 'space-y-gutter' : 'hidden'}>
<section className="bg-surface-container-lowest border border-outline-variant rounded-brand p-8 shadow-sm">
<h3 className="font-headline-md text-headline-md mb-6">Password Policies</h3>
<div className="space-y-6">
<div className="flex items-center justify-between py-4 border-b border-surface-container">
<div>
<h4 className="font-semibold text-on-surface">Force Password Expiry</h4>
<p className="text-sm text-on-surface-variant">Require users to change passwords every 90 days.</p>
</div>
<input checked="" className="rounded border-outline-variant text-primary focus:ring-0 w-5 h-5" type="checkbox"/>
</div>
<div className="flex items-center justify-between py-4 border-b border-surface-container">
<div>
<h4 className="font-semibold text-on-surface">Minimum Complexity</h4>
<p className="text-sm text-on-surface-variant">Require at least one uppercase letter and one special character.</p>
</div>
<input checked="" className="rounded border-outline-variant text-primary focus:ring-0 w-5 h-5" type="checkbox"/>
</div>
</div>
</section>
<section className="bg-surface-container-lowest border border-outline-variant rounded-brand p-8 shadow-sm">
<div className="flex items-start justify-between">
<div>
<h3 className="font-headline-md text-headline-md mb-2">Two-Factor Authentication (2FA)</h3>
<p className="text-on-surface-variant mb-4">Mandatory 2FA for all administrator accounts using authenticator apps or security keys.</p>
</div>
<div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
<input checked="" className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-outline-variant appearance-none cursor-pointer z-10 outline-none transition-transform duration-200 ease-in-out" id="2fa-toggle" type="checkbox"/>
<label className="switch-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="2fa-toggle"></label>
</div>
</div>
</section>
<section className="bg-surface-container-lowest border border-outline-variant rounded-brand p-8 shadow-sm">
<h3 className="font-headline-md text-headline-md mb-4">IP Whitelisting</h3>
<p className="text-sm text-on-surface-variant mb-6">Restrict admin dashboard access to specific IP addresses. Useful for VPN-only access.</p>
<div className="space-y-4">
<div className="flex gap-2">
<input className="flex-1 rounded-lg border-outline-variant focus:border-primary focus:ring-0 font-label-sm text-label-sm" placeholder="e.g. 192.168.1.1" type="text"/>
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">Add IP</button>
</div>
<div className="flex flex-wrap gap-2">
<span className="inline-flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg text-sm font-label-sm">
                                        127.0.0.1
                                        <button className="material-symbols-outlined text-sm">close</button>
</span>
<span className="inline-flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg text-sm font-label-sm">
                                        203.0.113.42
                                        <button className="material-symbols-outlined text-sm">close</button>
</span>
</div>
</div>
</section>
</div>
{/* Action Bar */}
<div className="mt-8 flex items-center justify-end gap-4 pb-12">
<button className="px-8 py-3 rounded-lg border border-outline-variant font-semibold hover:bg-surface-container transition-colors">Discard Changes</button>
<button className="px-8 py-3 rounded-lg bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white font-semibold shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all border-t border-white/10">Save Configuration</button>
</div>
</div>
</div>
</div>
</main>
    </div>

  );
}
