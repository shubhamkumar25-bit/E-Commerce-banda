import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Droplets, Leaf, HeartHandshake, MapPin, Phone, Mail, Award } from 'lucide-react';
import { SITE } from '../config/site';

export const AboutUs: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest to-forest-dark text-cream p-8 sm:p-16 rounded-3xl relative overflow-hidden shadow-luxury">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">About JEEVAN SHAILI</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Traditional Ayurvedic Oral Care for Everyday Life
            </h1>
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
              Rooted in Banda, Uttar Pradesh, JEEVAN SHAILI PVT. LTD. presents Ayurvedic Dant Manjan inspired by traditional oral care practices.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-cream-dark shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
              <Leaf className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To make traditional Ayurvedic-inspired oral care part of everyday routines with clear, honest product information.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-cream-dark shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver transparent product information and dependable service from Banda, Uttar Pradesh.
            </p>
          </div>

        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-cream py-16 border-y border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Our Guiding Pillars</span>
            <h2 className="font-serif text-3xl font-extrabold text-forest">The JEEVAN SHAILI Commitment</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-cream-dark space-y-3">
              <Droplets className="w-8 h-8 text-gold" />
              <h4 className="font-bold text-forest text-base">Ayurvedic Dant Manjan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A herbal tooth powder inspired by traditional Ayurvedic oral care.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream-dark space-y-3">
              <Leaf className="w-8 h-8 text-gold" />
              <h4 className="font-bold text-forest text-base">Classical Botanicals</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Display actual ingredients according to the product packaging.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream-dark space-y-3">
              <Award className="w-8 h-8 text-gold" />
              <h4 className="font-bold text-forest text-base">Full Transparency</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear product information without unsupported claims.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-cream-dark space-y-3">
              <MapPin className="w-8 h-8 text-gold" />
              <h4 className="font-bold text-forest text-base">Banda, UP Heritage</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bottled and packaged in Banda, connecting ancient regional wisdom with modern clean standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Location & Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-cream-dark shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-gold shrink-0 mt-1" />
            <div>
              <h4 className="font-serif font-bold text-forest text-base">Headquarters &amp; Hub</h4>
              <p className="text-xs text-slate-600 mt-1">
                Founded by {SITE.founder}.<br />
                Website developed by {SITE.developer}.<br />
                {SITE.companyName}<br />
                {SITE.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-8 h-8 text-gold shrink-0 mt-1" />
            <div>
              <h4 className="font-serif font-bold text-forest text-base">Customer Helpline</h4>
              <p className="text-xs text-slate-600 mt-1">
                Direct Phone / WhatsApp:<br />
                <a href={`tel:${SITE.phone}`} className="font-bold text-forest hover:text-gold transition">
                  {SITE.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-gold shrink-0 mt-1" />
            <div>
              <h4 className="font-serif font-bold text-forest text-base">Email Enquiries</h4>
              <p className="text-xs text-slate-600 mt-1">
                Official Support:<br />
                <a href={`mailto:${SITE.email}`} className="font-bold text-forest hover:text-gold transition break-all">
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
