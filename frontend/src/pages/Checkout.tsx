import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  Truck,
  CheckCircle2,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api, resolveImageUrl } from '../services/api';
import { SafeImage } from '../components/common/SafeImage';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Checkout: React.FC = () => {
  const {
    items,
    subtotal,
    shippingCharge,
    appliedCoupon,
    couponDiscount,
    total,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  // Guest Customer Information
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    house: '',
    street: '',
    landmark: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    deliveryInstructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-forest">Your Cart is Empty</h2>
        <p className="text-slate-600 text-sm">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="inline-block bg-forest text-cream font-bold px-6 py-2.5 rounded-full text-xs uppercase">
          Go to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      setErrorMessage('Please enter a valid 10-digit mobile number for order delivery updates.');
      return;
    }

    // Validate PIN code (6 digits)
    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setErrorMessage('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim() || undefined
      },
      shippingAddress: {
        house: formData.house.trim(),
        street: formData.street.trim(),
        landmark: formData.landmark.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        deliveryInstructions: formData.deliveryInstructions.trim() || undefined
      },
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        quantity: i.quantity
      })),
      couponCode: appliedCoupon?.code,
      paymentMethod
    };

    try {
      const orderResponse = await api.createOrder(orderPayload);
      const createdOrder = orderResponse.data;

      // Case 1: Cash on Delivery (COD)
      if (paymentMethod === 'cod') {
        clearCart();
        navigate(`/order-success/${createdOrder.orderId}?mobile=${encodeURIComponent(formData.mobile)}`);
        return;
      }

      // Case 2: Razorpay Online Payment
      if (paymentMethod === 'razorpay') {
        const razorpayKey = createdOrder.razorpayKeyId || 'rzp_test_placeholder';

        // Check if official Razorpay checkout script loaded
        if (typeof window.Razorpay === 'undefined') {
          // If in simulator / offline mode or script blocked
          await api.verifyPayment({
            razorpay_order_id: createdOrder.razorpayOrderId || 'sim_order',
            razorpay_payment_id: `pay_sim_${Date.now()}`,
            razorpay_signature: 'sim_sig',
            orderId: createdOrder.orderId
          });
          clearCart();
          navigate(`/order-success/${createdOrder.orderId}?mobile=${encodeURIComponent(formData.mobile)}`);
          return;
        }

        const options = {
          key: razorpayKey,
          amount: Math.round(createdOrder.total * 100),
          currency: 'INR',
          name: 'JEEVAN SHAILI',
          description: `Order ${createdOrder.orderId} - Ayurvedic Dant Manjan`,
          image: '/jeevan-shaili-logo.png',
          order_id: createdOrder.razorpayOrderId,
          handler: async function (response: any) {
            try {
              // Server-side signature verification
              await api.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: createdOrder.orderId
              });
              clearCart();
              navigate(`/order-success/${createdOrder.orderId}?mobile=${encodeURIComponent(formData.mobile)}`);
            } catch (err: any) {
              setErrorMessage('Payment verification failed. Please contact customer support.');
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.mobile
          },
          theme: {
            color: '#174D35'
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
              setErrorMessage('Payment was cancelled. You can retry payment or choose Cash on Delivery.');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          setIsSubmitting(false);
          setErrorMessage(`Payment failed: ${response.error.description}`);
        });
        rzp.open();
      }

    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to place order. Please check details and try again.');
    }
  };

  const indianStates = [
    'Uttar Pradesh', 'Madhya Pradesh', 'Delhi', 'Maharashtra', 'Bihar',
    'Rajasthan', 'Gujarat', 'Haryana', 'Punjab', 'West Bengal',
    'Karnataka', 'Tamil Nadu', 'Telangana', 'Andhra Pradesh', 'Kerala',
    'Odisha', 'Jharkhand', 'Uttarakhand', 'Chhattisgarh', 'Assam'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-gold">Seamless 1-Step Guest Checkout</span>
        <h1 className="font-serif text-3xl font-extrabold text-forest mt-1">Delivery &amp; Payment</h1>
        <p className="text-slate-500 text-xs">No account creation required to place an order</p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-xs font-semibold flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Customer Information & Delivery Address */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Customer Contact */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-gold text-xs flex items-center justify-center font-bold">1</span>
              Customer Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Mobile Number (For Order Tracking) *</label>
                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="10-digit mobile (e.g. 7607033877)"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-forest uppercase mb-1">Email Address (Optional, for invoices)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-gold text-xs flex items-center justify-center font-bold">2</span>
              Shipping &amp; Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">House / Flat / Building No. *</label>
                <input
                  type="text"
                  name="house"
                  value={formData.house}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Flat 402, Shivam Residency"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Street / Colony / Area *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Civil Lines, Near Mandi"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="e.g. Opposite Ayurvedic Dispensary"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">City / Town *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Banda"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-bold focus:outline-none focus:border-gold"
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">6-Digit PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 210001"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-bold focus:outline-none focus:border-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-forest uppercase mb-1">Delivery Instructions (Optional)</label>
                <textarea
                  name="deliveryInstructions"
                  rows={2}
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
                  placeholder="e.g. Leave with neighbor or call before arrival"
                  className="w-full px-4 py-2 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest font-medium focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-gold text-xs flex items-center justify-center font-bold">3</span>
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: Razorpay Online */}
              <label
                className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'razorpay'
                    ? 'border-forest bg-cream-light/60 shadow-sm'
                    : 'border-cream-dark hover:border-forest/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-gold" />
                    <span className="font-bold text-forest text-sm">Online Payment (Razorpay)</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="accent-forest w-4 h-4"
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  UPI (GPay, PhonePe, Paytm), RuPay &amp; Cards, Net Banking. Instant order confirmation.
                </p>
                <div className="flex gap-1.5 text-[9px] font-bold text-slate-400">
                  <span className="bg-white px-2 py-0.5 rounded border border-cream-dark">UPI</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-cream-dark">Cards</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-cream-dark">NetBanking</span>
                </div>
              </label>

              {/* Option 2: Cash on Delivery (COD) */}
              <label
                className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-3 ${
                  paymentMethod === 'cod'
                    ? 'border-forest bg-cream-light/60 shadow-sm'
                    : 'border-cream-dark hover:border-forest/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-5 h-5 text-gold" />
                    <span className="font-bold text-forest text-sm">Cash on Delivery (COD)</span>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-forest w-4 h-4"
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Pay cash directly to the courier executive when your JEEVAN SHAILI parcel is delivered.
                </p>
                <div className="text-[10px] text-emerald-700 font-bold">
                  ✓ Available across all Indian PIN codes
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-forest pb-3 border-b border-cream-dark">
              Order Items ({items.length})
            </h3>

            {/* Items mini list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.productId} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <SafeImage src={resolveImageUrl(it.image)} alt={it.name} className="w-10 h-10 object-contain p-1 bg-cream-light rounded-lg border border-cream-dark" />
                    <div>
                      <p className="font-bold text-forest truncate max-w-[150px]">{it.name}</p>
                      <p className="text-slate-400 text-[10px]">Qty: {it.quantity} • {it.volume}</p>
                    </div>
                  </div>
                  <span className="font-bold text-forest">₹{(it.salePrice || it.price) * it.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-cream-dark space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">₹{subtotal}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Charge</span>
                <span className="font-bold text-slate-800">
                  {shippingCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingCharge}`}
                </span>
              </div>

              <div className="pt-3 border-t border-cream-dark flex justify-between text-base font-extrabold text-forest">
                <span>Final Payable</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-forest hover:bg-forest-dark text-cream font-bold py-4 px-6 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-luxury disabled:opacity-75 disabled:cursor-wait"
            >
              {isSubmitting ? (
                <span>Securing Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-gold" />
                  <span>{paymentMethod === 'cod' ? 'Confirm COD Order' : `Pay ₹${total} via Razorpay`}</span>
                </>
              )}
            </button>

            {/* Safe & Secure Guarantee */}
            <div className="text-[11px] text-slate-500 text-center space-y-1">
              <p className="font-semibold text-forest flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-gold" /> 256-Bit SSL Encrypted Checkout
              </p>
              <p>JEEVAN SHAILI PVT. LTD., Bangalipura, Banda, Uttar Pradesh</p>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
