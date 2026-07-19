import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../utils/auth';

export default function CustomerHeader() {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = React.useState('');
  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    async function loadCart() {
      const items = await getCart();
      const count = items.reduce((acc, item) => acc + item.qty, 0);
      setCartCount(count);
    }
    loadCart();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/customer/search?q=${encodeURIComponent(searchVal)}`);
    } else {
      navigate('/customer/search');
    }
  };

  return (
    <header className="fixed top-0 w-full h-[80px] bg-white border-b border-outline-variant z-50">
      <div className="flex justify-between items-center h-full px-margin-desktop max-w-[1440px] mx-auto gap-gutter">
        <div className="flex items-center gap-8">
          <div onClick={() => navigate('/customer/dashboard')} className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcz5Ask9bLyohEW6UHpMdob4taTSvvB2pSpMkTuOKut_6XBGAmSxS9f8qWrxe1ifg9Lxng_S3ZC5nKyXzHrpzTWdpW-0sv0swB1K708sA_hMLOdtILlIh4Ig2X9fFYSYY9G1i3KdYzY_k9_F5mBKVvQ3AyQSMUfxef1R_Vwh4lKTR_ALdte3ZqlGVcS8TnZccqalu9UZBFNzj9FyzDFdyxsYA9k6r0gIq7SV7OUslWvEMzPU7YaFvgvWXIaZT1UumxvQ9GfFb3fPk" 
                alt="NexaCart Logo" 
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <span className="text-headline-md font-headline-md font-bold text-primary">NexaCart</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-xl px-8">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <input 
              type="text" 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search premium items..." 
              className="w-full bg-surface-container-low border-none rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary transition-all outline-none" 
            />
            <button type="submit" className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant hover:text-primary transition-colors">
              search
            </button>
          </form>
        </div>

        <nav className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/customer/dashboard')} 
            className="font-body-md text-on-secondary-container hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/customer/categories')} 
            className="font-body-md text-on-secondary-container hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            Categories
          </button>
          <button 
            onClick={() => navigate('/customer/wishlist')} 
            className="active:scale-95 transition-transform cursor-pointer text-on-secondary-container hover:text-primary"
          >
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <button 
            onClick={() => navigate('/customer/cart')} 
            className="active:scale-95 transition-transform relative cursor-pointer text-on-secondary-container hover:text-primary"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => navigate('/customer/orders')} 
            className="font-body-md text-on-secondary-container hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            Orders
          </button>
          <button 
            className="active:scale-95 transition-transform cursor-pointer text-on-secondary-container hover:text-primary"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button 
            onClick={() => navigate('/customer/profile')} 
            className="active:scale-95 transition-transform cursor-pointer text-on-secondary-container hover:text-primary"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
