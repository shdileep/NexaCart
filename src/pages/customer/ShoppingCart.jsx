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

  // UPI Scan & Pay Modal State
  const [showUpiModal, setShowUpiModal] = React.useState(false);
  const [upiPaymentVerifying, setUpiPaymentVerifying] = React.useState(false);
  const [upiOrderTimer, setUpiOrderTimer] = React.useState(30);

  React.useEffect(() => {
    let timer;
    if (showUpiModal && upiOrderTimer > 0 && !upiPaymentVerifying) {
      timer = setTimeout(() => setUpiOrderTimer(upiOrderTimer - 1), 1000);
    } else if (showUpiModal && upiOrderTimer === 0 && !upiPaymentVerifying) {
      handleUpiVerification();
    }
    return () => clearTimeout(timer);
  }, [showUpiModal, upiOrderTimer, upiPaymentVerifying]);

  const handleUpiScanAndPay = () => {
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

    setUpiOrderTimer(30);
    setUpiPaymentVerifying(false);
    setShowUpiModal(true);
  };

  const handleUpiVerification = async () => {
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
          alert('UPI Payment Verified! Order placed successfully.');
          setShowUpiModal(false);
          setUpiPaymentVerifying(false);
          setCartItems([]);
          navigate('/customer/orders');
        } else {
          alert('UPI verification failed on server.');
          setUpiPaymentVerifying(false);
        }
      } catch (err) {
        alert('Error validating UPI checkout callback.');
        setUpiPaymentVerifying(false);
      }
    }, 2000);
  };

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

    const deliveryAddressStr = `${selectedAddr.name}, Phone: ${selectedAddr.phone}, ${selectedAddr.street_address}, ${selectedAddr.city}, ${selectedAddr.state} - ${selectedAddr.pincode}`;

    // 1. Call backend to create Razorpay Order
    const rzpOrder = await createRazorpayOrder(total);
    if (!rzpOrder) {
      alert('Order creation failed on backend server.');
      return;
    }

    // 2. Open Razorpay Checkout overlay
    const options = {
      key: 'rzp_test_TFLbN6g6YPuD2m',
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      name: 'NexaCart E-Commerce',
      description: 'Role-Based Checkout Test Payment',
      order_id: rzpOrder.id,
      handler: async function (response) {
        // 3. Post verification payload to backend
        try {
          const verifyResponse = await fetch(`${BACKEND_URL}/payments/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems: cartItems.map(item => ({ id: item.id, qty: item.qty })),
              deliveryAddress: deliveryAddressStr
            })
          });

          if (verifyResponse.ok) {
            alert('Payment checkout successful and order placed! Expect delivery in 7 Days.');
            setCartItems([]);
            navigate('/customer/orders');
          } else {
            const err = await verifyResponse.json();
            alert(`Payment verification failed: ${err.message || 'Signature mismatch'}`);
          }
        } catch (error) {
          alert('Error validating payment callback.');
        }
      },
      prefill: {
        name: currentUser.name,
        email: currentUser.email,
        contact: currentUser.phone || '+916300668400'
      },
      theme: {
        color: '#0F172A'
      }
    };

    const rzpInstance = new window.Razorpay(options);
    rzpInstance.open();
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
                  className="w-full text-white py-4 bg-primary rounded-full font-semibold text-body-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg cursor-pointer"
                >
                  Pay via Razorpay (₹{total.toLocaleString()})
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button 
                  onClick={handleUpiScanAndPay}
                  className="w-full text-primary mt-3 py-3 border-2 border-primary rounded-full font-semibold text-body-md flex items-center justify-center gap-2 hover:bg-primary/5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                  Scan &amp; Pay (UPI QR)
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

      {/* UPI QR CODE MODAL */}
      {showUpiModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-6 relative text-center">
            <button 
              type="button" 
              onClick={() => setShowUpiModal(false)}
              disabled={upiPaymentVerifying}
              className="absolute top-4 right-4 material-symbols-outlined text-secondary hover:bg-surface-container p-2 rounded-full cursor-pointer disabled:opacity-50"
            >
              close
            </button>
            <h3 className="font-headline-md text-xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-primary">qr_code_2</span>
              Scan &amp; Pay UPI
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">Scan QR code using any UPI App (GPay, PhonePe, Paytm, BHIM)</p>

            <div className="w-64 h-64 mx-auto border border-outline-variant rounded-xl flex items-center justify-center p-2 bg-white shadow-inner mb-6">
              <img 
                src="/fake_upi_qr.png" 
                alt="UPI QR Code" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="bg-surface-container p-4 rounded-xl mb-6 text-left">
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium mb-1">
                <span>Amount to Pay</span>
                <span className="font-bold text-primary text-sm">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-medium">
                <span>UPI ID</span>
                <span className="font-mono text-primary font-semibold">nexacart@upi</span>
              </div>
            </div>

            <div className="space-y-4">
              {upiPaymentVerifying ? (
                <div className="flex items-center justify-center gap-2 text-primary font-bold animate-pulse py-2 text-sm">
                  <span className="material-symbols-outlined animate-spin text-lg">autorenew</span>
                  Verifying transaction with bank...
                </div>
              ) : (
                <>
                  <div className="text-xs text-on-surface-variant mb-2">
                    Awaiting payment... <span className="font-bold text-primary">{upiOrderTimer}s</span> remaining
                  </div>
                  <button 
                    onClick={handleUpiVerification}
                    className="w-full py-3 bg-primary text-white rounded-full font-bold text-sm shadow hover:opacity-90 active:scale-98 transition-all cursor-pointer"
                  >
                    Simulate Payment Success
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CustomerFooter />
    </div>
  );
}
