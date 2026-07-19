import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { getProducts } from '../../utils/auth';

export default function ProductSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchVal = queryParams.get('q') || '';
  const categoryFilter = queryParams.get('c') || '';

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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

  React.useEffect(() => {
    async function loadSearch() {
      setLoading(true);
      const filters = {
        status: 'approved'
      };
      
      const normalizedQuery = searchVal.trim();
      const standardCategories = ['Electronics', 'Home Goods', 'Beauty', 'Fashion', 'Appliances', 'Furniture', 'Mobiles'];
      const matchedCategory = standardCategories.find(c => c.toLowerCase() === normalizedQuery.toLowerCase());
      
      if (matchedCategory) {
        filters.category = matchedCategory;
      } else if (searchVal) {
        filters.search = searchVal;
      }
      
      if (categoryFilter) {
        filters.category = categoryFilter;
      }

      const prods = await getProducts(filters);
      setProducts(prods);
      setLoading(false);
    }
    loadSearch();
  }, [searchVal, categoryFilter]);

  if (loading) {
    return (
      <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg font-bold text-primary animate-pulse">Searching catalog...</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="mt-[80px] pt-8 max-w-[1440px] mx-auto px-margin-desktop pb-20 flex flex-col lg:flex-row gap-gutter flex-grow">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 flex flex-col gap-6 text-left shrink-0">
          <div className="bg-white border border-outline-variant p-6 rounded-lg">
            <h2 className="text-xl font-bold text-primary mb-6">Filters</h2>

            {/* Category selection display */}
            {categoryFilter && (
              <div className="mb-4 bg-primary/5 p-3 rounded-lg border border-primary/20">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Active Category</span>
                <p className="font-bold text-sm text-primary">{categoryFilter}</p>
              </div>
            )}

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
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {['Lumina Tech', 'Apex Industries', 'Quantum Systems', 'Aura Wear', 'AnviGroup'].map((brand, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                      <input className="rounded-[2px] border-outline-variant text-primary focus:ring-0" type="checkbox" />
                      <span className="text-body-md text-secondary group-hover:text-primary transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Slider Simulation */}
            <div className="mb-6 border-t border-surface-container-high pt-4">
              <h3 className="text-label-sm font-label-sm text-secondary uppercase mb-3">Price</h3>
              <div className="flex items-center justify-between gap-2">
                <div className="border border-outline-variant p-1 flex-1 text-center text-[12px] text-secondary">₹0</div>
                <span className="text-outline text-xs">to</span>
                <div className="border border-outline-variant p-1 flex-1 text-center text-[12px] text-secondary">₹50,000+</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Listing Area */}
        <section className="flex-1 bg-white border border-outline-variant text-left rounded-lg overflow-hidden">
          <div className="p-4 border-b border-surface-container-high">
            <nav className="flex text-[12px] text-secondary gap-1 mb-2">
              <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary cursor-pointer">Home</button>
              <span>&gt;</span>
              <span className="text-primary font-medium">{searchVal || 'All Categories'}</span>
            </nav>
            
            <div className="flex items-baseline gap-2 mb-4">
              <h1 className="text-headline-md text-primary font-bold">{searchVal || 'All Selections'}</h1>
              <span className="text-body-md text-secondary">(Showing {products.length} results)</span>
            </div>
          </div>

          {/* Product Items */}
          <div className="divide-y divide-surface-container-high">
            {products.map((prod) => (
              <article key={prod.id} className="p-6 flex flex-col md:flex-row gap-8 group hover:bg-surface-container-lowest transition-all">
                {/* Image Area */}
                <div className="w-64 flex flex-col items-center shrink-0">
                  <div onClick={() => navigate(`/customer/product/${prod.id}`)} className="relative w-full aspect-square bg-surface-container rounded-lg overflow-hidden mb-4 cursor-pointer">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={prod.image || (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'}
                      alt={prod.title}
                    />
                  </div>
                </div>

                {/* Details Area */}
                <div className="flex-grow">
                  <h2 
                    onClick={() => navigate(`/customer/product/${prod.id}`)} 
                    className="text-body-lg font-semibold text-primary mb-2 group-hover:text-primary hover:underline cursor-pointer"
                  >
                    {prod.title}
                  </h2>
                  <p className="text-xs text-secondary font-semibold mb-2">{prod.store_name || prod.storeName || 'Lumina Tech Systems'}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-green-600 text-white text-[12px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                      {prod.rating || '4.2'} 
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </span>
                    <span className="text-body-md text-secondary">Verified Seller Catalog</span>
                  </div>
                  
                  <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                    {prod.description || 'Premium product designed for enterprise performance.'}
                  </p>
                </div>

                {/* Pricing Area */}
                <div className="w-48 text-right flex flex-col items-end shrink-0">
                  <div className="flex flex-col mb-1">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-headline-md font-bold text-primary">₹{parseFloat(prod.price).toLocaleString()}</span>
                    </div>
                    {prod.discount > 0 && (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-secondary line-through text-[14px]">₹{parseFloat(prod.original_price || prod.price).toLocaleString()}</span>
                        <span className="text-green-600 font-bold text-[14px]">{prod.discount}% OFF</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-green-700 font-bold mb-2">In Stock: {prod.stock}</p>
                </div>
              </article>
            ))}
            {products.length === 0 && (
              <p className="text-center py-12 text-on-surface-variant text-sm">No items found matching your query.</p>
            )}
          </div>
        </section>
      </main>

      <CustomerFooter />
    </div>
  );
}
