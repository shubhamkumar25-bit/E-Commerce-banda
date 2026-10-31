import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, MapPin, Phone, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Liquid Manjan', path: '/shop?category=ayurvedic-liquid-manjan' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Ayurveda Blog', path: '/blog' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cream-dark transition-all">
      {/* Top Header Contact Bar */}
      <div className="hidden lg:block bg-cream-light py-1.5 border-b border-cream-dark/60 text-xs text-forest/80 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold" /> Banda, Uttar Pradesh - 210001, India
            </span>
            <a href="tel:8840091758" className="flex items-center gap-1.5 hover:text-gold transition">
              <Phone className="w-3.5 h-3.5 text-gold" /> Helpline: +91 8840091758
            </a>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-forest font-semibold">100% Ayurvedic Oral Formulation</span>
            <span className="text-slate-300">|</span>
            <Link to="/admin/login" className="flex items-center gap-1 text-slate-500 hover:text-forest transition">
              <Shield className="w-3 h-3 text-gold" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-forest hover:text-gold rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo-icon.svg"
              alt="GIWANSALLY Emblem"
              className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-forest group-hover:text-forest-dark">
                GIWANSALLY
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-gold uppercase -mt-0.5">
                Ayurvedic Liquid Manjan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold tracking-wide transition-colors py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'text-forest border-gold'
                    : 'text-slate-700 border-transparent hover:text-forest hover:border-gold/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Search & Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-slate-700 hover:text-forest hover:bg-cream/60 rounded-full transition"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-forest hover:bg-forest-dark text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition group"
            >
              <ShoppingBag className="w-4 h-4 text-gold group-hover:rotate-6 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase">Cart</span>
              <span className="bg-gold text-forest-dark font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center ml-0.5">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="bg-cream border-t border-b border-gold/30 py-4 px-4 sm:px-6 shadow-inner animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ayurvedic Liquid Manjan, Clove, Babool, Gum Care..."
                className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full border border-cream-dark text-forest text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="bg-forest hover:bg-forest-dark text-cream font-semibold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition shadow"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2.5 text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-cream-dark py-4 px-6 shadow-xl space-y-3">
          <div className="py-2 border-b border-cream text-xs text-forest font-semibold">
            📍 Banda, Uttar Pradesh, India
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base font-semibold ${
                isActive(link.path) ? 'text-forest font-bold' : 'text-slate-700 hover:text-forest'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-cream flex justify-between items-center text-xs">
            <a href="tel:8840091758" className="text-forest font-bold">
              Call: +91 8840091758
            </a>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gold font-bold underline"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

