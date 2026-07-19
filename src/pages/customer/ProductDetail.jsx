import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';

export default function ProductDetail() {
  const navigate = useNavigate();
  const [activeThumb, setActiveThumb] = React.useState(0);

  const images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBRynoIzMv4xTcEKS2RUotxuZBJmouCZ912Qp21aGhJiFTgMGIls9YpOOeriHB0vjUAtTB62Q6MsthsJXkt5_fFbUwJfpKF1FQo3nFaPxk9S7Tu9Y48JbG9oC6TX1_KbsQY5TeEGvVqK9541ZmSE4JErMHPREofmiu5tC5FBc6KcNONKXvXyWspgzgm7wnfvor7z4WemZ983QYh45hQWkxiiNn2RtO6CLFDer_EFWj7Adp3XAgGsX4oWqHlvuQgUa5hkpF8yRyqps8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB4fwQ5ioKzGUs_Q4uqffiAfOvRxbK3v3lM88rYbI8aWPskLRP7K8p0Vr3An5JJmvGz2yCmINYfLt0wnb2Q5PueRCJQNuBedZtKUhUdglA5gc-4G8qxmBYcYzRiDlmbc0H8MHIjHIc4ub28BUjqExN6MJvs1K-dFGzC2mySKsmND3nk-1sy-bBZHSpKBgfVHGDJd1i9o7ANrK6wRHvkgI6q8w8laxYtZKFDQm_F5__jWf4YezLrKh0OrV81D90Kav2S3FEPP4fgnjk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBNVtzl_xDYrai0gfwgK71s7zXWJHz6AyZC3LX9wfUKX08hUbNzTNc7ewCy3QJt2fj4XKart9Kx0JYQ83G2eZrWnHk40OxO8F7fSwsdQ9cbXsHmhgBKiNIyYiVdnzj39MSeFsiRZ4aYScY01sYIaCn8WsALEPxmM30g6HT18vrWCV6wfq3ZvbyVwzkACbwExAAU9__JMAbLHvG3mwJQZtSCslgLActu8olWSftnbCLsd2XjPqAAWFhQcqddONCROKnR1QLSyKaUlPc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA_usF0q9z8kXi-16hnkJRQOJ-eo8RaNMRY-Gd_T7ZDyZB-fw1wpPWf8QNu1zQdYZZKUXnOblMgqcSAchdyUIoN99ScrcNc2LnugkjhJqyPvbGbR3MQakQuNm2-iny4SWI_h9SrlPvmk1M7c6LEX_1bjvWmORHCwd6AkzXTRSq5Pt5UnXJRn51Bl297ZpTxMaZyxHEOhxtqLAwHBntfsIAsup4uKWxqPMjfsFYIROqf3CgveFijXE1X3xUk3ybO1j1888uYrCBVbhw'
  ];

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="mt-[80px] pt-8 max-w-[1440px] mx-auto px-margin-desktop pb-20 flex-grow">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
          <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary cursor-pointer">Home</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button onClick={() => navigate('/customer/categories')} className="hover:text-primary cursor-pointer">Fashion</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface">Track Pants</span>
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
                alt="NexaWear Premium Track Pants Main View" 
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button onClick={() => navigate('/customer/wishlist')} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-primary">favorite</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-primary">share</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right Section: Details */}
          <section className="lg:w-[55%] flex flex-col gap-6">
            <div>
              <h1 className="font-display-lg text-4xl font-bold tracking-tight text-primary leading-tight mb-2">NexaWear Premium Track Pants</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-primary text-white px-2 py-0.5 rounded text-label-sm font-label-sm">
                  <span>4.3</span>
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="text-on-surface-variant font-body-md">15,404 Ratings &amp; 2,130 Reviews</span>
              </div>

              <div className="flex items-end gap-3 mb-1">
                <span className="text-[32px] font-bold text-primary">₹450</span>
                <span className="text-on-surface-variant line-through text-body-lg mb-1">₹1,999</span>
                <span className="text-green-600 font-bold text-body-lg mb-1">77% OFF</span>
              </div>
              <p className="text-label-sm font-label-sm text-on-surface-variant">Inclusive of all taxes</p>
            </div>

            {/* Offers Box */}
            <div className="p-4 border border-outline-variant rounded-lg bg-surface-container-low">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary">local_offer</span>
                <span className="font-bold text-primary">Available Offers</span>
              </div>
              <ul className="space-y-2">
                <li className="flex gap-2 text-body-md">
                  <span className="text-green-600 font-bold">Bank Offer</span>
                  <span className="text-on-surface">10% off on ICICI Bank Credit Cards, up to ₹1,000.</span>
                </li>
                <li className="flex gap-2 text-body-md">
                  <span className="text-green-600 font-bold">No Cost EMI</span>
                  <span className="text-on-surface">Starting from ₹150/month on select cards.</span>
                </li>
              </ul>
            </div>

            {/* Delivery Section */}
            <div className="flex flex-col gap-4 py-4 border-y border-outline-variant">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                  <span className="font-bold">Deliver to</span>
                </div>
                <button className="text-primary font-bold hover:underline cursor-pointer">Change</button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-headline-md font-bold">110001</span>
                <span className="text-on-surface-variant border-l border-outline-variant pl-4">Delivery by <span class="text-on-surface font-bold">Friday, Oct 25</span></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/customer/cart')}
                className="h-14 rounded-lg bg-[#FF9F00] text-white font-bold text-body-lg flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                ADD TO CART
              </button>
              <button 
                onClick={() => navigate('/customer/cart')}
                className="h-14 rounded-lg bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white font-bold text-body-lg flex items-center justify-center gap-2 shadow-sm hover:-translate-y-1 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">bolt</span>
                BUY NOW
              </button>
            </div>

            {/* Seller Info */}
            <div className="flex items-center justify-between p-4 bg-surface-container border border-outline-variant rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container">A</div>
                <div>
                  <p className="font-bold text-primary">AnviGroup</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">4.8 ★ Seller Score</p>
                </div>
              </div>
              <button className="text-primary font-bold text-label-sm font-label-sm cursor-pointer hover:underline">View Store</button>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-between py-2 text-primary">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="material-symbols-outlined">replay</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">10 Day Return</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="material-symbols-outlined">payments</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">COD Available</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="material-symbols-outlined">verified</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant">Nexa Assured</span>
              </div>
            </div>
          </section>
        </div>

        {/* Product Details Accordions */}
        <section className="mt-16 border-t border-outline-variant pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline-md text-headline-md mb-6 text-primary">Product Highlights</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                  <p className="text-on-surface"><span className="font-bold">Fabric:</span> Premium Lycra blend for 4-way stretch and moisture-wicking capability.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                  <p className="text-on-surface"><span className="font-bold">Fit:</span> Slim-tapered modern fit with articulated knees for maximum mobility.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                  <p className="text-on-surface"><span className="font-bold">Pockets:</span> Two deep side-zipped pockets and one hidden secure pocket.</p>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="border-b border-outline-variant pb-4">
                <button className="flex items-center justify-between w-full font-bold text-body-lg text-primary cursor-pointer">
                  Specifications
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
                <div className="mt-4 grid grid-cols-2 gap-y-3 text-body-md">
                  <span className="text-on-surface-variant">Ideal For</span><span className="font-medium text-on-surface">Men</span>
                  <span className="text-on-surface-variant">Occasion</span><span className="font-medium text-on-surface">Sports, Casual</span>
                  <span className="text-on-surface-variant">Pattern</span><span className="font-medium text-on-surface">Solid</span>
                  <span className="text-on-surface-variant">Closure</span><span className="font-medium text-on-surface">Drawstring</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Futuristic Promo Banner */}
        <section className="mt-20 rounded-2xl overflow-hidden relative h-64 bg-primary flex items-center px-12">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLu7m3yIUSXhDa6XNlsZsBMnOUF7VvrphbuATCUw0FF4gZRixrHwUt6ghwX5grUvFh56qeb9HTQ_LserASpn7jXsgxbdanIQhl9cZUj-DbrMCn7lkcZplaj2Rl91rxyyGrrj7dD9pzzxc8RUiqaS5z-WkssCZqLvYm2Z1HCgEO8Q47qQsuMXujbPH4J9hSd0b4cPQEibd40_xB9pBN5hXv9rK9AbtPM5YxcLJNr2UkzbZCYsLiOjGYsbzos')` }}
          ></div>
          <div className="relative z-10 max-w-xl text-white">
            <h3 className="font-display-lg text-headline-md mb-4">Discover Your Next Favorite</h3>
            <p className="font-body-lg opacity-90">Our AI-powered engine analyzes your style to curate the perfect wardrobe. Experience NexaCart discovery.</p>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-20">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="font-headline-md text-headline-md mb-6 text-primary">Ratings &amp; Reviews</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[56px] font-bold text-primary">4.3</span>
                <div>
                  <div className="flex text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>star_half</span>
                  </div>
                  <p className="text-on-surface-variant">15.4k Global Ratings</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <div className="p-6 border border-outline-variant rounded-lg glass-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">5 ★</span>
                  <span className="font-bold text-primary">Excellent Fabric Quality</span>
                </div>
                <p className="text-on-surface-variant mb-4">The material is incredibly soft yet durable. I've washed it twice and no pilling or fading. Great for gym and casual wear alike.</p>
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>Rahul Sharma, Certified Buyer • 2 days ago</span>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 hover:text-primary"><span className="material-symbols-outlined text-[16px]">thumb_up</span> 142</button>
                    <button className="flex items-center gap-1 hover:text-primary"><span className="material-symbols-outlined text-[16px]">thumb_down</span> 4</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CustomerFooter />
    </div>
  );
}
