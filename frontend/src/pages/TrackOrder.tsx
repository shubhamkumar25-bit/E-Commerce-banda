import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Clock, CheckCircle2, Truck, AlertCircle, MapPin } from 'lucide-react';
import { api } from '../services/api';
import { Order } from '../types';

export const TrackOrder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [mobile, setMobile] = useState(searchParams.get('mobile') || '');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('orderId') && searchParams.get('mobile')) {
      handleTrack(undefined, searchParams.get('orderId')!, searchParams.get('mobile')!);
    }
  }, [searchParams]);

  const handleTrack = async (e?: React.FormEvent, oId = orderId, mob = mobile) => {
    if (e) e.preventDefault();
    setError(null);
    setOrder(null);

    if (!oId.trim() || !mob.trim()) {
      setError('Please provide both Order Reference ID and your 10-digit registered Mobile Number.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.trackOrder(oId.trim(), mob.trim());
      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'No order found matching this combination. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'placed', label: 'Order Placed' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getStepIndex = (status: string) => {
    const idx = steps.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">Real-Time Dispatch Tracking</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
          Track My Order
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          Enter your Order ID (e.g. GWS-...) and registered mobile number to view live transit updates from our Banda hub.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-dark shadow-sm">
        <form onSubmit={(e) => handleTrack(e)} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-forest uppercase mb-1">Order Reference ID</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.toUpperCase())}
              placeholder="e.g. GWS-261031-1234"
              required
              className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs font-mono font-bold text-forest uppercase focus:outline-none focus:border-gold"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-bold text-forest uppercase mb-1">Registered Mobile Number</label>
            <input
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile"
              required
              className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs font-medium text-forest focus:outline-none focus:border-gold"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest hover:bg-forest-dark text-cream font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-gold" />
              <span>{loading ? 'Searching...' : 'Track Parcel'}</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Order Status Display */}
      {order && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-cream-dark shadow-sm space-y-8 animate-fadeIn">
          
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cream-dark">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Order ID</span>
              <h2 className="font-mono text-xl font-extrabold text-forest">{order.orderId}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                order.paymentStatus === 'paid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                Payment: {order.paymentStatus} ({order.paymentMethod.toUpperCase()})
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div>
            <h3 className="font-serif font-bold text-sm text-forest uppercase tracking-wider mb-6">
              Live Order Journey
            </h3>

            <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
              {/* Connector Bar */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-cream-dark z-0" />
              <div
                className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-forest transition-all duration-500 z-0"
                style={{ width: `${(getStepIndex(order.orderStatus) / (steps.length - 1)) * 100}%` }}
              />

              {/* Steps */}
              {steps.map((st, idx) => {
                const currentIdx = getStepIndex(order.orderStatus);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={st.key} className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition shadow ${
                      isPassed ? 'bg-forest text-gold' : 'bg-white text-slate-400 border border-cream-dark'
                    }`}>
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold mt-2 whitespace-nowrap text-center ${
                      isCurrent ? 'text-forest font-extrabold' : isPassed ? 'text-forest/80' : 'text-slate-400'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier & Transit Details */}
          {(order.trackingNumber || order.courierName) && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="font-bold text-slate-500 text-[10px] uppercase">Courier Partner</p>
                <p className="font-extrabold text-forest">{order.courierName || 'Standard Express'}</p>
              </div>
              <div>
                <p className="font-bold text-slate-500 text-[10px] uppercase">Tracking / AWB Number</p>
                <p className="font-mono font-extrabold text-forest">{order.trackingNumber}</p>
              </div>
            </div>
          )}

          {/* Ordered Products */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-forest uppercase tracking-wider">
              Items in this Package
            </h4>
            <div className="divide-y divide-cream-dark border-t border-b border-cream-dark">
              {order.items.map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain p-1 bg-cream-light rounded-xl border border-cream-dark" />
                    <div>
                      <p className="font-bold text-forest">{item.name}</p>
                      <p className="text-slate-400 text-[11px]">Qty: {item.quantity} • {item.volume}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-forest">₹{(item.salePrice || item.price) * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-4 bg-cream-light rounded-2xl border border-cream-dark text-xs space-y-1">
            <p className="font-bold text-forest uppercase text-[10px] tracking-wider">Delivery Destination</p>
            <p className="font-semibold text-slate-800">{order.customer.name} ({order.customer.mobile})</p>
            <p className="text-slate-600">
              {order.shippingAddress.house}, {order.shippingAddress.street}, {order.shippingAddress.landmark ? `${order.shippingAddress.landmark}, ` : ''}{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};

