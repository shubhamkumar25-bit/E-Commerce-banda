import React, { useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package, Phone, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE } from '../config/site';

export const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const mobile = searchParams.get('mobile') || '';

  useEffect(() => {
    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#174D35', '#C7A45B', '#F8F4E9', '#2E7D4E']
      });
    } catch {}
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      
      {/* Success Icon */}
      <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      {/* Confirmation text */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
          Thank You for Choosing JEEVAN SHAILI!
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
          Your order for Jeevan Shaili Ayurvedic Dant Manjan has been registered with our Banda, UP team.
        </p>
      </div>

      {/* Order ID Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-dark shadow-sm space-y-4 max-w-md mx-auto">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Your Order Reference ID</p>
        <p className="font-mono text-2xl font-extrabold text-forest tracking-wider bg-cream-light py-2 px-4 rounded-xl border border-cream-dark inline-block">
          {orderId || 'GWS-ORDER'}
        </p>
        <p className="text-xs text-slate-500">
          Keep this Order ID safe. You can track live parcel dispatch using your Order ID and registered mobile number.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          to={`/track-order?orderId=${encodeURIComponent(orderId || '')}&mobile=${encodeURIComponent(mobile)}`}
          className="w-full sm:w-auto bg-forest hover:bg-forest-dark text-cream font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-luxury flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4 text-gold" />
          <span>Track Order Status</span>
        </Link>

        <Link
          to="/shop"
          className="w-full sm:w-auto bg-cream border-2 border-forest/30 hover:border-forest text-forest font-bold px-7 py-3 rounded-full text-xs uppercase tracking-wider transition flex items-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Support Strip */}
      <div className="pt-8 border-t border-cream-dark text-xs text-slate-500 space-y-2">
        <p className="font-bold text-forest">Need assistance with your delivery?</p>
        <div className="flex items-center justify-center gap-6">
          <a href={`tel:${SITE.phone}`} className="hover:text-gold transition flex items-center gap-1 font-semibold">
            <Phone className="w-3.5 h-3.5 text-gold" /> {SITE.phoneDisplay}
          </a>
          <span>•</span>
          <a href={`mailto:${SITE.email}`} className="hover:text-gold transition flex items-center gap-1 font-semibold">
            <Mail className="w-3.5 h-3.5 text-gold" /> {SITE.email}
          </a>
        </div>
      </div>

    </div>
  );
};
