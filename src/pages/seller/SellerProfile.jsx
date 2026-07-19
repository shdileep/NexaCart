import React from 'react';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getCurrentUser } from '../../utils/auth';

export default function SellerProfile() {
  const currentUser = getCurrentUser() || { name: 'John Doe', email: 'seller@nexacart.com', role: 'seller' };
  
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [businessName, setBusinessName] = React.useState('Acme Merchant Corp');
  const [phone, setPhone] = React.useState('+91 98765 43210');
  const [bio, setBio] = React.useState('Premier high-end seller on NexaCart, delivering authentic apparel and smart devices globally.');
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <>
      <SellerSidebar active="profile" />
      <SellerHeader />
      
      <main className="ml-[260px] pt-[100px] px-gutter pb-12 bg-background min-h-screen">
        {/* Page Header */}
        <section className="mb-8">
          <h2 className="font-display-lg text-3xl font-bold text-primary">Merchant Profile</h2>
          <p className="font-body-lg text-sm text-secondary mt-1">Manage your public storefront profile and personal credentials.</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 glass-card p-8 rounded-2xl flex flex-col items-center text-center border border-outline-variant bg-surface-container-lowest">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-inner mb-4">
              <img 
                className="w-full h-full object-cover" 
                alt="Seller Avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9zcWcBEPP7Or_3WaAcD3qZOAB4vxYn5BkbHK3ieoahvh2wnutGK7RZUO4APThnw5sAd4V7MFJKLBp1aPahCfeoB_qgtK8CCR3Iy1pHed9d7JGpzxQomaFADWAdYdcgyZT0VmyjYR55iDpLgkd0kPM1tAerBOkmW_AO1QzXOKDymc9GP9dyGJIfueXFmqQgJWArBuJnMz6y0POcVA7VwsScXTdRZu1W0fzvM-qltZzT7GCi4Jq3b-4Cnor3yvIA9BiaSo9mkgD1JQ" 
              />
            </div>
            
            <h3 className="font-headline-md text-xl font-bold text-primary">{name}</h3>
            <p className="text-xs font-semibold text-secondary uppercase tracking-widest mt-1">Store Owner</p>
            <p className="text-sm text-on-surface-variant mt-3 max-w-[240px] italic">"{bio}"</p>
            
            <div className="w-full border-t border-outline-variant/50 my-6"></div>
            
            {/* Store Stats */}
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface rounded-xl border border-outline-variant/30 text-center">
                <p className="text-[10px] font-bold text-secondary uppercase">Rating</p>
                <p className="text-lg font-bold text-primary mt-1">4.8 / 5.0</p>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-outline-variant/30 text-center">
                <p className="text-[10px] font-bold text-secondary uppercase">Tier</p>
                <p className="text-lg font-bold text-primary mt-1">Gold</p>
              </div>
            </div>
          </div>

          {/* Settings / Edit Form */}
          <div className="lg:col-span-2 glass-card p-8 rounded-2xl border border-outline-variant bg-surface-container-lowest">
            <h4 className="font-headline-md text-xl font-bold text-primary mb-6">Store & Owner Details</h4>
            
            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-lg">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="fullname">Full Name</label>
                  <input 
                    type="text" 
                    id="fullname" 
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all text-sm" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="businessname">Business Name</label>
                  <input 
                    type="text" 
                    id="businessname" 
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all text-sm" 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all text-sm" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="phone">Phone Number</label>
                  <input 
                    type="text" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all text-sm" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="bio">Store Bio</label>
                <textarea 
                  id="bio" 
                  rows="3" 
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all text-sm" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                />
              </div>

              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
