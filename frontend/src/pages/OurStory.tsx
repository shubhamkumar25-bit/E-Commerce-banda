import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Droplets, Leaf, ShieldCheck, Heart } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 px-3.5 py-1 rounded-full border border-gold/30">
          Our Brand Journey
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-forest tracking-tight">
          The Story Behind JEEVAN SHAILI
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          How JEEVAN SHAILI PVT. LTD. brings Ayurvedic-inspired Dant Manjan from Banda, Uttar Pradesh to everyday oral care.
        </p>
      </section>

      {/* Main Narrative Article */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-14 rounded-3xl border border-cream-dark shadow-sm space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-forest">The Problem with Abrasive Dental Cleansing</h2>
            <p>
              For generations in Indian households, Dant Manjan (traditional tooth powder) was revered for its extraordinary botanical ingredients — Babool, Clove, Bakul, and Neem. However, dry powders suffer from a significant biological drawback: friction.
            </p>
            <p>
              When applied with a toothbrush or vigorous fingertip brushing, abrasive particles of chalk, ash, or ground shells can progressively wear down delicate tooth enamel and recede sensitive gingival tissue. At the same time, modern commercial pastes often contain artificial surfactants like Sodium Lauryl Sulfate (SLS), saccharin, and synthetic dyes that disturb the natural oral microbiome.
            </p>
          </div>

          <div className="p-6 bg-cream rounded-2xl border-l-4 border-gold space-y-2">
            <h3 className="font-serif font-bold text-forest text-lg">The JEEVAN SHAILI Vision</h3>
            <p className="italic text-slate-700 text-sm">
              "What if the therapeutic essence of traditional Ayurvedic dant-manjan herbs could be delivered in an unctuous, non-abrasive liquid medium? A formulation that cleanses gently, penetrates deep between teeth, and protects enamel instead of scratching it."
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-forest">Born in Banda, Uttar Pradesh</h2>
            <p>
              Based in Banda, Uttar Pradesh, JEEVAN SHAILI PVT. LTD. is committed to transparent, packaging-led Ayurvedic oral care.
            </p>
            <p>
              The product is <strong>Jeevan Shaili Ayurvedic Dant Manjan</strong>, a herbal tooth powder. Use it according to the instructions and information on the product packaging.
            </p>
          </div>

          <div className="pt-6 border-t border-cream-dark flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif font-bold text-forest text-base">Explore Ayurvedic Dant Manjan</p>
              <p className="text-xs text-slate-500">From JEEVAN SHAILI PVT. LTD., Banda, Uttar Pradesh</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-dark text-cream font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition shadow"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
