import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, addProduct, getCurrentUser } from '../../utils/auth';

export default function SellerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);

  // Add Product Form States
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('Electronics');
  const [customCategory, setCustomCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [discount, setDiscount] = React.useState('0'); // 0%, 5%, 10%, 15%, etc.
  const [stock, setStock] = React.useState('');
  const [returnPolicy, setReturnPolicy] = React.useState('7 Days Return');
  const [cod, setCod] = React.useState('Yes');
  const [deliveryLocation, setDeliveryLocation] = React.useState('');
  
  // Optional Fields
  const [highlights, setHighlights] = React.useState('');
  const [specifications, setSpecifications] = React.useState('');
  const [materialCare, setMaterialCare] = React.useState('');
  const [warranty, setWarranty] = React.useState('');

  // Images state (array of Base64 strings)
  const [images, setImages] = React.useState([]);

  const currentSeller = getCurrentUser() || { name: 'John Doe', role: 'seller', businessName: 'Lumina Tech Systems' };
  const fileInputRef = React.useRef(null);

  const loadData = () => {
    if (!currentSeller?.id) return;
    const allProds = getProducts();
    // Filter products uploaded by this seller, excluding deleted ones
    const sellerProds = allProds.filter(p => p.sellerId === currentSeller.id && p.status !== 'deleted');
    setProducts(sellerProds);
  };

  React.useEffect(() => {
    loadData();
  }, [currentSeller?.id]);

  const handleCardClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const slotsAvailable = 4 - images.length;
    const filesToUpload = files.slice(0, slotsAvailable);
    
    filesToUpload.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result].slice(0, 4));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !stock || !deliveryLocation) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    if (images.length === 0) {
      alert("At least one product image is mandatory.");
      return;
    }

    const finalCategory = category === 'Other' ? customCategory : category;
    if (category === 'Other' && !customCategory) {
      alert("Please enter a custom category name.");
      return;
    }

    const originalPrice = parseFloat(price);
    const discountPct = parseInt(discount);
    const finalPrice = originalPrice * (1 - discountPct / 100);

    const productPayload = {
      title,
      category: finalCategory,
      price: finalPrice,
      originalPrice,
      discount: discountPct,
      stock: parseInt(stock),
      description,
      images,
      image: images[0], // primary display image
      returnPolicy,
      cod,
      deliveryLocation,
      highlights,
      specifications,
      materialCare,
      warranty,
      storeName: currentSeller.businessName || currentSeller.name,
      sellerId: currentSeller.id,
      sellerName: currentSeller.name,
      sellerEmail: currentSeller.email
    };

    addProduct(productPayload);

    // Reset fields
    setTitle('');
    setCategory('Electronics');
    setCustomCategory('');
    setDescription('');
    setPrice('');
    setDiscount('0');
    setStock('');
    setReturnPolicy('7 Days Return');
    setCod('Yes');
    setDeliveryLocation('');
    setHighlights('');
    setSpecifications('');
    setMaterialCare('');
    setWarranty('');
    setImages([]);
    setShowAddModal(false);
    loadData();
  };

  const numericPrice = parseFloat(price) || 0;
  const numericDiscount = parseInt(discount) || 0;
  const calculatedDiscountedPrice = numericPrice * (1 - numericDiscount / 100);

  return (
    <>
      <SellerSidebar active="products" />
      <SellerHeader />

      <main className="ml-[260px] pt-[100px] px-gutter pb-12">
        <div className="p-8 max-w-container-max mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-primary">Product Catalog</h2>
              <p className="text-on-surface-variant mt-1">Manage your enterprise inventory and stock health across NexaCart.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Add Product
              </button>
            </div>
          </div>

          <div className="bg-white border border-outline-variant rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-wider">Approval Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-on-surface uppercase tracking-wider">Sales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {products.map((prod) => {
                    const isOutOfStock = prod.stock === 0;
                    return (
                      <tr key={prod.id} className="hover:bg-surface-container-lowest transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded border border-outline-variant bg-surface-container flex items-center justify-center overflow-hidden">
                              {prod.image ? (
                                <img src={prod.image} className="w-full h-full object-cover" alt={prod.title} />
                              ) : (
                                <span className="font-bold text-xs text-primary">{prod.title.charAt(0)}</span>
                              )}
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="font-semibold text-primary">{prod.title}</span>
                              <span className="text-xs font-label-sm text-on-surface-variant">Store: {prod.storeName || 'My Store'} • SKU: {prod.sku}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <span className="px-2.5 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-secondary-container">{prod.category}</span>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-primary">{prod.stock}</span>
                            <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${Math.min(100, (prod.stock / 150) * 100)}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-primary text-left">₹{prod.price.toLocaleString()}</td>
                        <td className="px-6 py-4 text-left">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              prod.status === 'approved' ? 'bg-green-500' :
                              prod.status === 'deleted' ? 'bg-red-500' : 'bg-amber-500'
                            }`}></span>
                            <span className={`text-sm font-medium uppercase ${
                              prod.status === 'approved' ? 'text-green-600' :
                              prod.status === 'deleted' ? 'text-red-600' : 'text-amber-600'
                            }`}>
                              {prod.status === 'approved' ? 'Approved' : (prod.status === 'deleted' ? 'Rejected' : 'Pending Approval')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant text-left">{prod.sales || 0} units</td>
                      </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-on-surface-variant">No products found. Add products to display.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING MODAL: ADD PRODUCT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <form 
            onSubmit={handleAddProductSubmit} 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col text-left"
          >
            <button 
              type="button" 
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-2 rounded-full cursor-pointer transition-colors"
            >
              close
            </button>
            
            <h3 className="font-headline-md text-2xl font-bold text-primary mb-6 border-b pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[28px]">add_box</span>
              Add New Product
            </h3>
            
            <div className="space-y-6 flex-grow">
              {/* SECTION 1: Brand & Basic Information */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs text-primary uppercase tracking-wider border-l-4 border-primary pl-2 mb-3">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Store Name / Brand Name</label>
                    <input 
                      type="text" 
                      value={currentSeller.businessName || currentSeller.name}
                      disabled
                      className="w-full px-4 py-2.5 border border-outline-variant bg-surface-container-low text-on-surface-variant rounded-lg text-sm cursor-not-allowed font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Product Title *</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Chronos Premium Watch" 
                      required
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Category *</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Beauty Products">Beauty Products</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Appliances">Appliances</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Sports">Sports</option>
                      <option value="Books">Books</option>
                      <option value="Toys">Toys</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {category === 'Other' && (
                    <div>
                      <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Enter Category Name *</label>
                      <input 
                        type="text" 
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="e.g. Health & Wellness" 
                        required
                        className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Product Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the product in detail..." 
                    rows="3"
                    className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                  />
                </div>
              </div>

              {/* SECTION 2: Image Upload Section */}
              <div>
                <h4 className="font-bold text-xs text-primary uppercase tracking-wider border-l-4 border-primary pl-2 mb-3">Product Media (Max 4, Min 1) *</h4>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageChange} 
                  className="hidden" 
                />

                <div className="grid grid-cols-4 gap-4">
                  {[0, 1, 2, 3].map((idx) => {
                    const imgUrl = images[idx];
                    return (
                      <div 
                        key={idx} 
                        className="aspect-square border-2 border-dashed border-outline-variant rounded-xl flex items-center justify-center relative overflow-hidden bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer group"
                        onClick={!imgUrl ? handleCardClick : undefined}
                      >
                        {imgUrl ? (
                          <>
                            <img src={imgUrl} className="w-full h-full object-cover" alt={`Upload ${idx}`} />
                            <button 
                              type="button" 
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1 right-1 bg-black/75 hover:bg-error text-white w-6 h-6 rounded-full flex items-center justify-center transition-colors shadow"
                            >
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[28px] font-bold">add</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2">At least one image is mandatory. Choose PNG, JPG or WebP images.</p>
              </div>

              {/* SECTION 3: Pricing & Stock */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs text-primary uppercase tracking-wider border-l-4 border-primary pl-2 mb-3">Pricing & Inventory</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Original Price (₹) *</label>
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 10000" 
                      required
                      min="1"
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Discount Percentage</label>
                    <select 
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
                    >
                      <option value="0">No Discount (0%)</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                      <option value="25">25%</option>
                      <option value="30">30%</option>
                      <option value="40">40%</option>
                      <option value="50">50%</option>
                      <option value="60">60%</option>
                      <option value="70">70%</option>
                      <option value="80">80%</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Calculated Price (₹)</label>
                    <div className="w-full px-4 py-2.5 border border-outline-variant bg-surface-container-low text-primary font-bold rounded-lg text-sm flex items-center justify-between">
                      <span>₹{calculatedDiscountedPrice.toLocaleString()}</span>
                      {numericDiscount > 0 && <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold uppercase">Saved {numericDiscount}%</span>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Stock Level / Quantity *</label>
                    <input 
                      type="number" 
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="e.g. 50" 
                      required
                      min="0"
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Cash on Delivery (COD) *</label>
                    <select 
                      value={cod}
                      onChange={(e) => setCod(e.target.value)}
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
                    >
                      <option value="Yes">Yes, Available</option>
                      <option value="No">No, Pre-paid Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 4: Shipping & Policy */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs text-primary uppercase tracking-wider border-l-4 border-primary pl-2 mb-3">Shipping & Returns</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Return Policy *</label>
                    <select 
                      value={returnPolicy}
                      onChange={(e) => setReturnPolicy(e.target.value)}
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium"
                    >
                      <option value="No Return">No Return</option>
                      <option value="1 Day Return">1 Day Return</option>
                      <option value="3 Days Return">3 Days Return</option>
                      <option value="7 Days Return">7 Days Return</option>
                      <option value="10 Days Return">10 Days Return</option>
                      <option value="15 Days Return">15 Days Return</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Delivery Dispatch Location *</label>
                    <input 
                      type="text" 
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="e.g. Bangalore Warehouse" 
                      required
                      className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: Optional Details */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs text-primary uppercase tracking-wider border-l-4 border-primary pl-2 mb-3">Specifications & Highlights (Optional)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Product Highlights (Comma separated)</label>
                    <textarea 
                      value={highlights}
                      onChange={(e) => setHighlights(e.target.value)}
                      placeholder="e.g. Premium Lycra blend, Sweat-wicking, Articulated knees"
                      rows="2"
                      className="w-full px-4 py-2 border border-outline-variant rounded-lg text-xs bg-white focus:border-primary outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Technical Specifications (Key: Value - Comma separated)</label>
                    <textarea 
                      value={specifications}
                      onChange={(e) => setSpecifications(e.target.value)}
                      placeholder="e.g. Ideal For: Men, Occasion: Sports, Fabric: Lycra"
                      rows="2"
                      className="w-full px-4 py-2 border border-outline-variant rounded-lg text-xs bg-white focus:border-primary outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Material & Care Instructions</label>
                    <textarea 
                      value={materialCare}
                      onChange={(e) => setMaterialCare(e.target.value)}
                      placeholder="e.g. Machine wash cold, tumble dry low..."
                      rows="2"
                      className="w-full px-4 py-2 border border-outline-variant rounded-lg text-xs bg-white focus:border-primary outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Warranty Details</label>
                    <textarea 
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      placeholder="e.g. 1 Year manufacturer warranty on defects..."
                      rows="2"
                      className="w-full px-4 py-2 border border-outline-variant rounded-lg text-xs bg-white focus:border-primary outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t pt-4">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 border border-outline rounded-lg text-sm font-semibold hover:bg-surface-container-low cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 cursor-pointer shadow transition-all"
              >
                Submit for Approval
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
