import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/CustomerHeader';
import CustomerFooter from '../../components/CustomerFooter';
import { 
  getCurrentUser, 
  getCart, 
  updateCartQty, 
  removeFromCart, 
  getAddresses, 
  addAddress, 
  deleteAddress, 
  setDefaultAddress,
  createRazorpayOrder
} from '../../utils/auth';

const BACKEND_URL = 'http://localhost:5000/api';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  const [cartItems, setCartItems] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddressId, setSelectedAddressId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Address Form Modal state
  const [showAddressModal, setShowAddressModal] = React.useState(false);
  const [addressName, setAddressName] = React.useState('');
  const [addressPhone, setAddressPhone] = React.useState('');
  const [addressStreet, setAddressStreet] = React.useState('');
  const [addressCity, setAddressCity] = React.useState('');
  const [addressState, setAddressState] = React.useState('');
  const [addressPincode, setAddressPincode] = React.useState('');

  // Simulated Razorpay Modal State
  const [showSimulatedRzp, setShowSimulatedRzp] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState('upi');
  const [upiPaymentVerifying, setUpiPaymentVerifying] = React.useState(false);
  const [upiOrderTimer, setUpiOrderTimer] = React.useState(30);

  const handleUpiVerificationFromSimulatedRzp = async () => {
    const selectedAddr = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddr) return;

    setUpiPaymentVerifying(true);
    
    // Simulate a 2-second backend verification delay
    setTimeout(async () => {
      try {
        const deliveryAddressStr = `${selectedAddr.name}, Phone: ${selectedAddr.phone}, ${selectedAddr.street_address}, ${selectedAddr.city}, ${selectedAddr.state} - ${selectedAddr.pincode}`;

        const verifyResponse = await fetch(`${BACKEND_URL}/payments/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            razorpay_order_id: 'UPI_ORDER_' + Math.random().toString(36).substring(2, 11).toUpperCase(),
            razorpay_payment_id: 'UPI_PAY_' + Math.random().toString(36).substring(2, 11).toUpperCase(),
            razorpay_signature: 'UPI_SCAN_PAY_BYPASS',
            cartItems: cartItems.map(item => ({ id: item.id, qty: item.qty })),
            deliveryAddress: deliveryAddressStr
          })
        });

        if (verifyResponse.ok) {
          alert('Payment checkout successful and order placed! Expect delivery in 7 Days.');
          setShowSimulatedRzp(false);
          setUpiPaymentVerifying(false);
          setCartItems([]);
          navigate('/customer/orders');
        } else {
          alert('Payment verification failed on server.');
          setUpiPaymentVerifying(false);
        }
      } catch (err) {
        alert('Error validating payment callback.');
        setUpiPaymentVerifying(false);
      }
    }, 2000);
  };

  React.useEffect(() => {
    let timer;
    if (showSimulatedRzp && selectedMethod === 'upi' && upiOrderTimer > 0 && !upiPaymentVerifying) {
      timer = setTimeout(() => setUpiOrderTimer(upiOrderTimer - 1), 1000);
    } else if (showSimulatedRzp && selectedMethod === 'upi' && upiOrderTimer === 0 && !upiPaymentVerifying) {
      handleUpiVerificationFromSimulatedRzp();
    }
    return () => clearTimeout(timer);
  }, [showSimulatedRzp, selectedMethod, upiOrderTimer, upiPaymentVerifying]);

  const loadCartData = async () => {
    if (!currentUser) return;
    const cart = await getCart();
    setCartItems(cart);
    
    const addr = await getAddresses();
    setAddresses(addr);
    
    // Select default address if available
    const defaultAddr = addr.find(a => a.is_default);
    if (defaultAddr) {
      setSelectedAddressId(defaultAddr.id);
    } else if (addr.length > 0) {
      setSelectedAddressId(addr[0].id);
    }
  };

  React.useEffect(() => {
    if (!currentUser) {
      alert('Please log in as a customer to access your cart.');
      navigate('/customer/login');
      return;
    }
    
    setLoading(true);
    loadCartData().then(() => setLoading(false));
  }, [currentUser?.id]);

  const updateQty = async (productId, currentQty, amount) => {
    const nextQty = currentQty + amount;
    if (nextQty < 1) return;
    const ok = await updateCartQty(productId, nextQty);
    if (ok) {
      await loadCartData();
    }
  };

  const removeItem = async (productId) => {
    const ok = await removeFromCart(productId);
    if (ok) {
      await loadCartData();
    }
  };

  // Address handlers
  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    if (!addressName || !addressPhone || !addressStreet || !addressCity || !addressState || !addressPincode) {
      alert("Please fill in all address fields.");
      return;
    }
    
    const payload = {
      name: addressName,
      phone: addressPhone,
      streetAddress: addressStreet,
      city: addressCity,
      state: addressState,
      pincode: addressPincode,
      isDefault: addresses.length === 0
    };

    const newAddr = await addAddress(payload);
    if (newAddr) {
      // Reset fields
      setAddressName('');
      setAddressPhone('');
      setAddressStreet('');
      setAddressCity('');
      setAddressState('');
      setAddressPincode('');
      setShowAddressModal(false);
      
      const updated = await getAddresses();
      setAddresses(updated);
      setSelectedAddressId(newAddr.id);
    } else {
      alert("Failed to add delivery address.");
    }
  };

  const handleDeleteAddress = async (id, e) => {
    e.stopPropagation();
    const ok = await deleteAddress(id);
    if (ok) {
      const updated = await getAddresses();
      setAddresses(updated);
      if (selectedAddressId === id) {
        if (updated.length > 0) setSelectedAddressId(updated[0].id);
        else setSelectedAddressId(null);
      }
    }
  };

  const handleSetDefault = async (id, e) => {
    e.stopPropagation();
    const ok = await setDefaultAddress(id);
    if (ok) {
      const updated = await getAddresses();
      setAddresses(updated);
    }
  };

  // Math
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const delivery = subtotal > 0 ? 100 : 0;
  const platformFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery + platformFee;

  const handleCheckout = async () => {
    if (!currentUser) {
      alert('Please log in to checkout.');
      navigate('/customer/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const selectedAddr = addresses.find(a => a.id === selectedAddressId);
    if (!selectedAddr) {
      alert('Please add and select a delivery address before proceeding to checkout.');
      return;
    }

    setSelectedMethod('upi');
    setUpiOrderTimer(30);
    setUpiPaymentVerifying(false);
    setShowSimulatedRzp(true);
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg font-bold text-primary animate-pulse">Loading your cart items...</p>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <CustomerHeader cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)} />

      <main className="flex-grow pt-32 pb-24 px-margin-desktop max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-gutter">
          
          {/* Cart & Address Section */}
          <div className="flex-grow lg:w-2/3 flex flex-col gap-8">
            <div className="text-left">
              <h1 className="font-display-lg text-4xl font-bold text-primary">Your Shopping Cart</h1>
              <p className="text-secondary mt-1">{cartItems.length} premium products ready for checkout</p>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white border border-outline-variant p-12 text-center rounded-lg">
                <span className="material-symbols-outlined text-6xl text-outline mb-4">shopping_cart_off</span>
                <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-secondary mb-6">Add items from the selections to see them here.</p>
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
                        src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'} 
                        alt={item.title} 
                      />
                    </div>
                    
                    <div className="flex flex-col flex-grow justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-headline-md text-xl font-bold text-primary">{item.title}</h3>
                          <p className="text-secondary text-xs mt-1 uppercase tracking-wider">{item.category}</p>
                          <span className="font-label-sm text-[10px] bg-surface-container text-on-surface px-2 py-0.5 mt-2 inline-block rounded">
                            {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                        <span className="font-headline-md text-lg font-bold text-primary">₹{parseFloat(item.price).toLocaleString()}</span>
                      </div>

                      <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest">
                          <button 
                            className="w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer text-primary" 
                            onClick={() => updateQty(item.id, item.qty, -1)}
                          >
                            <span className="material-symbols-outlined text-sm font-bold">remove</span>
                          </button>
                          <span className="w-12 text-center font-body-md text-primary font-semibold select-none">
                            {item.qty}
                          </span>
                          <button 
                            className="w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors cursor-pointer text-primary" 
                            onClick={() => updateQty(item.id, item.qty, 1)}
                          >
                            <span className="material-symbols-outlined text-sm font-bold">add</span>
                          </button>
                        </div>
                        
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
                ))}
              </div>
            )}

            {/* Delivery Address Section (Task 6) */}
            {cartItems.length > 0 && (
              <div className="bg-white border border-outline-variant p-6 rounded-lg text-left">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">location_on</span>
                    Select Delivery Address
                  </h2>
                  <button 
                    onClick={() => setShowAddressModal(true)}
                    className="text-primary font-semibold hover:underline flex items-center gap-1 text-sm bg-surface-container px-3 py-1.5 rounded-lg border cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id} 
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 border rounded-lg cursor-pointer flex flex-col justify-between transition-all ${selectedAddressId === addr.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-outline-variant hover:border-outline bg-white'}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-primary">{addr.name}</span>
                          {addr.is_default && (
                            <span className="bg-secondary-container text-on-secondary-container text-[8px] px-1 py-0.5 rounded font-bold uppercase">Default</span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant">{addr.street_address}</p>
                        <p className="text-xs text-on-surface-variant">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-on-surface-variant font-medium">Contact: {addr.phone}</p>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between border-t pt-2 gap-2 text-[10px]">
                        {!addr.is_default && (
                          <button 
                            onClick={(e) => handleSetDefault(addr.id, e)} 
                            className="text-primary font-bold hover:underline cursor-pointer"
                          >
                            Set Default
                          </button>
                        )}
                        <button 
                          onClick={(e) => handleDeleteAddress(addr.id, e)} 
                          className="text-error font-bold hover:underline ml-auto cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && (
                    <p className="text-sm text-on-surface-variant col-span-2 py-4">No saved addresses. Please add a delivery address to checkout.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Checkout Summary Sidebar */}
          {cartItems.length > 0 && (
            <aside className="lg:w-1/3 text-left">
              <div className="glass-card p-8 sticky top-32 rounded-xl border border-outline-variant bg-white">
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
                  className="w-full text-white py-4 bg-[#0c1322] hover:bg-[#1a253c] rounded-full font-semibold text-body-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg cursor-pointer"
                >
                  Proceed to Payment (₹{total.toLocaleString()})
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* ADD ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleAddAddressSubmit} className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 relative text-left">
            <button 
              type="button" 
              onClick={() => setShowAddressModal(false)}
              className="absolute top-4 right-4 material-symbols-outlined text-secondary hover:bg-surface-container p-2 rounded-full cursor-pointer"
            >
              close
            </button>
            <h3 className="font-headline-md text-xl font-bold text-primary mb-4 flex items-center gap-2 border-b pb-2">
              <span className="material-symbols-outlined">add_location</span>
              Add Delivery Address
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={addressName} 
                  onChange={e => setAddressName(e.target.value)} 
                  placeholder="e.g. Mahi Dileep" 
                  required
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Contact Phone</label>
                <input 
                  type="tel" 
                  value={addressPhone} 
                  onChange={e => setAddressPhone(e.target.value)} 
                  placeholder="e.g. +91 99999 88888" 
                  required
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Street Address</label>
                <input 
                  type="text" 
                  value={addressStreet} 
                  onChange={e => setAddressStreet(e.target.value)} 
                  placeholder="e.g. Apt 4B, Sector 12" 
                  required
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">City</label>
                  <input 
                    type="text" 
                    value={addressCity} 
                    onChange={e => setAddressCity(e.target.value)} 
                    placeholder="e.g. Bangalore" 
                    required
                    className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">State</label>
                  <input 
                    type="text" 
                    value={addressState} 
                    onChange={e => setAddressState(e.target.value)} 
                    placeholder="e.g. Karnataka" 
                    required
                    className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">Pincode</label>
                <input 
                  type="text" 
                  value={addressPincode} 
                  onChange={e => setAddressPincode(e.target.value)} 
                  placeholder="e.g. 560001" 
                  required
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
              <button 
                type="button" 
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 border border-outline-variant rounded-full text-sm font-semibold hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:opacity-90 cursor-pointer"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SIMULATED RAZORPAY CHECKOUT OVERLAY */}
      {showSimulatedRzp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[550px] relative text-left">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowSimulatedRzp(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20 material-symbols-outlined cursor-pointer"
            >
              close
            </button>

            {/* Left Column: Summary (Dark Blue/Grey) */}
            <div className="w-full md:w-[320px] bg-[#0c1322] text-white p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-lg text-white">N</div>
                  <span className="font-bold text-lg tracking-tight">NexaCart E-Commerce</span>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl mb-4">
                  <p className="text-xs text-white/55 uppercase tracking-wider font-semibold mb-1">Price Summary</p>
                  <p className="text-3xl font-bold">₹{total.toLocaleString('en-IN')}</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white/60 text-sm">person</span>
                    <span className="text-xs text-white/80 font-medium">Using as {currentUser?.phone || '+91 63006 68400'}</span>
                  </div>
                  <span className="material-symbols-outlined text-white/40 text-xs">chevron_right</span>
                </div>
              </div>

              {/* Bottom graphic & Secured Tag */}
              <div className="mt-8">
                <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                  <span>Secured by</span>
                  <span className="text-white/60 font-black">Razorpay</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Payment Methods */}
            <div className="flex-grow bg-white flex flex-col">
              {/* Header Title */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                <h3 className="font-semibold text-gray-700 text-sm">Payment Options</h3>
              </div>

              {/* Two Column details pane */}
              <div className="flex flex-grow flex-col sm:flex-row">
                
                {/* Left Method List (Light background) */}
                <div className="w-full sm:w-[200px] bg-[#f8fafc] border-r border-gray-100 p-2 space-y-1 flex flex-col">
                  <button 
                    onClick={() => setSelectedMethod('card')}
                    className={`w-full flex flex-col p-3 rounded-lg text-left transition-all ${selectedMethod === 'card' ? 'bg-white shadow border border-gray-100' : 'hover:bg-gray-100/50'}`}
                  >
                    <span className="text-xs font-bold text-gray-700">Cards</span>
                    <span className="text-[10px] text-gray-400 mt-1">Visa, MasterCard, RuPay</span>
                  </button>
                  <button 
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`w-full flex flex-col p-3 rounded-lg text-left transition-all ${selectedMethod === 'netbanking' ? 'bg-white shadow border border-gray-100' : 'hover:bg-gray-100/50'}`}
                  >
                    <span className="text-xs font-bold text-gray-700">Netbanking</span>
                    <span className="text-[10px] text-gray-400 mt-1">SBI, ICICI, HDFC</span>
                  </button>
                  <button 
                    onClick={() => setSelectedMethod('wallet')}
                    className={`w-full flex flex-col p-3 rounded-lg text-left transition-all ${selectedMethod === 'wallet' ? 'bg-white shadow border border-gray-100' : 'hover:bg-gray-100/50'}`}
                  >
                    <span className="text-xs font-bold text-gray-700">Wallet</span>
                    <span className="text-[10px] text-gray-400 mt-1">Paytm, PhonePe</span>
                  </button>
                  <button 
                    onClick={() => setSelectedMethod('paylater')}
                    className={`w-full flex flex-col p-3 rounded-lg text-left transition-all ${selectedMethod === 'paylater' ? 'bg-white shadow border border-gray-100' : 'hover:bg-gray-100/50'}`}
                  >
                    <span className="text-xs font-bold text-gray-700">Pay Later</span>
                    <span className="text-[10px] text-gray-400 mt-1">LazyPay, ePayLater</span>
                  </button>
                  <button 
                    onClick={() => setSelectedMethod('upi')}
                    className={`w-full flex flex-col p-3 rounded-lg text-left transition-all ${selectedMethod === 'upi' ? 'bg-white shadow border border-gray-100 border-l-4 border-l-primary' : 'hover:bg-gray-100/50'}`}
                  >
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-primary">qr_code_scanner</span>
                      Scan &amp; Pay QR
                    </span>
                    <span className="text-[10px] text-primary font-semibold mt-1">Simulated UPI QR</span>
                  </button>
                </div>

                {/* Right Form Pane */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  {selectedMethod === 'upi' && (
                    <div className="space-y-6 text-center flex-1 flex flex-col justify-center items-center">
                      <div className="w-48 h-48 border border-gray-200 rounded-xl p-2 bg-white shadow-md flex items-center justify-center">
                        <img 
                          src="/fake_upi_qr.png" 
                          alt="UPI QR Code" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">Scan QR code using any UPI App (GPay, PhonePe, Paytm, BHIM) to pay ₹{total.toLocaleString('en-IN')}</p>
                      </div>
                      
                      {upiPaymentVerifying ? (
                        <div className="flex items-center justify-center gap-2 text-primary font-bold animate-pulse text-xs py-2">
                          <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                          Verifying transaction with bank...
                        </div>
                      ) : (
                        <div className="w-full max-w-xs space-y-2">
                          <div className="text-[10px] text-gray-500 font-medium">Awaiting payment... <span className="font-bold text-primary">{upiOrderTimer}s</span></div>
                          <button 
                            onClick={handleUpiVerificationFromSimulatedRzp}
                            className="w-full py-3 bg-[#0c1322] hover:bg-[#1a253c] text-white rounded-lg font-bold text-sm shadow transition-all cursor-pointer"
                          >
                            Simulate Payment Success
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedMethod === 'card' && (
                    <div className="space-y-4 flex-1">
                      <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-4">Add a new card</h4>
                      <div className="space-y-3">
                        <input type="text" placeholder="Card Number" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="MM / YY" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                          <input type="password" placeholder="CVV" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                        </div>
                      </div>
                      <button 
                        onClick={handleUpiVerificationFromSimulatedRzp}
                        className="w-full mt-6 py-3 bg-[#0c1322] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all cursor-pointer"
                      >
                        Pay ₹{total.toLocaleString('en-IN')}
                      </button>
                    </div>
                  )}

                  {selectedMethod === 'netbanking' && (
                    <div className="space-y-4 flex-1">
                      <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-4">Popular Banks</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="p-3 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 text-center cursor-pointer">State Bank of India</button>
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="p-3 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 text-center cursor-pointer">HDFC Bank</button>
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="p-3 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 text-center cursor-pointer">ICICI Bank</button>
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="p-3 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 text-center cursor-pointer">Axis Bank</button>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'wallet' && (
                    <div className="space-y-4 flex-1">
                      <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-4">Select Wallet</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="p-3 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 text-center cursor-pointer">Paytm Wallet</button>
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="p-3 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 text-center cursor-pointer">PhonePe Wallet</button>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'paylater' && (
                    <div className="space-y-4 flex-1">
                      <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-4">Select Provider</h4>
                      <div className="space-y-2">
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="w-full p-4 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer">
                          <span>LazyPay</span>
                          <span className="material-symbols-outlined text-xs">chevron_right</span>
                        </button>
                        <button onClick={handleUpiVerificationFromSimulatedRzp} className="w-full p-4 border rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer">
                          <span>ePayLater</span>
                          <span className="material-symbols-outlined text-xs">chevron_right</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomerFooter />
    </div>
  );
}
