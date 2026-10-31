import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await api.sendContactMessage(formData);
      setStatus({ success: true, text: res.message || 'Message sent successfully! Our team will contact you shortly.' });
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus({ success: false, text: err.message || 'Failed to send message. Please try calling directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
          We Are Here For You
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-forest">
          Get in Touch with GIWANSALLY
        </h1>
        <p className="text-slate-600 text-sm">
          Have questions about Liquid Manjan, bulk orders, or your delivery? Reach our dedicated herbal care desk in Banda, Uttar Pradesh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-forest text-cream p-8 rounded-3xl shadow-luxury space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-cream/20 pb-3">
              Direct Contact Details
            </h3>

            <div className="space-y-5 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Manufacturing &amp; Office</p>
                  <p className="text-cream/80 text-xs mt-0.5">
                    GIWANSALLY Herbals<br />
                    Banda, Uttar Pradesh - 210001<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Phone / WhatsApp</p>
                  <a href="tel:8840091758" className="text-gold font-bold hover:underline block mt-0.5">
                    +91 8840091758
                  </a>
                  <p className="text-[11px] text-cream/60">Mon - Sat: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-sm">Email Address</p>
                  <a href="mailto:shubhamcoder@gmail.com" className="text-gold font-bold hover:underline block mt-0.5 break-all">
                    shubhamcoder@gmail.com
                  </a>
                  <p className="text-[11px] text-cream/60">Average reply within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-cream/20">
              <p className="text-xs text-cream/70 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                100% Customer Satisfaction Guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-cream-dark shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-forest mb-6">Send Us a Direct Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anjali Verma"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="e.g. 8840091758"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Order Inquiry / Bulk Order"
                  className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-forest uppercase mb-1">Your Message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
                className="w-full px-4 py-2.5 bg-cream-light rounded-xl border border-cream-dark text-xs text-forest focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-forest hover:bg-forest-dark text-cream font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-gold" />
              <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>

          {status && (
            <div className={`mt-4 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              status.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {status.success && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              <span>{status.text}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

