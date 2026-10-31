import React from 'react';
import { Leaf, ShieldCheck, Droplets, Award } from 'lucide-react';

interface BotanicalBadgeProps {
  type: 'herbal' | 'liquid' | 'origin' | 'ayurvedic';
  text?: string;
}

export const BotanicalBadge: React.FC<BotanicalBadgeProps> = ({ type, text }) => {
  const configs = {
    herbal: {
      icon: Leaf,
      label: text || '100% Herbal Botanicals',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    liquid: {
      icon: Droplets,
      label: text || 'Zero-Abrasion Liquid Formulation',
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    origin: {
      icon: Award,
      label: text || 'Formulated in Banda, UP',
      color: 'bg-forest/10 text-forest border-forest/20'
    },
    ayurvedic: {
      icon: ShieldCheck,
      label: text || 'Authentic Charaka Formulation',
      color: 'bg-gold/15 text-gold-dark border-gold/30'
    }
  };

  const { icon: Icon, label, color } = configs[type] || configs.herbal;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </span>
  );
};

