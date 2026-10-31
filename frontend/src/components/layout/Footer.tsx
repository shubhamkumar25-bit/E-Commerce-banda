import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-dark text-cream pt-16 pb-8 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cream/15">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo-icon.svg" alt="GIWANSALLY Logo" className="w-12 h-12" />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white">
                  GIWANSALLY
                </span>
                <p className="text-[10px] font-semibold tracking-widest text-gold uppercase">
                  Ayurvedic Oral Care
                </p>
              </div>
            </Link>
            
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed">
              GIWANSALLY brings a modern breakthrough to Indian oral health with pure Liquid Manjan. Handcrafted from authentic botanicals in Banda, Uttar Pradesh, to protect tooth enamel and revitalize gums naturally.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Connect With Us</h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/giwansally"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:bg-gold hover:text-forest transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com/giwansally"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:bg-gold hover:text-forest transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com/@giwansally"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:bg-gold hover:text-forest transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gold/40 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link to="/" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=ayurvedic-liquid-manjan" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Ayurvedic Liquid Manjan
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Our Story &amp; Vision
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Ayurvedic Health Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support & Policies */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gold/40 pb-2 inline-block">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li>
                <Link to="/track-order" className="hover:text-gold font-semibold text-white transition flex items-center gap-2">
                  <span>›</span> 🔍 Track My Order
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/refund" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/privacy" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/terms" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold transition flex items-center gap-2">
                  <span>›</span> Frequently Asked Questions (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-gold/40 pb-2 inline-block">
              Contact Us
            </h4>
            <div className="space-y-3.5 text-sm text-cream/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">GIWANSALLY Herbals</p>
                  <p className="text-cream/70 text-xs">Banda, Uttar Pradesh - 210001, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <p className="text-xs text-cream/60">Phone Support:</p>
                  <a href="tel:8840091758" className="font-semibold text-white hover:text-gold transition">
                    +91 8840091758
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <p className="text-xs text-cream/60">Email Inquiries:</p>
                  <a href="mailto:shubhamcoder@gmail.com" className="font-semibold text-white hover:text-gold transition break-all">
                    shubhamcoder@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <div className="inline-flex items-center gap-2 bg-forest/80 px-3 py-1.5 rounded-full text-xs text-cream/90 border border-gold/30">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>100% Genuine Ayurvedic Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cream/70">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} GIWANSALLY. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Crafted with <Heart className="w-3 h-3 text-red-400 inline mx-0.5" /> in Banda, Uttar Pradesh, India</span>
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center flex-wrap justify-center gap-2">
            <span className="text-[11px] font-semibold text-cream/80 mr-1">Secured By:</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-cream border border-white/10">UPI</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-cream border border-white/10">Google Pay</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-cream border border-white/10">PhonePe</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-cream border border-white/10">Paytm</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-cream border border-white/10">RuPay</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold text-cream border border-white/10">Cards / NetBanking</span>
            <span className="px-2.5 py-1 bg-gold/20 text-gold rounded text-[10px] font-bold border border-gold/40">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

