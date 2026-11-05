import React, { useState } from 'react';
import { Mail, Sparkles, Check } from 'lucide-react';
import { api } from '../../services/api';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ loading: boolean; success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await api.subscribeNewsletter(email);
      setStatus({
        loading: false,
        success: true,
        message: res.message || 'Thank you for subscribing to JEEVAN SHAILI wellness updates!'
      });
      setEmail('');
    } catch (err: any) {
      setStatus({
        loading: false,
        success: false,
        message: err.message || 'Subscription failed. Please try again.'
      });
    }
  };

  return (
    <section className="bg-gradient-to-r from-forest-dark via-forest to-forest-dark text-cream py-16 px-4 relative overflow-hidden">
      {/* Decorative Golden Botanical Elements */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-gold/40">
          <Sparkles className="w-3.5 h-3.5" /> Ayurvedic Oral Wellness Circle
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-wide text-white mb-3">
          Join the JEEVAN SHAILI Oral Care Community
        </h2>

        <p className="text-cream/80 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
          Receive exclusive Ayurvedic dental hygiene guides, research articles on ancient herbs from Banda, and secret early-bird discounts.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-dark/60" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full pl-10 pr-4 py-3 bg-cream text-forest text-sm rounded-full border border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={status?.loading}
            className="bg-gold hover:bg-gold-light text-forest-dark font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-full transition shadow-luxury-gold flex items-center justify-center gap-1.5"
          >
            {status?.loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status?.message && (
          <div className={`mt-4 text-xs font-semibold max-w-md mx-auto p-2.5 rounded-lg flex items-center justify-center gap-2 ${
            status.success ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500/40' : 'bg-red-900/60 text-red-200 border border-red-500/40'
          }`}>
            {status.success && <Check className="w-4 h-4 text-emerald-400" />}
            <span>{status.message}</span>
          </div>
        )}
      </div>
    </section>
  );
};
