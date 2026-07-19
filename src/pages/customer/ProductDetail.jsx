import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { getProductById, addToCart, addToWishlist, getReviews, addOrUpdateReview } from '../../utils/auth';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [activeThumb, setActiveThumb] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  const [userRating, setUserRating] = React.useState(5);
  const [reviewText, setReviewText] = React.useState('');

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      const prod = await getProductById(productId);
      setProduct(prod);
      
      const allReviews = await getReviews();
      const prodReviews = allReviews.filter(r => r.productId === productId);
      setReviews(prodReviews);
      
      setLoading(false);
    }
    loadData();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (product.stock <= 0) {
      alert("Product is currently out of stock.");
      return;
    }
    const ok = await addToCart(product.id, 1);
    if (ok) {
      alert("Product added to cart!");
      navigate('/customer/cart');
    } else {
      alert("Failed to add product to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    const ok = await addToWishlist(product.id);
    if (ok) {
      alert("Added to wishlist!");
      navigate('/customer/wishlist');
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg font-bold text-primary animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold text-primary">Product Not Found</h2>
        <button onClick={() => navigate('/customer/dashboard')} className="px-6 py-2 bg-primary text-white rounded-full">Go Back Home</button>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'];
  const ratingValue = product.rating || '4.2';

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="mt-[80px] pt-8 max-w-[1440px] mx-auto px-margin-desktop pb-20 flex-grow">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant text-left">
          <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary cursor-pointer">Home</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button onClick={() => navigate(`/customer/categories?c=${encodeURIComponent(product.category)}`)} className="hover:text-primary cursor-pointer">{product.category}</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface truncate max-w-xs">{product.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Left Section: Gallery */}
          <section className="lg:w-[45%] flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 order-1">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveThumb(idx)}
                  className={`w-16 h-20 bg-surface-container border rounded cursor-pointer overflow-hidden transition-all ${activeThumb === idx ? 'border-primary ring-1 ring-primary' : 'border-outline-variant hover:border-outline'}`}
                >
                  <img className="w-full h-full object-cover" src={img} alt={`Product Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 order-2 aspect-[4/5] bg-surface-container rounded-lg border border-outline-variant overflow-hidden">
              <img 
                className="w-full h-full object-cover transition-opacity duration-300" 
                src={images[activeThumb]} 
                alt={product.title} 
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button onClick={handleAddToWishlist} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-primary">favorite</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right Section: Details */}
          <section className="lg:w-[55%] flex flex-col gap-6 text-left">
            <div>
              <h1 className="font-display-lg text-4xl font-bold tracking-tight text-primary leading-tight mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-primary text-white px-2 py-0.5 rounded text-label-sm font-label-sm">
                  <span>{ratingValue}</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="text-on-surface-variant font-body-md">{reviews.length + 15} Ratings &amp; {reviews.length + 2} Reviews</span>
              </div>

              <div className="flex items-end gap-3 mb-1">
                <span className="text-[32px] font-bold text-primary">₹{parseFloat(product.price).toLocaleString()}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-on-surface-variant line-through text-body-lg mb-1">₹{parseFloat(product.original_price || product.price).toLocaleString()}</span>
                    <span className="text-green-600 font-bold text-body-lg mb-1">{product.discount}% OFF</span>
                  </>
                )}
              </div>
              <p className="text-label-sm font-label-sm text-on-surface-variant">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-bold text-primary">Product Description</h3>
              <p className="text-on-surface-variant text-sm whitespace-pre-line leading-relaxed">{product.description || 'No description provided.'}</p>
            </div>

            {/* Delivery Section */}
            <div className="flex flex-col gap-4 py-4 border-y border-outline-variant">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                  <span className="font-bold">Deliver to</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-headline-md font-bold">110001</span>
                <span className="text-on-surface-variant border-l border-outline-variant pl-4">Delivery Service: <span className="text-on-surface font-bold">{product.delivery_location || 'Pan-India Express'}</span></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`h-14 rounded-lg text-white font-bold text-body-lg flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1 transition-all cursor-pointer ${product.stock <= 0 ? 'bg-outline-variant cursor-not-allowed' : 'bg-[#FF9F00]'}`}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {product.stock <= 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
              </button>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`h-14 rounded-lg text-white font-bold text-body-lg flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1 transition-all cursor-pointer ${product.stock <= 0 ? 'bg-outline-variant cursor-not-allowed' : 'bg-gradient-to-r from-[#1e293b] to-[#0f172a]'}`}
              >
                <span className="material-symbols-outlined">bolt</span>
                BUY NOW
              </button>
            </div>

            {/* Seller Info */}
            <div className="flex items-center justify-between p-4 bg-surface-container border border-outline-variant rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container">
                  {(product.store_name || product.storeName || 'Lumina Tech Systems').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-primary">{product.store_name || product.storeName || 'Lumina Tech Systems'}</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">{product.seller_email || 'seller@nexacart.com'}</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-between py-2 text-primary border-t border-outline-variant pt-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="material-symbols-outlined">replay</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">{product.return_policy || '7 Days Return'}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="material-symbols-outlined">payments</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">COD: {product.cod || 'Yes'}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="material-symbols-outlined">verified</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">Stock: {product.stock} left</span>
              </div>
            </div>
          </section>
        </div>

        {/* Product Details Accordions */}
        <section className="mt-16 border-t border-outline-variant pt-12 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline-md text-headline-md mb-6 text-primary">Product Highlights</h2>
              <ul className="space-y-4">
                {(product.highlights || 'Premium Design\nHigh reliability\nSuperior comfort').split('\n').map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                    <p className="text-on-surface">{highlight}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="border-b border-outline-variant pb-4">
                <button className="flex items-center justify-between w-full font-bold text-body-lg text-primary cursor-pointer">
                  Specifications
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
                <div className="mt-4 grid grid-cols-2 gap-y-3 text-body-md">
                  <span className="text-on-surface-variant">Category</span><span className="font-medium text-on-surface">{product.category}</span>
                  <span className="text-on-surface-variant">Warranty</span><span className="font-medium text-on-surface">{product.warranty || '1 Year Brand Warranty'}</span>
                  <span className="text-on-surface-variant">Material Care</span><span className="font-medium text-on-surface">{product.material_care || 'Regular Care'}</span>
                  {(product.specifications || '').split('\n').map((spec, idx) => {
                    const parts = spec.split(':');
                    if (parts.length < 2) return null;
                    return (
                      <React.Fragment key={idx}>
                        <span className="text-on-surface-variant">{parts[0].trim()}</span>
                        <span className="font-medium text-on-surface">{parts[1].trim()}</span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-20 text-left border-t border-outline-variant pt-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="font-headline-md text-headline-md mb-6 text-primary">Ratings &amp; Reviews</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[56px] font-bold text-primary">{ratingValue}</span>
                <div>
                  <div className="flex text-primary">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${s <= Math.floor(parseFloat(ratingValue)) ? '1' : '0'}` }}>star</span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant">{reviews.length + 15} Global Ratings</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              {reviews.map((r, idx) => (
                <div key={idx} className="p-6 border border-outline-variant rounded-lg glass-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">{r.rating} ★</span>
                    <span className="font-bold text-primary">Certified Buyer Review</span>
                  </div>
                  <p className="text-on-surface-variant mb-4">{r.review_text || r.details || 'Great product, highly recommend!'}</p>
                  <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                    <span>{r.customerName || 'NexaCart User'}, Certified Buyer • {r.date || 'Just now'}</span>
                  </div>
                </div>
              ))}
              
              <div className="p-6 border border-outline-variant rounded-lg bg-surface-container-low">
                <h3 className="font-bold text-primary mb-2">Excellent Quality Assured</h3>
                <p className="text-on-surface-variant text-sm">The material is crafted with premium ingredients and tested for longevity. Nexa Assured verified.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CustomerFooter />
    </div>
  );
}
