import React from 'react';

export const ReturnPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-forest">Return &amp; Refund Policy</h1>
      <p className="text-xs text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="bg-white p-8 rounded-3xl border border-cream-dark text-slate-700 text-sm space-y-4 leading-relaxed">
        <h2 className="font-serif font-bold text-lg text-forest">1. Hygiene &amp; Oral Care Standards</h2>
        <p>
          Due to the hygienic nature of Ayurvedic oral care products, opened or unsealed products cannot be accepted for return or resale once delivered.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">2. Damaged or Defective Items</h2>
        <p>
          If your package arrives damaged, please notify our customer care team within <strong>48 hours of delivery</strong> via phone (+91 7607033877) or email (jeevanshailipvtltd@gmail.com) along with a photo of the received parcel.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">3. Replacement / Refund Process</h2>
        <p>
          Upon verification of transit damage or wrong item shipment, we will immediately initiate a free replacement or issue a full refund to your original payment method within 5 to 7 business days. For COD orders, refunds can be transferred via UPI or bank NEFT.
        </p>
      </div>
    </div>
  );
};
