import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Leaf,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  Truck,
  RotateCcw,
  Star
} from 'lucide-react';
import { api } from '../services/api';
import { Product, Blog } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { RatingStars } from '../components/common/RatingStars';
import { Newsletter } from '../components/common/Newsletter';
import { SafeImage } from '../components/common/SafeImage';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getProducts({ featured: 'true', limit: '4' }),
      api.getBlogs({ limit: '3' })
    ]).then(([prodData, blogData]) => {
      setFeaturedProducts(prodData.products || []);
      setRecentBlogs(blogData.blogs || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream-light to-white pt-8 pb-16 lg:py-20 border-b border-cream-dark">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-forest/10 border border-forest/20 text-forest px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Traditional Ayurvedic Oral Care • Banda, UP</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-forest tracking-tight leading-[1.15]">
                Traditional Ayurvedic Wisdom, <br className="hidden sm:inline" />
                <span className="text-gold-dark italic">Jeevan Shaili Dant Manjan.</span>
              </h1>

              <p className="text-slate-700 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Jeevan Shaili Ayurvedic Dant Manjan is inspired by traditional Ayurvedic oral care practices. Make it part of your daily oral care routine according to the product packaging instructions.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-forest hover:bg-forest-dark text-cream font-bold px-8 py-4 rounded-full text-sm tracking-wider uppercase transition shadow-luxury flex items-center justify-center gap-2 group"
                >
                  <span>Shop Dant Manjan</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/our-story"
                  className="w-full sm:w-auto bg-cream border-2 border-forest/30 hover:border-forest text-forest font-bold px-7 py-3.5 rounded-full text-sm tracking-wider uppercase transition flex items-center justify-center"
                >
                  Explore Brand Story
                </Link>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-cream-dark/80 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest shrink-0">
                    <Leaf className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-forest">Herbal Tooth Powder</h5>
                    <p className="text-[11px] text-slate-500">Traditional oral care</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest shrink-0">
                    <Leaf className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-forest">Pure Herbs</h5>
                    <p className="text-[11px] text-slate-500">No SLS or Chemicals</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest shrink-0">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-forest">Banda, UP</h5>
                    <p className="text-[11px] text-slate-500">Direct From Source</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Product Hero Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* Golden Sunburst Backdrop */}
                <div className="absolute inset-4 bg-gradient-to-tr from-gold/20 via-cream to-forest/10 rounded-full blur-xl" />
                
                <SafeImage
                  src="/images/products/jeevan-shaili-dant-manjan.jpg"
                  alt="Jeevan Shaili Ayurvedic Dant Manjan product jars"
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Badge 1: Banda Origin */}
                <div className="absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-luxury border border-cream-dark z-20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-gold font-bold text-xs">
                    JS
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Ayurvedic Formulation</p>
                    <p className="text-xs font-extrabold text-forest">Made in Banda, UP</p>
                  </div>
                </div>

                {/* Floating Badge 2: Certified Rating */}
                <div className="absolute top-4 -right-2 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-luxury border border-cream-dark z-20 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <div>
                    <p className="text-xs font-bold text-forest">4.9 / 5.0 Rating</p>
                    <p className="text-[10px] text-slate-500">From 100+ Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VALUE STRIP: DELIVERY & BRAND PROMISES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-cream-dark shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0">
              <Truck className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest">Free India Shipping</h4>
              <p className="text-xs text-slate-500">On all orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest">Cash on Delivery</h4>
              <p className="text-xs text-slate-500">Pay when your order arrives</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0">
              <Droplets className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest">Jeevan Shaili Dant Manjan</h4>
              <p className="text-xs text-slate-500">Mess-free dropper precision</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest shrink-0">
              <RotateCcw className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-forest">Verified Customer Support</h4>
              <p className="text-xs text-slate-500">Direct phone &amp; email helpline</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Handpicked For You</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-forest tracking-tight mt-1">
              Featured Ayurvedic Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-forest font-bold text-sm hover:text-gold transition group"
          >
            <span>View All Collections</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE JEEVAN SHAILI & PRODUCT TRANSPARENCY */}
      <section className="bg-cream py-16 sm:py-20 border-y border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Rooted in Ayurveda, Proven in Nature</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
              Traditional Ayurvedic Oral Care
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Jeevan Shaili Ayurvedic Dant Manjan is inspired by traditional Ayurvedic oral care practices. Product information should always be read from the actual packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-cream-dark shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                <Droplets className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">Zero Micro-Abrasion</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Use the herbal tooth powder according to the product packaging and your regular oral care routine.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-cream-dark shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                <Leaf className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">Deep Capillary Reach</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Liquids penetrate interdental spaces and gum pockets that brushes cannot access, delivering active clove and babool extracts directly to the roots.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-cream-dark shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest">
                <ShieldCheck className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">Direct from Banda, UP</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Manufactured with pride in Banda, Uttar Pradesh. We maintain strict batch hygiene, zero artificial foaming agents (SLS), and zero synthetic preservatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTANICAL INGREDIENTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Ancient Botanical Science</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
            Verified Ayurvedic Herbal Actives
          </h2>
          <p className="text-slate-600 text-sm">
            We use only evidence-supported, classical Ayurvedic botanicals recognized in classical treatises for natural oral hygiene.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-cream-dark hover:border-gold/50 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
              🌿
            </div>
            <div>
              <h4 className="font-bold text-base text-forest">Laung (Clove Oil)</h4>
              <p className="text-xs text-gold-dark font-semibold mb-1">Syzygium Aromaticum</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rich in eugenol, clove naturally numbs oral sensitivity and combats bad breath causing micro-organisms.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-dark hover:border-gold/50 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl shrink-0">
              🌳
            </div>
            <div>
              <h4 className="font-bold text-base text-forest">Babool Bark</h4>
              <p className="text-xs text-gold-dark font-semibold mb-1">Acacia Arabica</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Revered in Ayurveda for natural tannins that tighten spongy gums and help reduce bleeding tendencies.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-dark hover:border-gold/50 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
              🌱
            </div>
            <div>
              <h4 className="font-bold text-base text-forest">Bakul Bark</h4>
              <p className="text-xs text-gold-dark font-semibold mb-1">Mimusops Elengi</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Celebrated in Charaka Samhita as the premier herb for anchoring loose teeth and reinforcing dental sockets.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-dark hover:border-gold/50 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl shrink-0">
              🍃
            </div>
            <div>
              <h4 className="font-bold text-base text-forest">Vajradanti</h4>
              <p className="text-xs text-gold-dark font-semibold mb-1">Barleria Prionitis</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Known as "Diamond Teeth" in Sanskrit; provides profound structural fortification to sensitive enamel.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-dark hover:border-gold/50 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
              🍂
            </div>
            <div>
              <h4 className="font-bold text-base text-forest">Majuphal</h4>
              <p className="text-xs text-gold-dark font-semibold mb-1">Quercus Infectoria</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Potent botanical astringent that tones gingival tissues and preserves healthy oral pH levels.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-dark hover:border-gold/50 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl shrink-0">
              ❄️
            </div>
            <div>
              <h4 className="font-bold text-base text-forest">Pudina Satva</h4>
              <p className="text-xs text-gold-dark font-semibold mb-1">Mentha Spicata Extract</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pure spearmint crystal extract providing lingering herbal freshness without synthetic chemical aromas.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. HOW TO USE STEP-BY-STEP (DINACHARYA RITUAL) */}
      <section className="bg-gradient-to-b from-white to-cream-light py-16 border-y border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Simple 3-Minute Routine</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
              How to Use Ayurvedic Dant Manjan
            </h2>
            <p className="text-slate-600 text-sm">
              Incorporate our liquid formulation into your daily morning and bedtime oral regimen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-8 rounded-2xl border border-cream-dark text-center space-y-4 relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-forest text-gold font-extrabold text-lg flex items-center justify-center shadow">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">Dispense 5-8 Drops</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Use the precision dropper to apply 5 to 8 drops directly onto your soft-bristle toothbrush or clean fingertip.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-cream-dark text-center space-y-4 relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-forest text-gold font-extrabold text-lg flex items-center justify-center shadow">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">Gently Swish &amp; Cleanse</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Swish the liquid around teeth and massage gums gently for 2 to 3 minutes, allowing active herbs to penetrate sulcular spaces.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-cream-dark text-center space-y-4 relative">
              <div className="w-12 h-12 mx-auto rounded-full bg-forest text-gold font-extrabold text-lg flex items-center justify-center shadow">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-forest">Rinse with Fresh Water</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Spit out and rinse thoroughly with clean room-temperature water. Enjoy natural herbal freshness all day!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Real Customer Experiences</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
            Trusted by Families Across India
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1">
            <RatingStars rating={4.9} totalReviews={103} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400">
                {'★★★★★'}
              </div>
              <h4 className="font-serif font-bold text-base text-forest">
                "Complete relief from gum bleeding!"
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Jeevan Shaili makes it easy to discover a traditional Ayurvedic-inspired oral care routine.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-cream-dark flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-forest">Rajesh Verma</p>
                <p className="text-slate-400">Lucknow, UP</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold">
                ✓ Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400">
                {'★★★★★'}
              </div>
              <h4 className="font-serif font-bold text-base text-forest">
                "Zero mess and clean enamel protection"
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Traditional dant manjan powder was always messy in the sink. This liquid bottle with dropper is a game changer! It feels so pure and gentle on enamel. Proud to support a brand from Banda.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-cream-dark flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-forest">Priya Tiwari</p>
                <p className="text-slate-400">Kanpur, UP</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold">
                ✓ Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-amber-400">
                {'★★★★★'}
              </div>
              <h4 className="font-serif font-bold text-base text-forest">
                "Long lasting fresh breath"
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                The freshness from natural pudina and clove lasts for hours without that artificial sweet chemical aftertaste. Ordered the Duo pack for my parents too. Highly recommended!
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-cream-dark flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-forest">Amitabh Saxena</p>
                <p className="text-slate-400">Varanasi, UP</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold">
                ✓ Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BRAND STORY TEASER */}
      <section className="bg-forest text-cream py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">Rooted in Banda, Uttar Pradesh</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Crafted with Authenticity &amp; Pure Botanical Pride
              </h2>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
                JEEVAN SHAILI PVT. LTD. is based in Bangalipura, Banda, Uttar Pradesh.
              </p>
              <p className="text-cream/70 text-xs sm:text-sm leading-relaxed">
                We focus on clear product information and avoid unsupported medical claims.
              </p>
              <div className="pt-2">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest-dark font-extrabold px-7 py-3.5 rounded-full text-xs tracking-wider uppercase transition shadow-luxury-gold"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <img
                src="/images/products/jeevan-shaili-dant-manjan.jpg"
                alt="Jeevan Shaili Ayurvedic Dant Manjan"
                className="w-full max-w-md rounded-3xl border-2 border-gold/40 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. LATEST AYURVEDIC BLOGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Educational Insights</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-forest tracking-tight mt-1">
              Ayurvedic Oral Care Journal
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-forest font-bold text-sm hover:text-gold transition group"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentBlogs.map((blog) => (
            <article key={blog._id} className="bg-white rounded-2xl overflow-hidden border border-cream-dark hover:border-gold/50 shadow-sm flex flex-col h-full group">
              <Link to={`/blog/${blog.slug}`} className="block aspect-[16/10] overflow-hidden bg-cream-light">
                <img
                  src={blog.image || '/images/products/jeevan-shaili-dant-manjan.jpg'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gold-dark mb-2">
                    <span>{blog.tags[0] || 'Ayurveda'}</span>
                    <span>•</span>
                    <span className="text-slate-400 font-normal">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="font-serif font-bold text-base text-forest group-hover:text-gold-dark transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-cream-dark/60">
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-forest hover:text-gold flex items-center gap-1.5 transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 10. NEWSLETTER SUBSCRIBER BOX */}
      <Newsletter />

    </div>
  );
};
