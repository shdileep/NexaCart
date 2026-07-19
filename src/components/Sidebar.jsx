import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
    { name: 'Customers', icon: 'group', path: '/admin/customers' },
    { name: 'Sellers', icon: 'storefront', path: '/admin/sellers' },
    { name: 'Products', icon: 'inventory_2', path: '/admin/products' },
    { name: 'Orders', icon: 'shopping_cart', path: '/admin/orders' },
    { name: 'Profile', icon: 'account_circle', path: '/admin/profile' },
    { name: 'Settings', icon: 'settings', path: '/admin/settings' },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-8 px-4 justify-between">
      <div className="space-y-6">
        <div className="mb-6 px-4">
          <h2 className="font-headline-md text-headline-md font-bold text-primary">NexaCart Admin</h2>
          <p className="text-on-surface-variant text-sm">Enterprise Suite</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = path === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-secondary-container text-on-secondary-container font-semibold' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="pt-6 border-t border-outline-variant">
        <div className="bg-surface-container rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface font-bold uppercase tracking-wider">System Status</p>
            <p className="text-xs text-secondary">All systems operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
