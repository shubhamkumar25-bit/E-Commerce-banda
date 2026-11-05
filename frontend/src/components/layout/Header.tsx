import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, MapPin, Menu, Phone, Search, ShoppingBag, Shield, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { SITE } from '../../config/site';
import { api } from '../../services/api';
import { Category } from '../../types';

const labels = {
  en: { home: 'Home', shop: 'Shop All', categories: 'Categories', story: 'Our Story', about: 'About Us', blog: 'Ayurveda Blog', track: 'Track Order', contact: 'Contact', search: 'Search', cart: 'Cart', loading: 'Loading categories…', unavailable: 'Categories unavailable' },
  hi: { home: 'होम', shop: 'सभी उत्पाद', categories: 'श्रेणियाँ', story: 'हमारी कहानी', about: 'हमारे बारे में', blog: 'आयुर्वेद ब्लॉग', track: 'ऑर्डर ट्रैक करें', contact: 'संपर्क करें', search: 'खोजें', cart: 'कार्ट', loading: 'श्रेणियाँ लोड हो रही हैं…', unavailable: 'श्रेणियाँ उपलब्ध नहीं हैं' }
} as const;

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { language, setLanguage } = useLanguage();
  const text = labels[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoriesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api.getCategories()
      .then((data) => {
        const unique = (data || []).filter((category: Category, index: number, list: Category[]) =>
          category.slug && list.findIndex((item) => item.slug === category.slug) === index
        );
        setCategories(unique);
        setCategoriesError(false);
      })
      .catch(() => setCategoriesError(true))
      .finally(() => setCategoriesLoading(false));
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) setCategoriesOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'shop', path: '/shop' },
    { key: 'story', path: '/our-story' },
    { key: 'about', path: '/about-us' },
    { key: 'blog', path: '/blog' },
    { key: 'track', path: '/track-order' },
    { key: 'contact', path: '/contact' }
  ] as const;

  const categoryName = (category: Category) => language === 'hi'
    ? category.nameHindi || category.nameEnglish || category.name
    : category.nameEnglish || category.name;

  const goToCategory = (slug: string) => {
    navigate(`/shop?category=${encodeURIComponent(slug)}`);
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const categoryMenu = (mobile = false) => (
    <div className={mobile ? 'mt-1 rounded-xl border-l border-cream pl-2' : 'absolute left-0 top-full mt-3 w-72 rounded-2xl border border-cream-dark bg-white p-2 shadow-xl'}>
      {categoriesLoading && <p className="px-4 py-3 text-xs text-slate-500">{text.loading}</p>}
      {!categoriesLoading && categoriesError && <p className="px-4 py-3 text-xs text-red-600">{text.unavailable}</p>}
      {!categoriesLoading && !categoriesError && categories.length === 0 && <p className="px-4 py-3 text-xs text-slate-500">{text.unavailable}</p>}
      {!categoriesLoading && !categoriesError && categories.map((category) => (
        <button
          key={category._id}
          type="button"
          onClick={() => goToCategory(category.slug)}
          className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-cream hover:text-forest"
        >
          {categoryName(category)}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-white/95 backdrop-blur-md">
      <div className="hidden bg-cream-light py-2 text-xs text-forest/80 lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 xl:px-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gold" />{SITE.location}</span>
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-1.5 hover:text-gold"><Phone className="h-3.5 w-3.5 text-gold" />Helpline: {SITE.phoneDisplay}</a>
          </div>
          <Link to="/admin/login" className="flex items-center gap-1 hover:text-forest"><Shield className="h-3.5 w-3.5 text-gold" />Admin Portal</Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="flex min-h-[76px] items-center gap-3 lg:gap-6">
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-lg p-2 text-forest lg:hidden" aria-label="Toggle navigation">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
            <img src="/jeevan-shaili-logo.png" alt="JEEVAN SHAILI logo" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
            <span className="whitespace-nowrap font-serif text-[clamp(1rem,2vw,1.55rem)] font-bold tracking-[0.12em] text-forest">JEEVAN SHAILI</span>
            <span className="hidden whitespace-nowrap text-[9px] font-semibold tracking-[0.18em] text-gold xl:block">AYURVEDIC PRODUCTS</span>
          </Link>

          <nav className="ml-auto hidden min-w-0 items-center gap-4 xl:gap-6 lg:flex">
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.key} to={link.path} className={`whitespace-nowrap border-b-2 py-2 text-[13px] font-semibold ${isActive(link.path) ? 'border-gold text-forest' : 'border-transparent text-slate-700 hover:text-forest'}`}>
                {text[link.key]}
              </Link>
            ))}
            <div ref={categoriesRef} className="relative">
              <button type="button" onClick={() => setCategoriesOpen((open) => !open)} className="flex items-center gap-1 whitespace-nowrap border-b-2 border-transparent py-2 text-[13px] font-semibold text-slate-700 hover:text-forest" aria-expanded={categoriesOpen}>
                {text.categories}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {categoriesOpen && categoryMenu()}
            </div>
            {navLinks.slice(2).map((link) => (
              <Link key={link.key} to={link.path} className={`whitespace-nowrap border-b-2 py-2 text-[13px] font-semibold ${isActive(link.path) ? 'border-gold text-forest' : 'border-transparent text-slate-700 hover:text-forest'}`}>
                {text[link.key]}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 lg:ml-3">
            <button type="button" onClick={() => setSearchOpen((open) => !open)} className="rounded-full p-2.5 text-slate-700 hover:bg-cream hover:text-forest" aria-label={text.search}><Search className="h-5 w-5" /></button>
            <button type="button" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} className="rounded-full border border-cream-dark px-2.5 py-1.5 text-[11px] font-bold text-forest" aria-label="Change language">
              {language === 'en' ? 'हिंदी' : 'EN'}
            </button>
            <Link to="/cart" className="relative rounded-full bg-forest p-2.5 text-white hover:bg-forest-dark" aria-label={text.cart}>
              <ShoppingBag className="h-5 w-5 text-gold" />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-extrabold text-forest-dark">{totalItems}</span>
            </Link>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-cream-dark bg-cream px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-2xl gap-2">
            <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={text.search} className="min-w-0 flex-1 rounded-full border border-cream-dark bg-white px-4 py-2.5 text-sm text-forest outline-none focus:border-gold" />
            <button type="submit" className="rounded-full bg-forest px-5 py-2 text-xs font-bold uppercase text-white">{text.search}</button>
          </form>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="border-t border-cream-dark bg-white px-5 py-4 shadow-xl lg:hidden">
          <div className="mb-3 border-b border-cream pb-3 text-xs text-forest">{SITE.location}<br />{SITE.phoneDisplay}</div>
          <div className="space-y-1">
            {navLinks.slice(0, 2).map((link) => <Link key={link.key} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-cream">{text[link.key]}</Link>)}
            <button type="button" onClick={() => setCategoriesOpen((open) => !open)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-cream">{text.categories}<ChevronDown className={`h-4 w-4 ${categoriesOpen ? 'rotate-180' : ''}`} /></button>
            {categoriesOpen && categoryMenu(true)}
            {navLinks.slice(2).map((link) => <Link key={link.key} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-cream">{text[link.key]}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
};
