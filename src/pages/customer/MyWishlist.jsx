import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';

export default function MyWishlist() {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = React.useState([
    {
      id: 'backpack',
      category: 'Premium Gear',
      title: 'Architect Series Pro Backpack',
      reviews: 124,
      stars: 4.5,
      price: '₹8,499',
      oldPrice: '₹12,000',
      discount: '30% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUetL6lsOlXAEw_H78EceViJK8NN9ekxrAuKxOllRSmWIkmP6OjwIfKoI-2IfoY_WU-PFWaRRSoaP3tUKmb6_nVu15bFL9VfYxjP86_w5TCAJMFleACE_3AbJicP7U7o0YANaFxKMWb_Pkm3SwrxefxIIhKULLAvhv4OPrnEUZTI4zCXAjKGs-ZDE7svuqVC9YO3jfV9d0XC3MDBJ5DZxtLfUtEwazUGs09QFYzM2g_fHa2JxZLmlns2Pf90ggr-sokjTyAGu1qUM'
    },
    {
      id: 'headphones',
      category: 'Electronics',
      title: 'NexaFlow Wireless ANC Headphones',
      reviews: 892,
      stars: 5.0,
      price: '₹24,999',
      oldPrice: '₹32,000',
      discount: '22% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEJNSqeQ2EUDXlGhQ9O56r4zQKM2s8toVqybE8xGHSCwaU9ZoBp0O97amJ1hmfABrF5i05weiDDzI6ttSOtD6mLaClG6kqqwZL7lPyqsJZSxW-8S8IP0kmjqJw7CCGzRBOujhGTMs0WVwbNnqNZKkf-7h1ic-DlCXEuQmY37LuBwvMuCVoxy7zhO18PZ3r45b7zdO09yDWeUE7L-nW4DYhcgSe1cbaltyRPwVUNOsoh2CTInT4ESKT27f61KxqeD7AaumzWlOsaeI'
    },
    {
      id: 'watch',
      category: 'Accessories',
      title: 'Vanguard Precision Chronograph',
      reviews: 56,
      stars: 4.0,
      price: '₹18,500',
      oldPrice: '₹24,000',
      discount: '23% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaQ3Z-4_TkKOWRDThlAwOm0XjHe3ukVc6UvGAiHGH7QsXx0keSTCxy1uRSRzW1dVG8c-4rFRJcCn_WqiTw6zz0rK-qB0RruAg0tzjfkiNni27k1h3sDc1oyYB68hRLlyDldlhGecgvZeW65mCql4aXv_Scj_pWBkMoRkWy1Y7N2AS46bQ7gZTPQBcAq2BdYG_cgetmtXixZNDFb9uwUn5lxLC-gsIXPBPDXO7QsltXGIh-d6Fh6_bB2tJEpJIwX9e4fCk5MLAkojM'
    },
    {
      id: 'blazer',
      category: 'Fashion',
      title: 'Executive Wool Blend Blazer',
      reviews: 210,
      stars: 5.0,
      price: '₹12,999',
      oldPrice: '₹15,000',
      discount: '13% OFF',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUDn2QMxhyLrb1MughQMKnIk1aIf4CPLHcmHdyjBwy_wjqIH8c7BZlShsAqEUElzachC2U66nagm_cyXhYX46o1_KVHZ6ty4rQnPs1utJnECtTsnW8X7Mhsess-lRmBPGXgTsPtZYGz0CQ_s1svlybuavgp1oZ6R82fm0zycpwXR0L3u5u4GdfaEqf11B6erEmdq5tbn1-YSSTGN5P_YJTnVBiFTwcYwi0n-RtUONcnFgL-Kf53Kng188rbj1T0gbP_91X5j3at48'
    }
  ]);

  const recommendedItems = [
    {
      id: 'mouse',
      category: 'Office Tech',
      title: 'ErgoStream Wireless Mouse',
      price: '₹4,499',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO_ReRqxMQa9SCMBjM6pXNxpvAYgpTRsMArRBuVLbdHt3aWwBPhcP12h7XeguYK-89B3FZHkzvRBC73YZKgpl-A0ovpehVC8RRUtxte6LoPO-v8kFbRIEwHm3mgiF4PGRAz_r-qC14oyze9k6xKJexaAobPIv8uozV9jcGWYZdyij7C2nKSlFSIZjCNSe5JxZVSEBswaP4SF7lAkcUV28lqNAM8d2RxY3ewyWzgkqbIXLA_usRu1B2zrwynvWRt75kr2AS37Lw1zg'
    },
    {
      id: 'portfolio',
      category: 'Organization',
      title: "Director's Leather Portfolio",
      price: '₹6,200',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzjdTt21XQG0b1BR5pVnXGWfO-9Ql2iAvut5nN8BETVxMBn9drUJfMmkqWcqI5X02XtzKvaRODHTm2D3LixoYHHvCF6COFwcv6I9C30eVc3PGcnAcAorYLC33Nu8mbabpd81Vm-AXAScG_ARayXPI5PiUfMobtMS7f8KlAFGhHWn2g1uTjPgpVnvdYyrcWH2T8q2d9EK5DB22QD3sUpLhL6Z6iC75x3GPYgRJgETMLUdPqTlx3adSEaoxsBkulq9mdZdIehmOj68I'
    },
    {
      id: 'smart-mug',
      category: 'Smart Living',
      title: 'ThermalCore Smart Mug',
      price: '₹3,850',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXM1Uq0uDPUXn44DTy3LhBWyfIsh-dsp5sgbLCdz96Ey07sTIWkjaYaVotiRS33dujFUurNLf5PBJHkmOQhUdWpn5nVT2WHWC1o2k6jVuRL1OEORp-iEc2gPuiYPCRJorCHDopa0pGTRmlSFRmVc1Xl_Bf9qTmmBHoheo8l6EdH3uO2GEapu1SjoJjAoCCZyt-MW7dzG30Y40pdwTr7KthE2Bee2VFgmq5KCxlxbEWCn3G6r91a60NfBd8KZGhSaIy3Hjdvvh1J_k'
    },
    {
      id: 'diffuser',
      category: 'Wellness',
      title: 'AuraMist Glass Diffuser',
      price: '₹5,900',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjk-1-8Sa1GyuDpP4HxWr46jrXjVH-wczNIBEoOTKjer56KYM930rGDW-YAeYIeI2iEN6U0gghxyjG4J4NnGMzn46pAyDxjixjmCRwrfSFimOR9OKBC94k_Nw3uQc0ytzCpGe59w7_nAzn1wBimkJasQLarNgmrsotyINRg7MMQxn2voJ15XX0uY8F5WtXMxrDfHnRBJ7QQ5WARSqFKtkriPAEUbOAHJGTwZ89_NsePvFBzyE-4Hrk-FO_j1Gp5e5ziv2Bptp-zCg'
    }
  ];

  const removeItem = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addAllToCart = () => {
    navigate('/customer/cart');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto flex-grow w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-on-surface-variant mb-6 font-label-sm text-label-sm uppercase tracking-widest">
          <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-bold">Wishlist</span>
        </nav>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
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
          <div className="space-y-gutter">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-outline-variant p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-primary transition-all duration-300 rounded-lg"
              >
                <div className="w-full md:w-48 h-48 flex-shrink-0 bg-surface-container rounded overflow-hidden">
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
                  <h3 className="font-headline-md text-xl font-bold text-primary">{item.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-[#fbbf24]">
                      {Array.from({ length: 5 }).map((_, sIdx) => {
                        const starVal = sIdx + 1;
                        const isHalf = item.stars - starVal === -0.5;
                        const isFilled = starVal <= item.stars && !isHalf;
                        return (
                          <span key={sIdx} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}>
                            {isFilled ? 'star' : isHalf ? 'star_half' : 'star'}
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-secondary font-label-sm text-label-sm">({item.reviews} Reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-primary font-headline-md text-lg font-bold">{item.price}</span>
                    <span className="text-on-surface-variant line-through font-body-md text-body-md">{item.oldPrice}</span>
                    <span className="text-primary font-bold font-label-sm text-label-sm bg-primary-fixed px-2 py-0.5 rounded">
                      {item.discount}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
                  <button 
                    onClick={() => {
                      removeItem(item.id);
                      navigate('/customer/cart');
                    }}
                    className="signature-button text-white font-body-md px-10 py-3 rounded-full hover:opacity-90 transition-all text-center cursor-pointer bg-gradient-to-b from-[#1e293b] to-[#0f172a]"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => navigate('/customer/product/c99be0db92924971aaa7432b2fcf28e4')}
                    className="bg-white border border-outline-variant text-on-surface font-body-md px-10 py-3 rounded-lg hover:bg-surface-container transition-all text-center cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination/Navigation */}
        {wishlistItems.length > 0 && (
          <div className="mt-16 flex items-center justify-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-surface-container transition-all cursor-pointer text-primary">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-lg font-label-sm text-label-sm cursor-pointer">1</button>
            <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-surface-container transition-all font-label-sm text-label-sm text-primary cursor-pointer">2</button>
            <button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-surface-container transition-all cursor-pointer text-primary">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </main>

      {/* Recommendation Section */}
      <section className="bg-surface-container-low py-20 px-margin-mobile md:px-margin-desktop border-t border-outline-variant w-full">
        <div className="max-w-[1440px] mx-auto w-full">
          <h2 className="font-headline-md text-2xl font-bold mb-8 text-primary">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {recommendedItems.map((prod, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/customer/product/c99be0db92924971aaa7432b2fcf28e4')}
                className="bg-white border border-outline-variant p-4 group cursor-pointer rounded-lg hover:shadow-md transition-all"
              >
                <div className="h-64 bg-surface-container mb-4 overflow-hidden rounded">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    src={prod.image}
                    alt={prod.title}
                  />
                </div>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1">{prod.category}</p>
                <h4 className="font-body-md text-body-md text-primary font-semibold mb-2 group-hover:underline">{prod.title}</h4>
                <span className="font-headline-md text-lg font-bold text-primary">{prod.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CustomerFooter />
    </div>
  );
}
