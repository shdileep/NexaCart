import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { getWishlist, removeFromWishlist, addToCart } from '../../utils/auth';

export default function MyWishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const loadWishlist = async () => {
    const items = await getWishlist();
    // Mapped items
    const mapped = items.map(w => ({
      id: w.product_id,
      category: w.category,
      title: w.title,
      reviews: 124,
      stars: 4.5,
      price: w.price,
      image: w.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    }));
    setWishlistItems(mapped);
  };

  React.useEffect(() => {
    setLoading(true);
    loadWishlist().then(() => setLoading(false));
  }, []);

  const removeItem = async (id) => {
    const ok = await removeFromWishlist(id);
    if (ok) {
      await loadWishlist();
    }
  };

  const handleAddToCart = async (id) => {
    const ok = await addToCart(id, 1);
    if (ok) {
      await removeFromWishlist(id);
      alert('Product moved to cart!');
      navigate('/customer/cart');
    }
  };

  const addAllToCart = async () => {
    for (const item of wishlistItems) {
      await addToCart(item.id, 1);
      await removeFromWishlist(item.id);
    }
    alert('All items moved to cart!');
    navigate('/customer/cart');
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg font-bold text-primary animate-pulse">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto flex-grow w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-on-surface-variant mb-6 font-label-sm text-label-sm uppercase tracking-widest text-left">
          <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-bold">Wishlist</span>
        </nav>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 text-left">
          <div>
            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-on-surface mb-2">My Wishlist</h1>
            <p className="text-secondary font-body-md">You have {wishlistItems.length} items saved for later.</p>
          </div>
          {wishlistItems.length > 0 && (
            <button 
              onClick={addAllToCart}
              className="signature-button text-white font-body-md px-8 py-3 rounded-full hover:opacity-90 transition-all flex items-center gap-2 w-fit cursor-pointer shadow-lg bg-gradient-to-b from-[#1e293b] to-[#0f172a]"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              Add All to Cart
            </button>
          )}
        </div>

        {/* Wishlist Container */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white border border-outline-variant p-12 text-center rounded-lg">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">favorite_border</span>
            <h2 className="text-xl font-bold mb-2">Your Wishlist is empty</h2>
            <p className="text-secondary mb-6">Browse and save items you like for later!</p>
            <button 
              onClick={() => navigate('/customer/dashboard')}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="space-y-gutter text-left">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-outline-variant p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-primary transition-all duration-300 rounded-lg animate-fadeIn"
              >
                <div className="w-full md:w-48 h-48 flex-shrink-0 bg-surface-container rounded overflow-hidden cursor-pointer" onClick={() => navigate('/customer/product/' + item.id)}>
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={item.image} 
                    alt={item.title} 
                  />
                </div>
                <div className="flex-grow flex flex-col gap-2 w-full">
                  <div className="flex justify-between items-start w-full">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">{item.category}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 font-label-sm text-label-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      REMOVE
                    </button>
                  </div>
                  <h3 onClick={() => navigate('/customer/product/' + item.id)} className="font-headline-md text-xl font-bold text-primary cursor-pointer hover:underline">{item.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-[#fbbf24]">
                      {Array.from({ length: 5 }).map((_, sIdx) => {
                        const starVal = sIdx + 1;
                        const isFilled = starVal <= Math.floor(item.stars);
                        return (
                          <span key={sIdx} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}>
                            star
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-secondary font-label-sm text-label-sm">({item.reviews} Reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-primary font-headline-md text-lg font-bold">₹{parseFloat(item.price).toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
                  <button 
                    onClick={() => handleAddToCart(item.id)}
                    className="signature-button text-white font-body-md px-10 py-3 rounded-full hover:opacity-90 transition-all text-center cursor-pointer bg-gradient-to-b from-[#1e293b] to-[#0f172a]"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => navigate('/customer/product/' + item.id)}
                    className="bg-white border border-outline-variant text-on-surface font-body-md px-10 py-3 rounded-lg hover:bg-surface-container transition-all text-center cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <CustomerFooter />
    </div>
  );
}
