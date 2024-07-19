import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';

export default function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const currentUser = getCurrentUser();
  const adminName = currentUser ? currentUser.name : 'System Admin';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm flex justify-between items-center px-margin-desktop h-16">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <img alt="NexaCart Logo" className="w-8 h-8 object-contain" src="/src/nexa.png" />
        <span className="font-headline-md text-headline-md font-bold text-primary">NexaCart</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full">
          notifications
        </button>
        <button 
          className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full"
          onClick={() => navigate('/admin/settings')}
        >
          settings
        </button>
        <div className="relative">
          <div 
            className="flex items-center gap-3 pl-4 border-l border-outline-variant cursor-pointer hover:opacity-85 transition-opacity select-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="font-body-md text-on-surface font-semibold hidden md:inline">{adminName}</span>
            <img 
              className="w-8 h-8 rounded-full border border-outline-variant object-cover" 
              alt="Admin Profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHELdnI9ihW_9gE8kBTbmtZxSXoGAykdi2EFSWkdyJjx5tyzjcgjC0iTcNMU-rUiwvb2-KdxPoWh5Hc_r01qEtgFXR34Xjl9OP_JD_9gS8yc0rdepYn6PNa1TRK9aH4vYl-uN5_uQ8VWXa0t07PqfDvbltRaYu-htJccBM4hXLGoDqq-LSvunpPI-yb1MgIoLxRqdyM9hTX9In8wNTkTU07EqF1Ytnp_d-_XLz56see2ND_7ML6z6j6ICpIWH8XhN6oJc6ymoVW4k"
            />
          </div>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-outline-variant shadow-lg py-1 z-50">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-container/10 flex items-center gap-2 font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
