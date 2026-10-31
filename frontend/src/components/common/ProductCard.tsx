import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Zap, Check, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { RatingStars } from './RatingStars';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const displayPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const originalPrice = product.price;
  const hasDiscount = Boolean(product.salePrice && product.salePrice < originalPrice);
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - product.salePrice!) / originalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-cream-dark/70 hover:border-gold/50 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col h-full relative">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {hasDiscount && (
          <span className="bg-gold text-forest-dark font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-forest text-cream font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Best Seller
          </span>
        )}
        {product.isFeatured && !product.isBestSeller && (
          <span className="bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* Volume Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-white/90 backdrop-blur-sm text-forest font-bold text-[11px] px-2.5 py-1 rounded-lg border border-cream-dark shadow-sm">
          {product.volume || '100ml'}
        </span>
      </div>

      {/* Product Image Clickable Link */}
      <Link
        to={`/product/${product.slug}`}
        className="block relative aspect-square overflow-hidden bg-gradient-to-b from-cream-light to-white p-6"
      >
        <img
          src={product.images[0] || '/images/products/bottle-hero.png'}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick View overlay hint */}
        <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-forest text-xs font-bold px-3.5 py-1.5 rounded-full shadow flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Ratings */}
          <div className="mb-2">
            <RatingStars rating={product.averageRating || 4.9} totalReviews={product.totalReviews} size="sm" />
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif font-bold text-base text-forest group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Stock Status */}
        <div className="mt-4 pt-3 border-t border-cream-dark/60">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-extrabold text-forest">
              ₹{displayPrice}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{originalPrice}
              </span>
            )}
            <span className="ml-auto text-[11px] font-semibold">
              {isOutOfStock ? (
                <span className="text-red-500">Out of Stock</span>
              ) : product.stock <= 5 ? (
                <span className="text-amber-600 font-bold">Only {product.stock} left!</span>
              ) : (
                <span className="text-emerald-700">In Stock</span>
              )}
            </span>
          </div>

          {/* Quantity Selector & Dual CTAs */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-cream-dark rounded-lg bg-cream-light/50 px-2 py-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-forest font-bold"
                  disabled={quantity <= 1 || isOutOfStock}
                >
                  -
                </button>
                <span className="w-6 text-center text-xs font-bold text-forest">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-forest font-bold"
                  disabled={quantity >= product.stock || isOutOfStock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-2 px-3 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow-sm ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : isOutOfStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-cream text-forest border border-forest/30 hover:bg-forest hover:text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-gold" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-2 px-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow ${
                isOutOfStock
                  ? 'hidden'
                  : 'bg-forest hover:bg-forest-dark text-cream'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-gold fill-gold" /> Buy Now (Instant Checkout)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

