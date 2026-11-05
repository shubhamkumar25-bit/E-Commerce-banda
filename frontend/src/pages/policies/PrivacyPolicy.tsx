import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-extrabold text-forest">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="bg-white p-8 rounded-3xl border border-cream-dark text-slate-700 text-sm space-y-4 leading-relaxed">
        <h2 className="font-serif font-bold text-lg text-forest">1. Introduction</h2>
        <p>
          At JEEVAN SHAILI PVT. LTD. (Banda, Uttar Pradesh, India), we respect your privacy. This policy outlines how we collect, handle, and protect your information when you visit our website or purchase our Ayurvedic Dant Manjan.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">2. Information We Collect</h2>
        <p>
          We collect personal details necessary to fulfill your orders, including customer name, mobile phone number, delivery address, and email address. For guest checkouts, these details are used solely to deliver your package and provide tracking updates.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">3. Payment Security</h2>
        <p>
          We do NOT store your credit card numbers, debit card details, or UPI PINs on our servers. All online transactions are processed through Razorpay's secure, RBI-compliant payment gateway.
        </p>

        <h2 className="font-serif font-bold text-lg text-forest">4. Contact Information</h2>
        <p>
          For privacy inquiries, please contact: <br />
          Email: <a href="mailto:jeevanshailipvtltd@gmail.com" className="text-forest font-bold">jeevanshailipvtltd@gmail.com</a><br />
          Phone: +91 7607033877<br />
          Banda, Uttar Pradesh - 210001, India.
        </p>
      </div>
    </div>
  );
};
