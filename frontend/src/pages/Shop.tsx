import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { api } from '../services/api';
import { Product, Category } from '../types';
import { ProductCard } from '../components/common/ProductCard';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (currentCategory && currentCategory !== 'all') params.category = currentCategory;
    if (currentSearch) params.search = currentSearch;
    if (currentSort) params.sort = currentSort;
    if (maxPrice) params.maxPrice = maxPrice;

    Promise.all([
      api.getProducts(params),
      api.getCategories()
    ]).then(([prodRes, catRes]) => {
      setProducts(prodRes.products || []);
      setTotal(prodRes.total || 0);
      setCategories(catRes || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [searchParams]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-cream p-8 sm:p-12 rounded-3xl shadow-luxury relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Ayurvedic Oral Formulations</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Shop JEEVAN SHAILI Collection
          </h1>
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
            Discover Jeevan Shaili Ayurvedic Dant Manjan, inspired by traditional Ayurvedic oral care practices.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-cream-dark shadow-sm">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => updateFilter('category', 'all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
              currentCategory === 'all'
                ? 'bg-forest text-cream shadow-sm'
                : 'bg-cream text-forest hover:bg-cream-dark'
            }`}
          >
            All Products ({total})
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => updateFilter('category', cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                currentCategory === cat.slug
                  ? 'bg-forest text-cream shadow-sm'
                  : 'bg-cream text-forest hover:bg-cream-dark'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-cream text-forest text-xs font-bold rounded-xl border border-cream-dark"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold" /> Filter
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <ArrowUpDown className="w-4 h-4 text-gold shrink-0" />
            <select
              value={currentSort}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-cream-light border border-cream-dark text-forest text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-gold"
            >
              <option value="newest">New Arrivals</option>
              <option value="popular">Best Sellers</option>
              <option value="rating">Highest Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-cream-dark shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-cream-dark">
              <h3 className="font-serif font-bold text-base text-forest flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold" /> Filters
              </h3>
              {(currentCategory !== 'all' || currentSearch || maxPrice) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  value={currentSearch}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  placeholder="Clove, Babool, Gum Care..."
                  className="w-full pl-3 pr-8 py-2 text-xs bg-cream-light rounded-xl border border-cream-dark focus:outline-none focus:border-gold font-medium"
                />
                {currentSearch && (
                  <button
                    onClick={() => updateFilter('search', '')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-2">Max Price</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="200"
                  max="1200"
                  step="50"
                  value={maxPrice || '1200'}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  className="w-full accent-forest cursor-pointer"
                />
                <span className="text-xs font-bold text-forest shrink-0">₹{maxPrice || '1200'}</span>
              </div>
            </div>

            {/* Quality Promise Card */}
            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
              <p className="font-bold">🌿 100% Liquid Guarantee</p>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                All products strictly adhere to zero enamel-abrasion liquid standards formulated in Banda, UP.
              </p>
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-white rounded-2xl animate-pulse border border-cream-dark" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-cream-dark space-y-4">
              <p className="text-4xl">🍃</p>
              <h3 className="font-serif text-xl font-bold text-forest">No Products Found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                We couldn't find any items matching your selected filters. Try clearing filters or searching with different keywords.
              </p>
              <button
                onClick={clearFilters}
                className="bg-forest text-cream px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-forest-dark transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
