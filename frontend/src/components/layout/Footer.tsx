import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import { SITE } from '../../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-dark text-cream pt-16 pb-8 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-cream/15">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/jeevan-shaili-logo.png" alt="JEEVAN SHAILI Logo" className="w-12 h-12 object-contain" />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white">
                  JEEVAN SHAILI
                </span>
                <p className="text-[10px] font-semibold tracking-widest text-gold uppercase">
                  Ayurvedic Oral Care
                </p>
              </div>
            </Link>
            
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed">
              {SITE.tagline}
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-wider text-gold font-bold mb-3">Connect With Us</h5>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:bg-gold hover:text-forest transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-cream hover:bg-gold hover:text-forest transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
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
                <Link to="/shop?category=ayurvedic-oral-care" className="hover:text-gold transition flex items-center gap-2">
                <span>›</span> Ayurvedic Dant Manjan
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
                  <p className="font-semibold text-white">{SITE.companyName}</p>
                  <p className="text-cream/70 text-xs">{SITE.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <p className="text-xs text-cream/60">Phone Support:</p>
                  <a href={`tel:${SITE.phone}`} className="font-semibold text-white hover:text-gold transition">
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <p className="text-xs text-cream/60">Email Inquiries:</p>
                  <a href={`mailto:${SITE.email}`} className="font-semibold text-white hover:text-gold transition break-all">
                    {SITE.email}
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

        {/* Bottom Section: Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cream/70">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 {SITE.companyName} All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Founded by Pushpendra Kumar Rajpoot | Developed by {SITE.developer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
