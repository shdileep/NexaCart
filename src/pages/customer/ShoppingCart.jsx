import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { addOrder, getCurrentUser } from '../../utils/auth';

export default function ShoppingCart() {
  const navigate = useNav();
  
  const [cartItems, setCartItems] = React.useState([
    {
      id: 'aura-hd',
      title: 'Aura HD Wireless Audio',
      variant: 'Midnight Blue Edition',
      tag: 'In Stock',
      price: 24900, 
      priceString: '₹24,900',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB92lkry1U0hQvINlXum-Z5NZKtfVuXr5_UwSkzkeTvrdFwIaInVN1PKMIfTKFqm0tiqrJbdz9EsyTUppAYUtnP-n2qj0NGZi42mwsAfztsPx8BJ4rHVKO9Khz8Lg-ednm140uCG_gyoC2B6MUIq9YZExJPqNbDnC4lvQGilI11PPVw_5OVfFwO-XdH_dH7HWS9raqUTJsz6oE-zg81PahkxckYJJUhM7AfXYP2eh4KyiZgKQpYVVFDscMK-yiUAmvnDcVi83cLwJM'
    },
    {
      id: 'leather-satchel',
      title: 'Executive Leather Satchel',
      variant: 'Color: Cognac Brown | Size: 15" Laptop',
      tag: 'Limited Edition',
      price: 37500, 
      priceString: '₹37,500',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABiXCfaQBy2ZCSXb9DfRURyx-Zj6F6WPimkHDv-ZDsLi6l11yUwLVh79fUJxFfhxW8OXTbS5-ASyGZr6-z3rM8hFGi8h-0Jwag99Pg5l81Lz7tDeHSLj6FPeR1ODgSYlOIr1Kv3XBk4KAMPucgpWFp7wOdSjbRPJOxGU72LSgrFtT6TeP_V54W0VVHiQIVBAWKbC0Oo4nvlwqR26ONLrEC9wT_tfaAk_w3k2v3sbqUCNAzWRQu9bO1S0aq0zzMN6wzJKTYW6Rz2PE'
    }
  ]);

  const updateQty = (id, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(1, item.qty + amount);
        return { ...item, qty: nextQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Math
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const delivery = subtotal > 0 ? 100 : 0;
  const platformFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery + platformFee;

  const handleCheckout = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Please log in as a customer to checkout.');
      navigate('/customer/login');
      return;
    }

    // Place orders for all items in the cart
    cartItems.forEach(item => {
      addOrder({
        customerId: currentUser.id,
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        customerPhone: currentUser.phone || '+916300668400',
        productId: item.id,
        productTitle: item.title,
        amount: item.price * item.qty,
        status: 'Pending'
      });
    });

    alert('Order placed successfully! Synchronized with Admin Dashboard in real time.');
    setCartItems([]);
    navigate('/customer/orders');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)} />

      <main className="flex-grow pt-32 pb-24 px-margin-desktop max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Cart Items Section */}
          <div className="flex-grow lg:w-2/3">
            <div className="flex justify-between items-end mb-8">
              <div className="text-left">
                <h1 className="font-display-lg text-4xl lg:text-5xl font-bold text-primary">Your Shopping Cart</h1>
                <p className="text-secondary mt-2">{cartItems.length} premium items reserved for you</p>
              </div>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white border border-outline-variant p-12 text-center rounded-lg">
                <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart_off</span>
                <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-secondary mb-6">Add items to your cart to see them here.</p>
                <button 
                  onClick={() => navigate('/customer/dashboard')}
                  className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-gutter">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white border border-outline-variant p-6 flex flex-col md:flex-row gap-6 hover:shadow-sm transition-shadow rounded-lg text-left">
                    <div className="w-full md:w-48 h-48 bg-surface-container flex-shrink-0 relative overflow-hidden group rounded-lg">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        src={item.image} 
                        alt={item.title} 
                      />
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-headline-md text-xl font-bold text-primary">{item.title}</h3>
                          <p className="text-secondary text-body-md mt-1">{item.variant}</p>
                          <span className="font-label-sm text-label-sm bg-surface-container text-on-surface px-2 py-1 mt-3 inline-block uppercase rounded">
                            {item.tag}
                          </span>
                        </div>
                        <span className="font-headline-md text-lg font-bold text-primary">{item.priceString}</span>
                      </div>

                      <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest">
                          <button 
                            className="w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer text-primary" 
                            onClick={() => updateQty(item.id, -1)}
                          >
                            <span className="material-symbols-outlined text-sm font-bold">remove</span>
                          </button>
                          <span className="w-12 text-center font-body-md text-primary font-semibold select-none">
                            {item.qty}
                          </span>
                          <button 
                            className="w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer text-primary" 
                            onClick={() => updateQty(item.id, 1)}
                          >
                            <span className="material-symbols-outlined text-sm font-bold">add</span>
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-error text-body-md hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-10 p-6 bg-surface-container-low border border-outline-variant text-primary rounded-lg flex items-center gap-4 text-left">
                <span className="material-symbols-outlined text-[32px]">local_shipping</span>
                <div>
                  <p className="font-semibold">Complimentary Express Shipping Applied</p>
                  <p className="text-on-surface-variant text-sm">Your order qualifies for priority 2-day handling.</p>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          {cartItems.length > 0 && (
            <aside className="lg:w-1/3">
              <div className="glass-card p-8 sticky top-32 rounded-xl text-left">
                <h2 className="font-headline-md text-2xl font-bold mb-6 text-primary border-b border-outline-variant pb-2">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal</span>
                    <span className="text-primary font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Delivery Charge</span>
                    <span className="text-primary font-semibold">₹{delivery}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Platform Fee</span>
                    <span className="text-primary font-semibold">₹{platformFee}</span>
                  </div>
                </div>

                <div className="border-t border-outline-variant pt-6 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="font-headline-md text-xl font-bold text-primary">Total</span>
                    <span className="font-display-lg text-3xl font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full text-white py-4 bg-primary rounded-full font-semibold text-body-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg cursor-pointer"
                >
                  Check Out Now (₹{total.toLocaleString()})
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>

      <CustomerFooter />
    </div>
  );
}
