import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { getOrders, getProducts, addOrUpdateReview, getReviews, getCurrentUser } from '../../utils/auth';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [invoiceDownloaded, setInvoiceDownloaded] = React.useState(false);

  const currentUser = getCurrentUser();

  React.useEffect(() => {
    async function loadData() {
      const allOrders = await getOrders();
      const currentOrder = allOrders.find(o => o.id === orderId);
      if (currentOrder) {
        setOrder(currentOrder);
        
        const allProds = await getProducts();
        const matchingProd = allProds.find(p => p.id === currentOrder.productId);
        setProduct(matchingProd);
        
        const reviews = await getReviews();
        const existingReview = reviews.find(r => r.orderId === orderId);
        if (existingReview) {
          setRating(existingReview.rating);
        }
      }
    }
    loadData();
  }, [orderId]);

  const handleDownloadInvoice = () => {
    setInvoiceDownloaded(true);
    setTimeout(() => {
      alert("Invoice downloaded successfully!");
      setInvoiceDownloaded(false);
    }, 800);
  };

  const handleRate = (starIdx) => {
    if (!order) return;
    setRating(starIdx);
    addOrUpdateReview(order.id, order.productId, starIdx, currentUser?.name || order.customerName || 'Customer');
    alert(`Thank you for rating this product ${starIdx} stars!`);
  };

  if (!order) {
    return (
      <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
        <CustomerHeader />
        <main className="pt-[120px] pb-20 flex-grow text-center">
          <p className="text-on-surface-variant">Order not found.</p>
          <button onClick={() => navigate('/customer/orders')} className="mt-4 text-primary font-bold hover:underline cursor-pointer">
            Back to Orders
          </button>
        </main>
        <CustomerFooter />
      </div>
    );
  }

  // Fallback image map
  const getProductImage = () => {
    if (product?.image) return product.image;
    if (order.productTitle.toLowerCase().includes('watch') || order.productTitle.toLowerCase().includes('chronos')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7gRr7OdzPV3z83yJsrXRtDKrpz6JeQBD8qwHxVpCXuZNecEQkvV-_l5ka4yc3sXeKz14n6ca07ikvv1T3N9Sl9hezV52uUEv-2PNxFK8adNCSmYHS0FOm-JyPq8aR1REU5ol0yb88BbFzP53WlfkG-3mdQ28XSOxYc8AriaqfnxEX1dKOcY5hA-jIR2BUf0EgVkhs2xa-93wrNz2BjwWTyAhi0hd7D8WSL0tAZXdeCGKTjWoV9XMmabXCWaPzowIY97AfxMmwXXc';
    }
    if (order.productTitle.toLowerCase().includes('audio') || order.productTitle.toLowerCase().includes('earbuds') || order.productTitle.toLowerCase().includes('headphone')) {
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJLEdugLzTFKGPe8etQ4RUTvE7ZXX32p1u0KZX0ADq3tSz-ClYWrF8oz5u-K-If-vzExKQx2bqqkl7QiYbnXya1FjHUk3-UpNa000_3yFd-1eJ4DTsRfEIwjgnR0vplW-e6_ahBqAWiBv4X_4qi_dPj5aqpVTDqZLxBGTjQGJ3d7ku21aScShZxtUdonoWz9XeYcNOoie9A1LGPnO__92RK7vfDCm_cQLr5b7mKUg2wl3duAOcNhCaQRk_BoHQTNPnebzT4_mRnaU';
    }
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGQVYwq6toyaqKihU5OTaSdq_wE_bRBx233knZ9g82WE-mdfGFqTfEA-wPB39bK2bBl9nMNfiC10RM86m5NBio0bljWOmVcseUk57BV20Ia7FA1_Ce3SBUqmaYAX_FBzYQ844gbhVHhYmKOMllwshZk8mBev9bWqagGYN5MD958VJQ4q9U1-aP_5BPn1tYyUj_bpMe_QOsrdvNnoW-qjCji2JSA5jfO1i0MIFL7noPummd37ZNQOnmAps1GIn7nuCF2oF8uKHnF3g';
  };

  const amount = order.amount || 0;
  const originalPrice = product?.originalPrice || Math.round(amount * 1.25);
  const sellerStore = product?.storeName || product?.sellerName || 'NexaCart Seller';

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="pt-[100px] pb-20 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full flex-grow text-left">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
          <button onClick={() => navigate('/customer/dashboard')} className="hover:text-primary transition-colors cursor-pointer">Home</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <button onClick={() => navigate('/customer/orders')} className="hover:text-primary transition-colors cursor-pointer">My Orders</button>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-bold">{order.id}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Order Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Product Card */}
            <section className="bg-white border border-outline-variant p-6 rounded-lg transition-all hover:shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-32 h-32 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-outline-variant">
                  <img 
                    className="w-full h-full object-contain" 
                    src={getProductImage()} 
                    alt={order.productTitle} 
                  />
                </div>
                
                <div className="flex-grow space-y-3">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <h1 className="font-headline-md text-xl font-bold text-primary leading-snug mb-2">
                        {order.productTitle}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-on-surface-variant text-sm">
                        <span className="font-label-sm bg-surface-container rounded px-2 py-0.5">{product?.category || 'General'}</span>
                        <span className="font-body-md border-l border-outline-variant pl-3">
                          Store: <span className="text-primary font-semibold">{sellerStore}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-headline-md text-2xl font-bold text-primary">₹{amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Tracker */}
              <div className="mt-12 pt-8 border-t border-outline-variant">
                <div className="max-w-2xl">
                  <div className="flex flex-col gap-8 relative">
                    <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-outline-variant"></div>
                    <div className="absolute left-[11px] top-3 h-[44px] w-[2px] bg-primary"></div>
                    
                    <div className="flex items-start gap-6 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>
                      </div>
                      <div>
                        <h3 className="font-body-md font-bold text-primary">Order Placed</h3>
                        <p className="font-label-sm text-secondary uppercase tracking-wider text-[11px]">{order.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-6 relative z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${order.status === 'Delivered' ? 'bg-primary' : 'bg-outline-variant'}`}>
                        {order.status === 'Delivered' ? (
                          <span className="material-symbols-outlined text-white text-[14px] font-bold">check</span>
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                        )}
                      </div>
                      <div>
                        <h3 className={`font-body-md font-bold ${order.status === 'Delivered' ? 'text-primary' : 'text-on-surface-variant'}`}>{order.status}</h3>
                        <p className="font-label-sm text-secondary uppercase tracking-wider text-[11px]">{order.status === 'Delivered' ? 'Fulfillment Successful' : 'Delivery Expected By: ' + order.deliveryDate}</p>
                      </div>
                    </div>
                  </div>
                  {order.status === 'Delivered' && (
                    <p className="mt-8 font-label-sm text-secondary italic text-xs">Return policy active until {(order.deliveryDate || order.date)}</p>
                  )}
                </div>
              </div>

              {/* Chat Support */}
              <div className="mt-10 border-t border-outline-variant pt-6">
                <button className="w-full flex items-center justify-center gap-3 py-4 hover:bg-surface-container-low transition-colors duration-200 text-primary group border border-outline-variant rounded-lg cursor-pointer">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
                  <span className="font-body-md font-semibold">Chat with Customer Support</span>
                </button>
              </div>
            </section>

            {/* Rating Section */}
            <section className="bg-white border border-outline-variant p-8 rounded-lg">
              <h2 className="font-headline-md text-2xl font-bold text-primary mb-6">Rate your experience</h2>
              <div className="bg-surface-container-low p-6 rounded-lg flex flex-col items-center justify-center border border-outline-variant border-dashed">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((starIdx) => {
                    const currentRating = hoverRating || rating;
                    const isFilled = starIdx <= currentRating;
                    return (
                      <button 
                        key={starIdx}
                        onMouseEnter={() => setHoverRating(starIdx)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => handleRate(starIdx)}
                        className={`p-2 transition-colors cursor-pointer ${isFilled ? 'text-amber-500' : 'text-outline-variant'}`}
                      >
                        <span 
                          className="material-symbols-outlined text-[40px]"
                          style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="font-body-md text-secondary">
                  {rating > 0 ? `You rated this product ${rating} out of 5 stars. Thank you!` : 'Your feedback helps us improve NexaCart.'}
                </p>
              </div>
            </section>

            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg font-label-sm text-secondary text-sm border border-outline-variant">
              <span>Order ID: #{order.id}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(order.id);
                  alert("Order ID copied to clipboard!");
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-6 w-full">
            {/* Delivery Address */}
            <div className="bg-white border border-outline-variant p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <h3 className="font-body-md font-bold text-primary">Delivery Address</h3>
              </div>
              <div className="space-y-1">
                <p className="font-body-md font-semibold text-primary">{order.customerName || currentUser?.name || 'Customer'}</p>
                <p className="font-body-md text-secondary leading-relaxed">
                  GANESH EXECUTIVE P.G FOR MEN'S HOSTEL Phase 3, Electronic City, Bangalore, Karnataka - 560100
                </p>
                <p className="font-body-md text-secondary pt-2">
                  <span className="font-semibold text-primary">Phone:</span> {order.customerPhone || currentUser?.phone || '6300668400'}
                </p>
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-white border border-outline-variant p-6 rounded-lg divide-y divide-outline-variant">
              <div className="pb-4 space-y-3">
                <h3 className="font-body-md font-bold text-primary mb-2">Price Details</h3>
                <div className="flex justify-between font-body-md text-secondary">
                  <span>Product Subtotal</span>
                  <span>₹{amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body-md text-secondary">
                  <span>Delivery Charge</span>
                  <span>₹{parseFloat(order.delivery_charge || 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body-md text-secondary">
                  <span>Platform Fee</span>
                  <span>₹50</span>
                </div>
              </div>
              
              <div className="py-4">
                <div className="flex justify-between font-headline-md text-xl text-primary font-bold">
                  <span>Total amount paid</span>
                  <span>₹{(parseFloat(amount) + parseFloat(order.delivery_charge || 100) + 50).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded border border-outline-variant">
                  <span className="font-label-sm text-secondary">Paid By</span>
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm font-bold text-primary">UPI</span>
                    <div className="bg-white border border-outline-variant px-1.5 py-0.5 rounded text-[10px] font-bold text-primary">UPI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Download */}
            <button 
              onClick={handleDownloadInvoice}
              disabled={invoiceDownloaded}
              className="w-full py-4 bg-white border border-primary text-primary font-bold rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-neutral-900 hover:text-white group cursor-pointer"
            >
              <span className={`material-symbols-outlined ${invoiceDownloaded ? 'animate-spin' : 'group-hover:animate-bounce'}`}>
                {invoiceDownloaded ? 'sync' : 'download'}
              </span>
              {invoiceDownloaded ? 'Downloading...' : 'Download Invoice'}
            </button>
          </aside>
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
