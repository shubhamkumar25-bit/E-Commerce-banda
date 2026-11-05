import React from 'react';
import { Sparkles, Truck, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-forest-dark text-cream py-2 px-4 text-xs font-medium border-b border-gold/20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span>
            🌿 JEEVAN SHAILI Ayurvedic Dant Manjan from <strong className="text-gold">Banda, UP</strong>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-cream/80 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-gold" /> Free Delivery on Orders ₹499+
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" /> Cash on Delivery Available
          </span>
        </div>
      </div>
    </div>
  );
};
