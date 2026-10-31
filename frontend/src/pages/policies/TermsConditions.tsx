import React from 'react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-forest">Terms &amp; Conditions</h1>
      <p className="text-xs text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="bg-white p-8 rounded-3xl border border-cream-dark text-slate-700 text-sm space-y-4 leading-relaxed">
        <h2 className="font-serif font-bold text-lg text-forest">1. Agreement to Terms</h2>
        <p>
          By accessing or using the GIWANSALLY e-commerce website, you agree to comply with and be bound by these Terms and Conditions. Our operations originate from Banda, Uttar Pradesh, India.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">2. Product Information &amp; Disclaimer</h2>
        <p>
          GIWANSALLY Liquid Manjan is an authentic Ayurvedic formulation intended for oral hygiene and gum maintenance. It is not intended to diagnose, cure, or substitute licensed medical dental treatments.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">3. Pricing and Availability</h2>
        <p>
          All product prices are quoted in Indian Rupees (INR) and are inclusive of relevant GST. We reserve the right to revise product prices and promotional discounts at any time without prior notice.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">4. Jurisdiction</h2>
        <p>
          Any disputes arising out of the purchase or use of products from this website shall be subject to the exclusive jurisdiction of the competent courts in Banda, Uttar Pradesh, India.
        </p>
      </div>
    </div>
  );
};

