import React from 'react';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-forest">Shipping &amp; Delivery Policy</h1>
      <p className="text-xs text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="bg-white p-8 rounded-3xl border border-cream-dark text-slate-700 text-sm space-y-4 leading-relaxed">
        <h2 className="font-serif font-bold text-lg text-forest">1. Dispatch Hub</h2>
        <p>
          All GIWANSALLY products are carefully checked, packed, and dispatched directly from our packaging center located in <strong>Banda, Uttar Pradesh, India</strong>.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">2. Processing Time</h2>
        <p>
          Orders placed before 3:00 PM are processed and handed over to our courier partners within 24 hours (excluding Sundays and national holidays).
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">3. Estimated Delivery Times</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Uttar Pradesh:</strong> 2 to 3 Business Days</li>
          <li><strong>Rest of India:</strong> 4 to 5 Business Days</li>
        </ul>

        <h2 className="font-serif font-bold text-lg text-forest">4. Shipping Charges</h2>
        <p>
          We offer <strong>FREE Shipping</strong> on all prepaid and COD orders with a cart value of ₹499 or above. Orders below ₹499 incur a nominal standard delivery charge of ₹49.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">5. Order Tracking</h2>
        <p>
          As soon as your parcel is shipped, you will receive courier updates. You can also track your order directly on our website using your Order Reference ID and registered mobile number.
        </p>
      </div>
    </div>
  );
};

