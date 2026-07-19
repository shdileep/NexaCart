import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';

export default function ProductSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || 'Televisions';

  const [expandedFilters, setExpandedFilters] = React.useState({
    brand: true,
    features: false,
    resolution: false,
    displayTech: false
  });

  const toggleFilter = (filterKey) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const products = [
    {
      id: 'c99be0db92924971aaa7432b2fcf28e4',
      title: 'TCL V4C 80.04 cm (32 inch) QLED HD Ready Smart Google TV with 100% Color Volume Plus, 24W Dolby Audio...',
      rating: 4.1,
      ratingsCount: '11,557 Ratings & 944 Reviews',
      specs: [
        'HD Ready | QLED',
        'Model ID: 32V4C',
        'Launch Year: 2025',
        'Total Sound Output: 24 W',
        '1 Year Product Warranty'
      ],
      price: '₹16,490',
      oldPrice: '₹20,490',
      discount: '19% off',
      sponsored: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqvJk8Hkg0rjLhb7u_qbntwFAmgurDgNCc2KvnzFRx4CQPbgCUffnS_6S9RxurGs7McE-lm57Y4Z4rT0vhXQ4vghmg2ecWDFs-zBI8KvrpYV_G-T9elZ2eO_xcI1gHVQx8wpOExemtEnKuiUmtTavTuD3QyYvE4qjTu9gq-HIM99FxImejyhk3Olz7Ii7QqbYOCpCRMsWIAJ9sIPhrQmtkvkTSWNSlO5yd5GSNoU8AYE5XBqR5LuTSQ5mEsrvfAfS7OhTyKHbSgbo'
    },
    {
      id: 'c99be0db92924971aaa7432b2fcf28e4',
      title: 'Samsung 80 cm (32 inch) HD Ready LED Smart Tizen TV with Voice Assistance Remote Control | 100+ Free C...',
      rating: 4.3,
      ratingsCount: '1,42,234 Ratings & 8,414 Reviews',
      specs: [
        'HD Ready | LED',
        'Model ID: UA32T4500FKXXL',
        'Launch Year: 2025',
        'Total Sound Output: 20 W',
        '2 Year Warranty (1 Year Standard + 1 Year additional on Panel)'
      ],
      price: '₹16,490',
      oldPrice: '₹17,990',
      discount: '7% off',
      bestseller: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0K8IDygJN6PcEl3tEhARQRL4Vk3VxYYK8f2oi37dJakhl5cErwwKSC_mmUBXstG7jqKZvOwYqxGqMKmsBMnYMe50pEGGzTRlgF6Bi8Lb0ulEE6lbNdI866ygxpvUBa8PRGQJlyd0UnePxfrXUuymYO4_qKjcD67PXACRKaW1rRuIs6pP9N4v0Wj2UGoU-Cb6TO6rVA-te0hsG2zwXTwBhIrlO87NoIX7QAqmhaOkpgSz8RjsH-4WRETLGrM1vl9sCVMyYblTgZQM'
    },
    {
      id: 'c99be0db92924971aaa7432b2fcf28e4',
      title: 'TCL T6D 138.71 cm (55 inch) QLED Ultra HD (4K) Smart Google TV 2026 Edition with HDR10+ Dolby Vision-...',
      rating: 4.1,
      ratingsCount: '12,385 Ratings & 907 Reviews',
      specs: [
        'Ultra HD (4K) | QLED',
        'Model ID: 55T6D',
        'Launch Year: 2026',
        'Total Sound Output: 28 W',
        '2 Years warranty on product'
      ],
      price: '₹41,990',
      oldPrice: '₹78,990',
      discount: '45% off',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3BBV8qdL3_VTyHUzY3fWe3AElX8UbxaawVTGC2zxQmS2B8LOdZz-pX-7cq9C2WrdHUaavD0ir9M-2oNpBNAq7XQh4ivqwtU-ZxEqsQ_6-dfPcYMwzjh_T4dOeifqDiPQjLMfhFt9bgNN6MlgSmAQi2CGIZZ6RyVm_D8EqwvyBRVp8cIMBfzwZXDEeeGvFO4rOJgxF8QcJEUm4-gn1TEhuwzxRGe9dU34BrRP1PtK0jNLI8EN7AnbMv8UhvUihpcpvlhludCVC2x4'
    }
  ];

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="max-w-[1440px] mx-auto px-margin-desktop py-6 flex gap-gutter mt-[80px] flex-grow">
        {/* Sidebar Filters */}
        <aside className="w-64 shrink-0 flex flex-col gap-6 sidebar-scroll h-[calc(100vh-120px)] overflow-y-auto sticky top-[104px] pr-2">
          <div className="bg-white border border-outline-variant p-4">
            <h2 className="font-headline-md text-[18px] mb-4 text-primary">Filters</h2>
            
            {/* Category */}
            <div className="mb-6">
              <h3 className="text-label-sm font-label-sm text-secondary uppercase mb-2">Categories</h3>
              <div className="flex flex-col gap-2 pl-2">
                <button 
                  onClick={() => navigate('/customer/categories')} 
                  className="text-body-md text-secondary hover:text-primary flex items-center gap-2 cursor-pointer text-left w-full"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  Home Entertainment
                </button>
                <span className="text-body-md font-bold text-primary pl-6">{searchTerm}</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6 border-t border-surface-container-high pt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-label-sm font-label-sm text-secondary uppercase">Brand</h3>
                <span 
                  onClick={() => toggleFilter('brand')}
                  className="material-symbols-outlined text-outline cursor-pointer select-none"
                >
                  {expandedFilters.brand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                </span>
              </div>
              {expandedFilters.brand && (
                <>
                  <div className="relative mb-3">
                    <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[16px] text-outline">search</span>
                    <input className="w-full text-[13px] border-outline-variant rounded-lg pl-8 py-1 focus:ring-0 focus:border-primary" placeholder="Search Brand" type="text" />
                  </div>
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                    {['SONY', 'Samsung', 'LG', 'TCL', 'Xiaomi', 'Motorola'].map((brand, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                        <input defaultChecked={brand === 'Samsung' || brand === 'TCL'} className="rounded-[2px] border-outline-variant text-primary focus:ring-0" type="checkbox" />
                        <span className="text-body-md text-secondary group-hover:text-primary transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                  <button className="text-primary text-[12px] font-bold mt-2 hover:underline cursor-pointer">59 MORE</button>
                </>
              )}
            </div>

            {/* Price Slider Simulation */}
            <div className="mb-6 border-t border-surface-container-high pt-4">
              <h3 className="text-label-sm font-label-sm text-secondary uppercase mb-3">Price</h3>
              <div className="relative h-1 bg-surface-container-high rounded-full mb-6">
                <div className="absolute left-0 right-1/4 h-1 bg-primary rounded-full"></div>
                <div className="absolute left-0 -top-1.5 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"></div>
                <div className="absolute right-1/4 -top-1.5 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm"></div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="border border-outline-variant p-1 flex-1 text-center text-[12px] text-secondary">Min</div>
                <span className="text-outline text-xs">to</span>
                <div className="border border-outline-variant p-1 flex-1 text-center text-[12px] text-secondary">₹60,000+</div>
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-6 border-t border-surface-container-high pt-4">
              <h3 className="text-label-sm font-label-sm text-secondary uppercase mb-3">Customer Ratings</h3>
              <div className="flex flex-col gap-2">
                {[4, 3].map((rate) => (
                  <label key={rate} className="flex items-center gap-2 cursor-pointer">
                    <input className="rounded-[2px] border-outline-variant text-primary focus:ring-0" type="checkbox" />
                    <span className="text-body-md text-secondary flex items-center">{rate} <span className="material-symbols-outlined text-[14px] ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> &amp; above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Expandable Accordions */}
            <div className="flex flex-col gap-3 border-t border-surface-container-high pt-4 text-primary">
              {['features', 'resolution', 'displayTech'].map((filterKey) => (
                <div key={filterKey} className="border-b border-surface-container-low pb-2">
                  <div 
                    onClick={() => toggleFilter(filterKey)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <span className="text-body-md font-medium capitalize">
                      {filterKey === 'displayTech' ? 'Display Tech' : filterKey}
                    </span>
                    <span className="material-symbols-outlined text-outline">
                      {expandedFilters[filterKey] ? 'keyboard_arrow_up' : 'expand_more'}
                    </span>
                  </div>
                  {expandedFilters[filterKey] && (
                    <div className="pl-2 pt-2 text-xs text-on-surface-variant">
                      Options loading...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-primary text-white rounded-lg">
            <p className="text-label-sm mb-2 opacity-80">Need help choosing?</p>
            <div className="flex items-center justify-between">
              <span className="text-body-md font-bold">TV Buying Guide</span>
              <span className="material-symbols-outlined">menu_book</span>
            </div>
          </div>
        </aside>

        {/* Product Listing Area */}
        <section className="flex-1 bg-white border border-outline-variant">
          <div className="p-4 border-b border-surface-container-high">
            <nav className="flex text-[12px] text-secondary gap-1 mb-2">
              <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary cursor-pointer">Home</button>
              <span>&gt;</span>
              <button onClick={() => navigate('/customer/categories')} className="hover:text-primary cursor-pointer">Home Entertainment</button>
              <span>&gt;</span>
              <span className="text-primary font-medium">{searchTerm}</span>
            </nav>
            
            <div className="flex items-baseline gap-2 mb-4">
              <h1 className="text-headline-md text-primary font-bold">{searchTerm}</h1>
              <span className="text-body-md text-secondary">(Showing 1 – 24 of 1,132 results)</span>
            </div>

            <div className="flex items-center gap-6 text-body-md border-b-2 border-transparent">
              <span className="font-bold text-primary">Sort By</span>
              <button className="text-primary font-bold border-b-2 border-primary pb-2 -mb-[2px] cursor-pointer">Relevance</button>
              <button className="text-secondary hover:text-primary transition-colors pb-2 cursor-pointer">Popularity</button>
              <button className="text-secondary hover:text-primary transition-colors pb-2 cursor-pointer">Price -- Low to High</button>
              <button className="text-secondary hover:text-primary transition-colors pb-2 cursor-pointer">Price -- High to Low</button>
              <button className="text-secondary hover:text-primary transition-colors pb-2 cursor-pointer">Newest First</button>
            </div>
          </div>

          {/* Product Items */}
          <div className="divide-y divide-surface-container-high">
            {products.map((prod, idx) => (
              <article key={idx} className="p-6 flex flex-col md:flex-row gap-8 group hover:bg-surface-container-lowest transition-all">
                {/* Image Area */}
                <div className="w-64 flex flex-col items-center">
                  <div onClick={() => navigate(`/customer/product/${prod.id}`)} className="relative w-full aspect-video overflow-hidden mb-4 cursor-pointer">
                    <img 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      src={prod.image}
                      alt={prod.title}
                    />
                    {prod.sponsored && (
                      <div className="absolute top-2 left-2 bg-on-secondary-fixed text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Sponsored
                      </div>
                    )}
                    {prod.bestseller && (
                      <div className="absolute top-2 left-2 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Bestseller
                      </div>
                    )}
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer mt-2 group/check">
                    <input className="rounded-[2px] border-outline-variant text-primary focus:ring-0" type="checkbox" />
                    <span className="text-body-md text-secondary group-hover/check:text-primary">Add to Compare</span>
                  </label>
                </div>

                {/* Details Area */}
                <div className="flex-grow">
                  <h2 
                    onClick={() => navigate(`/customer/product/${prod.id}`)} 
                    className="text-body-lg font-semibold text-primary mb-2 group-hover:text-primary hover:underline cursor-pointer"
                  >
                    {prod.title}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-600 text-white text-[12px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      {prod.rating} 
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </span>
                    <span className="text-body-md text-secondary">{prod.ratingsCount}</span>
                  </div>
                  <ul className="text-body-md text-on-surface-variant flex flex-col gap-1 list-disc pl-4 marker:text-outline-variant">
                    {prod.specs.map((spec, sIdx) => (
                      <li key={sIdx}>{spec}</li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Area */}
                <div className="w-48 text-right flex flex-col items-end shrink-0">
                  <div className="flex flex-col mb-1">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-headline-md font-bold text-primary">{prod.price}</span>
                      <div className="bg-surface-variant px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-blue-600 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <span className="text-[10px] font-bold text-blue-800">Assured</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-secondary line-through text-[14px]">{prod.oldPrice}</span>
                      <span className="text-green-600 font-bold text-[14px]">{prod.discount}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-green-700 font-bold mb-2">Hot Deal</p>
                  <p className="text-[12px] text-secondary">Upto ₹4,150 Off on Exchange</p>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-surface-container-high flex items-center justify-between">
            <span className="text-body-md text-secondary">Page 1 of 48</span>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-white font-bold bg-primary cursor-pointer">1</button>
              <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-secondary transition-colors cursor-pointer font-medium">2</button>
              <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-secondary transition-colors cursor-pointer font-medium">3</button>
              <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center text-secondary transition-colors cursor-pointer font-medium">4</button>
              <span className="mx-2 text-secondary">...</span>
              <button className="flex items-center gap-1 text-primary font-bold hover:underline ml-4 cursor-pointer">
                NEXT
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <CustomerFooter />
    </div>
  );
}
