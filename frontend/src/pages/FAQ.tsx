import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Jeevan Shaili Ayurvedic Dant Manjan?',
      a: 'Jeevan Shaili Ayurvedic Dant Manjan is a herbal tooth powder inspired by traditional Ayurvedic oral care practices. Use it according to the product packaging.'
    },
    {
      q: 'How do I use Dant Manjan properly?',
      a: 'Use Jeevan Shaili Ayurvedic Dant Manjan according to the instructions on the product packaging.'
    },
    {
      q: 'Can I use Dant Manjan every day?',
      a: 'Follow the usage guidance printed on the product packaging and consult a qualified dental professional for individual concerns.'
    },
    {
      q: 'Do I need to create an account to order?',
      a: 'No. JEEVAN SHAILI provides guest checkout. You can place an order by providing your shipping address and contact number.'
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
      q: 'Where is JEEVAN SHAILI based?',
      a: 'JEEVAN SHAILI PVT. LTD. is based in Bangalipura, Banda, Uttar Pradesh - 210001, India.'
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
          Everything you need to know about JEEVAN SHAILI Ayurvedic Dant Manjan and ordering.
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
