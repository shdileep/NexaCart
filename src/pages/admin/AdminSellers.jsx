import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getProducts, approveProduct, deleteProduct, getAdminUsersList, updateUserBlockStatus } from '../../utils/auth';

export default function AdminSellers() {
  const [sellers, setSellers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [selectedSeller, setSelectedSeller] = React.useState(null);
  const [activeModal, setActiveModal] = React.useState(null); // 'viewProducts', 'editSeller'
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');

  const loadData = async () => {
    const allUsers = await getAdminUsersList();
    const sellerList = allUsers.filter(u => u.role === 'seller');
    setSellers(sellerList);
    const prods = await getProducts();
    setProducts(prods);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleBlockSeller = async (sellerId, currentBlocked) => {
    const ok = await updateUserBlockStatus(sellerId, !currentBlocked);
    if (ok) {
      loadData();
    }
  };

  const handleApproveProduct = async (productId) => {
    await approveProduct(productId);
    await loadData();
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    await loadData();
  };

  // Filtered sellers
  const filteredSellers = sellers.filter(seller => {
    const isVerified = !!seller.phone;
    const computedStatus = seller.isBlocked ? 'Blocked' : (isVerified ? 'Verified' : 'Pending');

    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seller.businessName && seller.businessName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === '' || (seller.category && seller.category.toLowerCase() === categoryFilter.toLowerCase());
    const matchesStatus = statusFilter === '' || computedStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-8">
          {/* Breadcrumbs / Page Title */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav className="flex text-label-sm text-on-surface-variant mb-2">
                <span className="">User Management</span>
                <span className="mx-2">/</span>
                <span className="text-primary font-bold">Sellers</span>
              </nav>
              <h2 className="font-display-lg text-display-lg text-primary">Marketplace Sellers</h2>
            </div>
          </div>

          {/* Toolbar / Filters */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant mb-6 flex flex-wrap items-center gap-4 shadow-sm">
            <div className="relative flex-grow max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg focus:ring-0 focus:border-primary text-body-md" 
                placeholder="Search by name, business or email..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <select 
                className="px-4 py-2 border border-outline-variant rounded-lg bg-white text-body-md focus:ring-0 focus:border-primary min-w-[160px]"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Category: All</option>
                <option value="electronics">Electronics</option>
                <option value="home goods">Home Goods</option>
                <option value="beauty">Beauty</option>
              </select>
              <select 
                className="px-4 py-2 border border-outline-variant rounded-lg bg-white text-body-md focus:ring-0 focus:border-primary min-w-[160px]"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Status: All</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Sellers Data Table */}
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">Business Entity</th>
                    <th className="px-6 py-4 font-bold">Owner Details</th>
                    <th className="px-6 py-4 font-bold">Inventory</th>
                    <th className="px-6 py-4 font-bold">Revenue</th>
                    <th className="px-6 py-4 font-bold">Verification</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {filteredSellers.map((seller) => {
                    const sellerProds = products.filter(p => p.seller_id === seller.id);
                    const totalUnits = sellerProds.reduce((sum, p) => sum + p.stock, 0);
                    // Revenue generated by this seller's products (price * sales)
                    const totalRevenue = sellerProds.reduce((sum, p) => sum + (parseFloat(p.price) * p.sales), 0);
                    const isVerified = !!seller.phone;
                    const computedStatus = seller.isBlocked ? 'Blocked' : (isVerified ? 'Verified' : 'Pending');

                    return (
                      <tr key={seller.id} className="hover:bg-surface-bright transition-colors group">
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-body-md font-bold text-primary">{seller.businessName || `${seller.name} Co.`}</p>
                            <p className="text-label-sm text-on-surface-variant">{seller.category || 'General Marketplace'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-body-md text-primary">{seller.name}</p>
                          <p className="text-label-sm text-on-surface-variant">{seller.email}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-body-md text-primary">{totalUnits.toLocaleString()} Units</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-label-sm text-primary font-bold">₹{totalRevenue.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-label-sm rounded-full ${
                            computedStatus === 'Verified' ? 'bg-emerald-50 text-emerald-700' :
                            computedStatus === 'Blocked' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              computedStatus === 'Verified' ? 'bg-emerald-500' :
                              computedStatus === 'Blocked' ? 'bg-red-500' : 'bg-amber-500'
                            }`}></span>
                            {computedStatus}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => {
                                setSelectedSeller(seller);
                                setActiveModal('viewProducts');
                              }}
                              className="p-2 hover:bg-primary-fixed rounded-lg transition-colors text-primary cursor-pointer" 
                              title="View Products"
                            >
                              <span className="material-symbols-outlined">visibility</span>
                            </button>
                            <button 
                              onClick={() => handleBlockSeller(seller.id, seller.isBlocked)}
                              className={`p-2 rounded-lg transition-colors cursor-pointer ${seller.isBlocked ? 'text-green-600 hover:bg-green-50' : 'text-error hover:bg-error-container/10'}`} 
                              title={seller.isBlocked ? 'Unblock Seller' : 'Block Seller'}
                            >
                              <span className="material-symbols-outlined">
                                {seller.isBlocked ? 'check_circle' : 'block'}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredSellers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-on-surface-variant">No sellers found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* FLOATING MODAL: VIEW SELLER PRODUCTS */}
      {activeModal === 'viewProducts' && selectedSeller && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <div>
                <h3 className="font-headline-md text-lg font-bold text-primary">Products uploaded by {selectedSeller.name}</h3>
                <p className="text-xs text-on-surface-variant">{selectedSeller.email}</p>
              </div>
              <button onClick={() => setActiveModal(null)} className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container p-1 rounded-full cursor-pointer">
                close
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low font-label-sm text-xs text-secondary uppercase tracking-wider">
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Inventory (Stock)</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Revenue Generated</th>
                    <th className="px-4 py-3">Approval</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {products.filter(p => p.seller_id === selectedSeller.id).map((prod) => {
                    const prodRevenue = parseFloat(prod.price) * prod.sales;
                    return (
                      <tr key={prod.id} className="hover:bg-surface-bright">
                        <td className="px-4 py-3 text-sm font-semibold">{prod.title}</td>
                        <td className="px-4 py-3 text-sm">{prod.category}</td>
                        <td className="px-4 py-3 text-sm font-medium">{prod.stock} Units</td>
                        <td className="px-4 py-3 text-sm font-bold text-primary">₹{parseFloat(prod.price).toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm font-bold text-primary">₹{prodRevenue.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            prod.status === 'approved' ? 'bg-green-50 text-green-700' :
                            prod.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                          }`}>
                            {prod.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1">
                            {prod.status === 'pending' && (
                              <button 
                                onClick={() => handleApproveProduct(prod.id)}
                                className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 cursor-pointer font-semibold"
                              >
                                Accept
                              </button>
                            )}
                            {prod.status !== 'deleted' && (
                              <button 
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-1 hover:bg-red-50 text-error rounded cursor-pointer"
                                title="Delete Product"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {products.filter(p => p.sellerId === selectedSeller.id).length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-on-surface-variant text-sm">No products uploaded by this seller.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
