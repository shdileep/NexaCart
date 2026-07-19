import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getProducts, approveProduct, deleteProduct } from '../../utils/auth';

export default function AdminProducts() {
  const [products, setProducts] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');

  const loadData = () => {
    setProducts(getProducts());
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleApprove = (productId) => {
    approveProduct(productId);
    loadData();
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    loadData();
  };

  // KPIs
  const totalProductsKPI = 30;
  const outOfStockKPI = 10;
  const avgPriceKPI = 9000;
  const topCategoryKPI = 'Electronics';

  // Filter products
  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === '' || categoryFilter === 'All Categories' || prod.category.toLowerCase() === categoryFilter.toLowerCase();
    
    // Status filter
    // 'pending', 'approved', 'deleted'
    const matchesStatus = statusFilter === '' || statusFilter === 'Stock Status' ||
      (statusFilter === 'In Stock' && prod.stock > 0 && prod.status === 'approved') ||
      (statusFilter === 'Low Stock' && prod.stock > 0 && prod.stock <= 15 && prod.status === 'approved') ||
      (statusFilter === 'Out of Stock' && prod.stock === 0 && prod.status === 'approved') ||
      (statusFilter.toLowerCase() === prod.status.toLowerCase());

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="ml-64 mt-16 p-8 min-h-screen">
        <div className="max-w-container-max mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-display-lg text-display-lg text-primary">Products</h1>
              <p className="text-on-surface-variant font-body-lg">Manage and monitor your enterprise catalog</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="glass-card p-6 rounded-panel flex flex-col justify-between bg-white border border-outline-variant">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-secondary-container rounded-xl text-on-secondary-container">
                  <span className="material-symbols-outlined">inventory</span>
                </div>
                <span className="text-xs font-bold text-success text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant text-sm font-medium">Total Products</p>
                <h3 className="text-3xl font-bold text-primary mt-1">{totalProductsKPI}</h3>
              </div>
            </div>
            <div className="glass-card p-6 rounded-panel flex flex-col justify-between border-l-4 border-l-error bg-white border border-outline-variant">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-error-container rounded-xl text-on-error-container">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <span className="text-xs font-bold text-error bg-error-container px-2 py-1 rounded">Action Needed</span>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant text-sm font-medium">Out of Stock</p>
                <h3 className="text-3xl font-bold text-primary mt-1">{outOfStockKPI}</h3>
              </div>
            </div>
            <div className="glass-card p-6 rounded-panel flex flex-col justify-between bg-white border border-outline-variant">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-tertiary-fixed rounded-xl text-on-tertiary-fixed">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant text-sm font-medium">Average Price</p>
                <h3 className="text-3xl font-bold text-primary mt-1">₹{avgPriceKPI.toLocaleString()}</h3>
              </div>
            </div>
            <div className="glass-card p-6 rounded-panel flex flex-col justify-between bg-white border border-outline-variant">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-on-secondary-fixed-variant rounded-xl text-white">
                  <span className="material-symbols-outlined">stars</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant text-sm font-medium">Top Category</p>
                <h3 className="text-3xl font-bold text-primary mt-1">{topCategoryKPI}</h3>
              </div>
            </div>
          </div>

          {/* Table & Filters Container */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-panel overflow-hidden">
            {/* Toolbar */}
            <div className="p-6 border-b border-outline-variant flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-3 flex-1 min-w-[300px]">
                <div className="relative flex-1 max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
                  <input 
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-primary" 
                    placeholder="Search by name or SKU..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select 
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface focus:ring-primary"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home Goods">Home Goods</option>
                  <option value="Beauty">Beauty</option>
                </select>
                <select 
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-medium text-on-surface focus:ring-primary"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Status Filter: All</option>
                  <option value="approved">Approved / Active</option>
                  <option value="pending">Pending Approval</option>
                  <option value="deleted">Deleted / Rejected</option>
                  <option value="In Stock">Approved & In Stock</option>
                  <option value="Out of Stock">Approved & Out of Stock</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-on-surface-variant">Showing {filteredProducts.length} items</span>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant border-b border-outline-variant">Product</th>
                    <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant border-b border-outline-variant">SKU</th>
                    <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant border-b border-outline-variant">Category</th>
                    <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant border-b border-outline-variant">Stock Level</th>
                    <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant border-b border-outline-variant">Price</th>
                    <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant border-b border-outline-variant">Total Sales</th>
                    <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant border-b border-outline-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  {filteredProducts.map((prod) => {
                    const isOutOfStock = prod.stock === 0;
                    const stockStatus = isOutOfStock ? 'Out of Stock' : (prod.stock <= 15 ? `Low Stock (${prod.stock})` : `In Stock (${prod.stock})`);
                    const dotColor = isOutOfStock ? 'bg-error' : (prod.stock <= 15 ? 'bg-orange-500' : 'bg-green-500');
                    const textClass = isOutOfStock ? 'text-error' : (prod.stock <= 15 ? 'text-orange-700' : 'text-green-700');

                    return (
                      <tr key={prod.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg border border-outline-variant overflow-hidden flex-shrink-0 bg-surface-container">
                              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-primary">
                                {prod.title.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-on-surface">{prod.title}</p>
                              <p className="text-xs text-on-surface-variant font-label-sm">Uploaded on {prod.uploadDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-label-sm text-on-surface-variant">{prod.sku}</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-surface-container text-on-surface-variant text-[11px] font-bold rounded-full uppercase tracking-wider">{prod.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                            <span className={`text-sm font-medium ${textClass}`}>{stockStatus}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary">₹{prod.price.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-medium text-on-surface-variant">{prod.sales} units</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {prod.status === 'pending' && (
                              <button 
                                onClick={() => handleApprove(prod.id)}
                                className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 cursor-pointer shadow-sm transition-all"
                              >
                                Accept
                              </button>
                            )}
                            {prod.status !== 'deleted' && (
                              <button 
                                onClick={() => handleDelete(prod.id)}
                                className="px-3 py-1.5 bg-red-50 text-error rounded text-xs font-semibold hover:bg-red-100 cursor-pointer transition-all border border-red-200"
                                title="Delete/Reject Product"
                              >
                                Delete
                              </button>
                            )}
                            {prod.status === 'deleted' && (
                              <span className="text-xs text-red-500 font-bold uppercase py-1">Deleted</span>
                            )}
                            {prod.status === 'approved' && (
                              <span className="text-xs text-green-600 font-bold uppercase py-1">Active</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-on-surface-variant">No products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination (without First and Last page buttons) */}
            <div className="p-6 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
              <span className="text-sm text-on-surface-variant">Showing {filteredProducts.length} items</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg hover:bg-surface-container-high text-on-surface-variant font-bold flex items-center justify-center border border-outline-variant bg-white disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold flex items-center justify-center">1</button>
                <button className="w-10 h-10 rounded-lg hover:bg-surface-container-high text-on-surface-variant font-bold flex items-center justify-center border border-outline-variant bg-white disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
