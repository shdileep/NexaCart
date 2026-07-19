import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { getProducts, getCurrentUser, logout, addToCart } from '../../utils/auth';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  const currentUser = getCurrentUser();

  React.useEffect(() => {
    // 1. Session verification & block check
    if (currentUser && currentUser.isBlocked) {
      alert('Access denied: Your account has been permanently blocked by the admin.');
      logout();
      navigate('/customer/login');
      return;
    }

    // 2. Fetch approved products
    async function loadProducts() {
      const allProds = await getProducts();
      const approvedProds = allProds.filter(p => p.status === 'approved');
      setProducts(approvedProds);
    }
    loadProducts();
  }, [currentUser?.id]);

  React.useEffect(() => {
    if (products.length > 0) {
      // 3. Intersection observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
  }, [products]);

  // Product images fallback map based on category or keyword
  const getProductImage = (title, category) => {
    if (title.toLowerCase().includes('watch') || title.toLowerCase().includes('chronos')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7gRr7OdzPV3z83yJsrXRtDKrpz6JeQBD8qwHxVpCXuZNecEQkvV-_l5ka4yc3sXeKz14n6ca07ikvv1T3N9Sl9hezV52uUEv-2PNxFK8adNCSmYHS0FOm-JyPq8aR1REU5ol0yb88BbFzP53WlfkG-3mdQ28XSOxYc8AriaqfnxEX1dKOcY5hA-jIR2BUf0EgVkhs2xa-93wrNz2BjwWTyAhi0hd7D8WSL0tAZXdeCGKTjWoV9XMmabXCWaPzowIY97AfxMmwXXc';
    }
    if (title.toLowerCase().includes('audio') || title.toLowerCase().includes('earbuds') || title.toLowerCase().includes('headphone')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJLEdugLzTFKGPe8etQ4RUTvE7ZXX32p1u0KZX0ADq3tSz-ClYWrF8oz5u-K-If-vzExKQx2bqqkl7QiYbnXya1FjHUk3-UpNa000_3yFd-1eJ4DTsRfEIwjgnR0vplW-e6_ahBqAWiBv4X_4qi_dPj5aqpVTDqZLxBGTjQGJ3d7ku21aScShZxtUdonoWz9XeYcNOoie9A1LGPnO__92RK7vfDCm_cQLr5b7mKUg2wl3duAOcNhCaQRk_BoHQTNPnebzT4_mRnaU';
    }
    if (title.toLowerCase().includes('bag') || title.toLowerCase().includes('leather')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYRsBD9iXUmGMkxuRKbaLdaxUadkgNLc3dTkSND2kHGB-4nOb8FG4kvrqkiadhbl6-JRmyWocNEGhdqCum6dTNewnlGi0l1v3pQj9Peu3J9mAQ7Zx1CMgKfp1sdzHHAwOs38d6vyJG0ZBaQJnJUPNBVPuFnwIiCOi5t4l41xf_Ip9WG8vVnAFo0Gvx3QhoasFu5LI25H1xeFg8CQyILnGq2ufvzvl8CGvWSHLf6LTPKVo0BkFgTzq4uHBnlRMQy-hodp8gOhcxyLc';
    }
    if (title.toLowerCase().includes('coffee') || title.toLowerCase().includes('brew')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpNOT4lP02AZ2lp_rF1O640VgwfEWYjbmsofMCohPhItcWgjzP0AdeOqobqyDEYz5dh6yLP688dFS2YsyX6uWZZB7AWuXFOMO_rJdQpCa0BX663pzBGyAx6P8Gapi7mnBDZ_QQEHUS_u8WO89ceoHiX7RPhK3QiR4GwJ-STlQx5emniAexMIqT-o16c-9dOvjk3E1pgxmK9rnU1disF2-jv5NafoqB7-g4YS2eI7HNycMPPeRwAqfls_DUA4fXc7fwgma6GaDI3A4';
    }
    // Default fallback based on category
    if (category.toLowerCase() === 'electronics') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7gRr7OdzPV3z83yJsrXRtDKrpz6JeQBD8qwHxVpCXuZNecEQkvV-_l5ka4yc3sXeKz14n6ca07ikvv1T3N9Sl9hezV52uUEv-2PNxFK8adNCSmYHS0FOm-JyPq8aR1REU5ol0yb88BbFzP53WlfkG-3mdQ28XSOxYc8AriaqfnxEX1dKOcY5hA-jIR2BUf0EgVkhs2xa-93wrNz2BjwWTyAhi0hd7D8WSL0tAZXdeCGKTjWoV9XMmabXCWaPzowIY97AfxMmwXXc';
    }
    if (category.toLowerCase() === 'home goods') {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpNOT4lP02AZ2lp_rF1O640VgwfEWYjbmsofMCohPhItcWgjzP0AdeOqobqyDEYz5dh6yLP688dFS2YsyX6uWZZB7AWuXFOMO_rJdQpCa0BX663pzBGyAx6P8Gapi7mnBDZ_QQEHUS_u8WO89ceoHiX7RPhK3QiR4GwJ-STlQx5emniAexMIqT-o16c-9dOvjk3E1pgxmK9rnU1disF2-jv5NafoqB7-g4YS2eI7HNycMPPeRwAqfls_DUA4fXc7fwgma6GaDI3A4';
    }
    // Beauty
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNBAHD5Y4JthSrEFIz6Jnl-XbP3Ko_Cb08QYslQ6jKJRi5qxy-39sD7ZzP_e9tnQfg43VNGuCyuV52aKP-9GLK0tugi1VGZzhc9auGo8cn0BkrW-y7_qrLa-Y-scbCT946k--kPMF2ah_DAu1w5aSikV8bX4AxBipt0QkJA1gPiZhi5pRLlUNKTl43obMLj0uXIovHmZnF-Cwk3fUfUQeCcHc7a6OxdPTnvD5Y8oMeXG8Wt47yHLpe89nJgSnqGHhXslzEUMRJGCs';
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-on-surface">
      <CustomerHeader />

      <main className="mt-[80px] flex-grow">
        {/* Category Bar */}
        <div className="bg-surface-container-lowest border-b border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-margin-desktop overflow-x-auto no-scrollbar py-4">
            <div className="flex items-center gap-12 whitespace-nowrap">
              {['Electronics', 'Home Goods', 'Beauty'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => navigate(`/customer/categories?c=${encodeURIComponent(cat)}`)}
                  className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary relative group cursor-pointer"
                >
                  {cat}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary-fixed scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Slider */}
        <section className="relative h-[480px] w-full overflow-hidden text-left">
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLuHJG9R-65sDgoz5wN_O5DwH-cACCSGwwmf06Vrpl0zcv-bJCP2P-7B4-6XHrLm-xvPRHHwpL_Am9kkT9No_vlmjPPys-HZfxVKh9cf0F7glQTkZUB-XdeiEnSfBjwlyNrjYtNkkDfLt5WLJyv811M0haw7vlDW7vCtzF_FcbXUxmlWG_n4uczgCNCpiccoaG7SzBcO1juIaKJY6Zwdb2qrKJVFPm5IhvDuYFn7cDiANuSKh9lFvUSRGQs')` }}
            >
              <div className="absolute inset-0 hero-gradient"></div>
              <div className="relative h-full flex flex-col justify-center px-margin-desktop max-w-[1440px] mx-auto text-white">
                <span className="font-label-sm text-label-sm uppercase tracking-widest mb-4 animate-pulse">Exclusive Indian Marketplace</span>
                <h1 className="font-display-lg text-display-lg max-w-2xl mb-6">NexaCart Premium<br /><span className="text-secondary-fixed">Indian Rupees Enabled</span></h1>
                <p className="font-body-lg text-body-lg max-w-xl mb-10 opacity-90">Experience secure payments and direct merchant fulfillment with catalog prices in ₹.</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => navigate('/customer/search')} 
                    className="rounded-full px-10 py-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-t border-slate-700 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    Browse Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Approved Products Catalog */}
        <section className="py-16 max-w-[1440px] mx-auto px-margin-desktop text-left">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-headline-md text-headline-md mb-2">Curated Selections</h2>
              <p className="text-on-surface-variant">Explore approved inventory from verified sellers in India.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter pb-8">
            {products.map((prod) => (
              <div key={prod.id} className="group fade-up border border-outline-variant bg-white p-4 rounded-xl flex flex-col justify-between">
                <div className="relative overflow-hidden bg-white rounded-lg mb-4 cursor-pointer" onClick={() => navigate('/customer/product/' + prod.id)}>
                  <div className="h-64 overflow-hidden rounded-lg">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      src={prod.image || (prod.images && prod.images[0]) || getProductImage(prod.title, prod.category)}
                      alt={prod.title}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pointer-events-none group-hover:pointer-events-auto">
                    <button 
                      onClick={async (e) => {
                        e.stopPropagation();
                        await addToCart(prod.id, 1);
                        navigate('/customer/cart');
                      }}
                      className="w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
                    >
                      Buy Now / Add to Cart
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 onClick={() => navigate('/customer/product/' + prod.id)} className="font-body-md text-primary font-bold truncate cursor-pointer hover:underline">{prod.title}</h3>
                  </div>
                  <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium">
                    <span>{prod.storeName || prod.store_name || 'Lumina Tech Systems'}</span>
                    {prod.rating && (
                      <span className="flex items-center gap-0.5 text-primary bg-surface-container px-1 py-0.5 rounded text-[10px]">
                        {prod.rating} ★
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-label-sm tracking-wider">{prod.category}</p>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-headline-md text-primary font-bold">₹{parseFloat(prod.price).toLocaleString()}</span>
                    {prod.discount > 0 && (
                      <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">{prod.discount}% OFF</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="col-span-4 text-center py-12 text-on-surface-variant text-sm">No approved products available in store right now.</p>
            )}
          </div>
        </section>
      </main>

      <CustomerFooter />
    </div>
  );
}
