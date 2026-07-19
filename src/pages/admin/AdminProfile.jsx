import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getCurrentUser } from '../../utils/auth';

export default function AdminProfile() {
  const currentUser = getCurrentUser() || { name: 'System Admin', email: 'admin@nexacart.com', role: 'admin' };

  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [roleTitle, setRoleTitle] = React.useState('Super Administrator');
  const [securityLevel, setSecurityLevel] = React.useState('Level 5 (Owner)');
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMessage('Admin profile settings updated!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 pt-24 px-margin-desktop pb-12 max-w-[1440px]">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Administrator Profile</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Manage system privileges, credentials, and check console audits.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Identity & Status */}
          <div className="lg:col-span-1 bg-white p-8 rounded-xl border border-outline-variant flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-outline-variant shadow-sm mb-4 bg-slate-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-slate-400">admin_panel_settings</span>
            </div>
            
            <h3 className="font-headline-md text-xl font-bold text-on-surface">{name}</h3>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">{roleTitle}</p>
            
            <div className="w-full border-t border-outline-variant/60 my-6"></div>
            
            <div className="w-full space-y-3 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Security Level:</span>
                <span className="font-semibold text-on-surface">{securityLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">System Status:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span> Active
                </span>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-outline-variant">
            <h4 className="font-headline-md text-xl font-bold text-on-surface mb-6">Security & Account Settings</h4>
            
            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-lg">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="roletitle">Role Title</label>
                  <input 
                    type="text" 
                    id="roletitle" 
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all text-sm" 
                    value={roleTitle} 
                    onChange={(e) => setRoleTitle(e.target.value)} 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant uppercase tracking-wider block" htmlFor="securitylevel">Security Level</label>
                  <select 
                    id="securitylevel" 
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface focus:ring-0 focus:border-primary transition-all text-sm" 
                    value={securityLevel} 
                    onChange={(e) => setSecurityLevel(e.target.value)}
                  >
                    <option value="Level 5 (Owner)">Level 5 (Owner)</option>
                    <option value="Level 4 (Admin)">Level 4 (Admin)</option>
                    <option value="Level 3 (Auditor)">Level 3 (Auditor)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 shadow-md cursor-pointer"
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
