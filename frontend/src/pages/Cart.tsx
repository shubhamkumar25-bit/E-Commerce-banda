import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from '../components/common/SafeImage';
import { resolveImageUrl } from '../services/api';

export const Cart: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingCharge,
    freeShippingThreshold,
    appliedCoupon,
    couponDiscount,
    total,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const navigate = useNavigate();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    setCouponLoading(true);
    setCouponMsg(null);
    const res = await applyCoupon(couponCodeInput.trim());
    setCouponLoading(false);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) {
      setCouponCodeInput('');
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-cream flex items-center justify-center text-forest">
          <ShoppingBag className="w-10 h-10 text-gold" />
        </div>
        <h2 className="font-serif text-3xl font-extrabold text-forest">Your Cart is Empty</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Explore Jeevan Shaili Ayurvedic Dant Manjan, crafted with care in Banda, Uttar Pradesh.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-cream font-bold px-8 py-3.5 rounded-full text-xs tracking-wider uppercase transition shadow-luxury"
        >
          <span>Explore Ayurvedic Products</span>
          <ArrowRight className="w-4 h-4 text-gold" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-forest">Your Shopping Cart</h1>
        <p className="text-slate-500 text-xs mt-1">Review your Ayurvedic oral care selection</p>
      </div>

      {/* Free Shipping Progress Notification */}
      <div className="bg-cream p-4 rounded-2xl border border-cream-dark">
        <div className="flex items-center justify-between text-xs font-bold text-forest mb-2">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-gold" />
            {amountNeededForFreeShipping > 0
              ? `Add ₹${amountNeededForFreeShipping} more to qualify for FREE Shipping!`
              : '🎉 You have unlocked FREE Shipping on this order!'}
          </span>
          <span>{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full bg-cream-dark h-2 rounded-full overflow-hidden">
          <div
            className="bg-forest h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 shadow-sm space-y-6">
          <div className="divide-y divide-cream-dark">
            {items.map((item) => {
              const itemPrice = item.salePrice || item.price;
              return (
                <div key={item.productId} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <SafeImage
                      src={resolveImageUrl(item.image)}
                      alt={item.name}
                      className="w-20 h-20 object-contain p-2 bg-cream-light rounded-2xl border border-cream-dark shrink-0"
                    />
                    <div>
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="font-serif font-bold text-forest text-sm hover:text-gold-dark transition line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5">Vol: {item.volume}</p>
                      <p className="text-xs font-extrabold text-forest mt-1">₹{itemPrice}</p>
                    </div>
                  </div>

                  {/* Quantity & Controls */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="flex items-center border border-cream-dark rounded-xl bg-cream-light px-2.5 py-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-slate-600 hover:text-forest"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-forest">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center font-bold text-slate-600 hover:text-forest"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-bold text-forest text-sm">₹{itemPrice * item.quantity}</p>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-slate-400 hover:text-red-600 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-cream-dark flex items-center justify-between text-xs">
            <Link to="/shop" className="text-forest font-bold hover:underline flex items-center gap-1">
              ← Continue Shopping
            </Link>
            <span className="text-slate-400">Prices inclusive of GST</span>
          </div>
        </div>

        {/* Right: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-cream-dark p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-forest pb-3 border-b border-cream-dark">
              Order Summary
            </h3>

            {/* Subtotal, Shipping, Discount breakdown */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-bold text-slate-800">₹{subtotal}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span className="font-bold text-slate-800">
                  {shippingCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingCharge}`}
                </span>
              </div>

              <div className="pt-3 border-t border-cream-dark flex justify-between text-base font-extrabold text-forest">
                <span>Total Payable</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Coupon Box */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">Discount Coupon</label>
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                    <p className="text-[10px] text-emerald-600">Saved ₹{couponDiscount}</p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 font-bold hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g. AYURVEDA50)"
                    className="flex-1 px-3 py-2 text-xs bg-cream-light rounded-xl border border-cream-dark font-bold uppercase focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="bg-forest text-cream font-bold px-4 py-2 rounded-xl text-xs uppercase hover:bg-forest-dark transition"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </form>
              )}

              {couponMsg && (
                <p className={`text-[11px] font-semibold mt-2 ${couponMsg.success ? 'text-emerald-700' : 'text-red-600'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-forest hover:bg-forest-dark text-cream font-bold py-4 px-6 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-luxury"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>

            {/* Trust badges */}
            <div className="pt-2 space-y-2 text-[11px] text-slate-500 border-t border-cream-dark">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Guest Checkout – No Account Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold" />
                <span>Dispatched Directly from Banda, Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
