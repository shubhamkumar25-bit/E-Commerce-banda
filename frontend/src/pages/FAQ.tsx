import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is GIWANSALLY Ayurvedic Liquid Manjan?',
      a: 'GIWANSALLY Liquid Manjan is an innovative Ayurvedic oral formulation. Unlike traditional abrasive tooth powders or synthetic chemical toothpastes, our formula extracts the active therapeutic benefits of Clove, Babool, Bakul, and Majuphal into a fluid form that gently cleanses teeth and tightens gums without causing enamel micro-abrasion.'
    },
    {
      q: 'How do I use Liquid Manjan properly?',
      a: 'Place 5 to 8 drops directly in your mouth or onto a soft-bristled toothbrush. Gently massage your gums and teeth for 2 to 3 minutes, allowing the herbal extracts to penetrate interdental gaps. Spit out and rinse with fresh water. For best results, use morning and evening.'
    },
    {
      q: 'Is GIWANSALLY Liquid Manjan safe for daily use?',
      a: 'Yes, 100%. Because our formula contains no harsh abrasives (like chalk or ash) and no synthetic foaming surfactants (SLS-free), it is gentle enough for everyday, lifelong use.'
    },
    {
      q: 'Do I need to create an account to order?',
      a: 'No! GIWANSALLY provides a seamless 1-step Guest Checkout. You can place your order by providing your shipping address and contact number without creating a password.'
    },
    {
      q: 'What payment options are available?',
      a: 'We accept Cash on Delivery (COD) across all serviceable Indian PIN codes, as well as online payments via Razorpay supporting UPI (Google Pay, PhonePe, Paytm), RuPay cards, Visa, Mastercard, and Net Banking.'
    },
    {
      q: 'How long does delivery take from Banda, Uttar Pradesh?',
      a: 'Orders within Uttar Pradesh are typically delivered within 2-3 business days. Orders to other states in India take 4-5 business days. You can track your parcel live on our Track My Order page.'
    },
    {
      q: 'Where is GIWANSALLY manufactured?',
      a: 'GIWANSALLY products are formulated, bottled, and dispatched from Banda, Uttar Pradesh, India.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
          Got Questions?
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Everything you need to know about GIWANSALLY Liquid Manjan and ordering.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-cream-dark overflow-hidden transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-forest text-sm sm:text-base hover:text-gold-dark transition"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-cream-light pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

