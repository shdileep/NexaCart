import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser, getNotifications, markNotificationsAsRead } from '../utils/auth';

export default function SellerHeader() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  const currentSeller = getCurrentUser() || { id: 0 };

  const loadNotifications = () => {
    if (currentSeller?.id) {
      setNotifications(getNotifications(currentSeller.id));
    }
  };

  React.useEffect(() => {
    loadNotifications();
    // Poll notifications every 5 seconds for real-time updates
    const timer = setInterval(loadNotifications, 5000);
    return () => clearInterval(timer);
  }, [currentSeller?.id]);

  const handleToggleNotifications = () => {
    if (!showNotifications && currentSeller?.id) {
      markNotificationsAsRead(currentSeller.id);
      loadNotifications();
    }
    setShowNotifications(!showNotifications);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/portal');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-[80px] fixed top-0 right-0 left-[260px] bg-surface-container-lowest border-b border-outline-variant shadow-sm flex justify-between items-center px-gutter z-40">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-on-surface focus:ring-0 focus:border-primary transition-all" 
            placeholder="Search orders, products, or analytics..." 
            type="text" 
          />
        </div>
      </div>

      {/* Right-aligned Navigation Controls */}
      <div className="flex items-center gap-6 relative">
        {/* 1. Notification Bell */}
        <div className="relative">
          <button 
            onClick={handleToggleNotifications}
            className="relative text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer p-1 rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[26px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-outline-variant rounded-xl shadow-xl py-3 z-50 animate-fade-in text-left max-h-[400px] overflow-y-auto">
              <div className="px-4 pb-2 border-b border-outline-variant flex justify-between items-center">
                <span className="font-bold text-primary text-sm">Notifications</span>
                <span className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-bold uppercase">Realtime</span>
              </div>
              <div className="divide-y divide-outline-variant/30">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-on-surface-variant text-xs">
                    <span className="material-symbols-outlined text-3xl opacity-30 mb-1 block">notifications_off</span>
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 hover:bg-surface-container-low transition-colors flex gap-3 items-start ${!notif.read ? 'bg-primary-container/5' : ''}`}>
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">info</span>
                      <div className="flex-1">
                        <p className="text-xs text-primary font-medium leading-relaxed">{notif.message}</p>
                        <p className="text-[9px] text-on-surface-variant mt-1">
                          {new Date(notif.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-error shrink-0 mt-2"></span>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. Profile Icon with Dropdown */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowDropdown(!showDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center justify-center text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer p-0.5 rounded-full hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[28px]">account_circle</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-outline-variant rounded-lg shadow-lg py-2 z-50 animate-fade-in">
              <button 
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/seller/profile');
                }}
                className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                View Profile
              </button>
              <button 
                onClick={() => {
                  setShowDropdown(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-outline-variant"></div>

        {/* 3. Close/Exit Icon (navigates back to /portal or /) */}
        <button 
          onClick={() => navigate('/portal')}
          className="flex items-center justify-center text-on-surface-variant hover:text-error transition-all duration-200 cursor-pointer p-1.5 rounded-full hover:bg-surface-container"
          title="Exit to Portal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </header>
  );
}
