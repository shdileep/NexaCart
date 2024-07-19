import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Portal() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col justify-between bg-background p-6">
      {/* Header Section */}
      <header className="w-full max-w-container-max mx-auto flex items-center justify-between z-50">
        <div onClick={() => navigate("/")} className="flex items-center gap-2 group cursor-pointer transition-all duration-300 active:opacity-70">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary transition-colors tracking-widest uppercase">Back</span>
        </div>
        <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-2 font-bold text-xl text-primary">
          <span className="material-symbols-outlined">shopping_basket</span>
          <span>NexaCart</span>
        </div>
      </header>

      {/* Main content centered */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-container-max mx-auto py-8">
        {/* Central Branding Area */}
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate("/")}>
          <div className="inline-flex flex-col items-center gap-4">
            <img alt="NexaCart Enterprise Logo" className="w-20 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-500 ease-in-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp-WJhnF-sTQfWUSu8e9XvoR-ngqMBVB4VEBDQZFvT51y-pGTQVYvZ7elac-xYrZ7D2D8gqS_f06V_Mc22DhCJbdHTVXDnzhvFDVBw9_e01fgitb_B34XVFSCbDUatCDpsv6wuhohDLg-AyavwLbtE91Hj-Qs2FoKLESgR_xPLb9ifihP_U03swUFP3bW994ZdBKIDg-Wq0iUTjHuKvLOBFxpqBdx7ChtTXfryLl_oA9fOFYodYRPQwXDw66-rMVM818SFq29e6Ao" />
            <div className="space-y-1">
              <h1 className="font-display-lg text-4xl text-primary tracking-tight">NexaCart</h1>
              <p className="text-on-surface-variant text-sm max-w-md mx-auto">Select your destination to access the enterprise commerce ecosystem.</p>
            </div>
          </div>
        </div>

        {/* Portal Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Card 1: Admin */}
          <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col items-start h-full border border-outline-variant/30 group transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl transition-all duration-300 group-hover:scale-110">admin_panel_settings</span>
            </div>
            <h2 className="font-headline-md text-xl text-primary mb-2">Admin Portal</h2>
            <p className="text-on-surface-variant text-xs mb-8 flex-grow leading-relaxed">Centralized Governance. Manage global operations, security protocols, and system-wide configurations with precision.</p>
            <button onClick={() => navigate("/admin/login")} className="w-full bg-primary text-on-primary font-semibold py-3 px-4 rounded-full flex items-center justify-center hover:opacity-90 transition-all">
              <span>Get Started</span>
            </button>
          </div>

          {/* Card 2: Merchant Portal */}
          <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col items-start h-full border border-outline-variant/30 group transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl transition-all duration-300 group-hover:scale-110">storefront</span>
            </div>
            <h2 className="font-headline-md text-xl text-primary mb-2">Merchant Hub</h2>
            <p className="text-on-surface-variant text-xs mb-8 flex-grow leading-relaxed">Scale your enterprise. Access advanced analytics, unified fulfillment networks, and institutional-grade selling tools.</p>
            <button onClick={() => navigate("/seller/login")} className="w-full bg-primary text-on-primary font-semibold py-3 px-4 rounded-full flex items-center justify-center hover:opacity-90 transition-all">
              <span>Get Started</span>
            </button>
          </div>

          {/* Card 3: Customer Portal */}
          <div className="bg-surface-container-lowest p-8 rounded-xl flex flex-col items-start h-full border border-outline-variant/30 group transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl transition-all duration-300 group-hover:scale-110">shopping_bag</span>
            </div>
            <h2 className="font-headline-md text-xl text-primary mb-2">Customer Portal</h2>
            <p className="text-on-surface-variant text-xs mb-8 flex-grow leading-relaxed">Premium Commerce. Experience a curated shopping journey with intelligent discovery and secure global settlement.</p>
            <button onClick={() => navigate("/customer/login")} className="w-full bg-primary text-on-primary font-semibold py-3 px-4 rounded-full flex items-center justify-center hover:opacity-90 transition-all">
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </main>

      {/* System Status Footer */}
      <footer className="w-full flex justify-center py-2">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-surface-container-low rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Global Status: Operational</span>
        </div>
      </footer>
    </div>
  );
}
