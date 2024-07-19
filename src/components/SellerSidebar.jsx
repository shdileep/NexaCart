import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

export default function SellerSidebar({ active }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser() || { name: 'John Doe', role: 'seller' };

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-8 px-4 z-50">
      <div className="mb-10 px-4">
        <div className="w-10 h-10 mb-2 overflow-hidden rounded-lg group cursor-pointer" onClick={() => navigate('/')}>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLeLwSmnFrAGCTvCXC4rrRYu5MA59WKVJgXTgafHo7cIak7hfjjhP9Vdl7AJV2rHeHX0xsbIb2z2Fd-CEw-JdmmG8q2wPKWqFjZaigFExOcN54oWSXzHvrKFcC1Hyy-TAGuvdEMpQwaP8VDfsn7GvOodZActziE7Sae8qGM3x9mIm3hXuLiBnY3c7WSpo6Pj5GBBwLLcL3oV5LV8ZTqECZHF6JKznMnsrxkHPez22oRuZF08UMsM0lh6YqLmO9fO2_77RdfqVpsvo" 
            alt="NexaCart Logo" 
            className="w-full h-full object-cover transition-all duration-300 grayscale group-hover:grayscale-0" 
          />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-primary">NexaCart</h1>
        <p className="font-label-sm text-label-sm text-on-secondary-container mt-1">Enterprise Seller</p>
      </div>
      
      <nav className="flex-1 space-y-1 custom-scrollbar overflow-y-auto">
        <Link 
          to="/seller/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'dashboard' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'dashboard' ? {"fontVariationSettings": "'FILL' 1"} : {}}>dashboard</span>
          <span className="font-body-md">Dashboard</span>
        </Link>
        
        <Link 
          to="/seller/products" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'products' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'products' ? {"fontVariationSettings": "'FILL' 1"} : {}}>inventory_2</span>
          <span className="font-body-md">Products</span>
        </Link>
        
        <Link 
          to="/seller/customers" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'customers' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'customers' ? {"fontVariationSettings": "'FILL' 1"} : {}}>group</span>
          <span className="font-body-md">Customers</span>
        </Link>
        
        <Link 
          to="/seller/processing-orders" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'orders' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'orders' ? {"fontVariationSettings": "'FILL' 1"} : {}}>shopping_cart</span>
          <span className="font-body-md">Orders</span>
        </Link>
        
        <Link 
          to="/seller/coupons" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'coupons' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'coupons' ? {"fontVariationSettings": "'FILL' 1"} : {}}>local_offer</span>
          <span className="font-body-md">Coupons</span>
        </Link>
        
        <Link 
          to="/seller/analytics" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'analytics' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'analytics' ? {"fontVariationSettings": "'FILL' 1"} : {}}>analytics</span>
          <span className="font-body-md">Analytics</span>
        </Link>
        
        <Link 
          to="/seller/finance" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'finance' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'finance' ? {"fontVariationSettings": "'FILL' 1"} : {}}>payments</span>
          <span className="font-body-md">Finance</span>
        </Link>

        <Link 
          to="/seller/profile" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'profile' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'profile' ? {"fontVariationSettings": "'FILL' 1"} : {}}>account_circle</span>
          <span className="font-body-md">Profile</span>
        </Link>
        
        <Link 
          to="/seller/settings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
            active === 'settings' 
              ? 'text-primary font-semibold sidebar-active bg-surface-container' 
              : 'text-on-secondary-container hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined" style={active === 'settings' ? {"fontVariationSettings": "'FILL' 1"} : {}}>settings</span>
          <span className="font-body-md">Settings</span>
        </Link>
      </nav>
      
      <div className="mt-auto pt-4 border-t border-outline-variant flex items-center gap-3 px-4">
        <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
          <img 
            className="w-full h-full object-cover" 
            alt="Seller avatar" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9zcWcBEPP7Or_3WaAcD3qZOAB4vxYn5BkbHK3ieoahvh2wnutGK7RZUO4APThnw5sAd4V7MFJKLBp1aPahCfeoB_qgtK8CCR3Iy1pHed9d7JGpzxQomaFADWAdYdcgyZT0VmyjYR55iDpLgkd0kPM1tAerBOkmW_AO1QzXOKDymc9GP9dyGJIfueXFmqQgJWArBuJnMz6y0POcVA7VwsScXTdRZu1W0fzvM-qltZzT7GCi4Jq3b-4Cnor3yvIA9BiaSo9mkgD1JQ" 
          />
        </div>
        <div className="flex flex-col">
          <span className="font-body-md font-semibold text-on-surface">{currentUser.name}</span>
          <span className="font-label-sm text-label-sm text-on-secondary-container">Store Owner</span>
        </div>
      </div>
    </aside>
  );
}
