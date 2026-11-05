import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Truck,
  Droplets,
  RotateCcw,
  Sparkles,
  Share2,
  CheckCircle2,
  Clock,
  Heart
} from 'lucide-react';
import { api, resolveImageUrl } from '../services/api';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { RatingStars } from '../components/common/RatingStars';
import { PinCodeChecker } from '../components/common/PinCodeChecker';
import { ProductCard } from '../components/common/ProductCard';
import { SafeImage } from '../components/common/SafeImage';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'howToUse' | 'reviews'>('overview');
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);

    api.getProductBySlug(slug)
      .then((data) => {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
        setActiveImageIndex(0);
        setLoading(false);

        // Fetch approved reviews
        if (data.product?._id) {
          api.getProductReviews(data.product._id).then((revs) => setReviews(revs));
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-gold border-t-forest rounded-full animate-spin mx-auto" />
        <p className="text-forest font-serif font-bold text-lg">Loading Authentic Ayurvedic Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-forest">Product Not Found</h2>
        <p className="text-slate-600 text-sm">The product you are looking for does not exist or has been relocated.</p>
        <Link to="/shop" className="inline-block bg-forest text-cream font-bold px-6 py-2.5 rounded-full">
          Return to Shop
        </Link>
      </div>
    );
  }

  const displayPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
  const originalPrice = product.price;
  const hasDiscount = Boolean(product.salePrice && product.salePrice < originalPrice);
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - product.salePrice!) / originalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    try {
      await api.submitReview({
        productId: product._id,
        customerName: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim()
      });
      setReviewStatus('Thank you! Your verified review has been submitted for moderation.');
      setReviewName('');
      setReviewComment('');
    } catch (err: any) {
      setReviewStatus(err.message || 'Failed to submit review');
    }
  };

  const productImages = product.images?.length > 0
    ? product.images
    : ['/images/products/jeevan-shaili-dant-manjan.jpg'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumbs */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link to="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-forest">Shop</Link>
        <span>/</span>
        <span className="text-forest font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-square bg-gradient-to-b from-cream to-white rounded-3xl border border-cream-dark overflow-hidden p-8 shadow-sm flex items-center justify-center">
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-gold text-forest-dark font-extrabold text-xs px-3 py-1 rounded-full shadow">
                {discountPercent}% OFF
              </span>
            )}
            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-forest font-bold text-xs px-3 py-1 rounded-lg border border-cream-dark">
              {product.volume || '100ml'}
            </span>

            <SafeImage
              src={resolveImageUrl(productImages[activeImageIndex])}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-xl transition-all duration-300"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-2xl p-2 bg-white border-2 transition overflow-hidden shrink-0 ${
                  activeImageIndex === idx ? 'border-gold shadow-md' : 'border-cream-dark hover:border-forest/40'
                }`}
              >
                <SafeImage src={resolveImageUrl(img)} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Purchasing & Specs */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Category Tag */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
              Ayurvedic Oral Care
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-forest font-semibold">Origin: Banda, Uttar Pradesh</span>
          </div>

          {/* Product Title */}
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-forest tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Ratings & Total Reviews */}
          <div className="flex items-center gap-3">
            <RatingStars rating={product.averageRating || 4.9} totalReviews={product.totalReviews} size="md" />
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine Ayurvedic
            </span>
          </div>

          {/* Price Block */}
          <div className="bg-cream-light p-4 rounded-2xl border border-cream-dark flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-forest">
              ₹{displayPrice}
            </span>
            {hasDiscount && (
              <span className="text-base text-slate-400 line-through font-medium">
                ₹{originalPrice}
              </span>
            )}
            {hasDiscount && (
              <span className="text-xs font-bold text-gold-dark bg-gold/20 px-2.5 py-0.5 rounded-full">
                Save ₹{originalPrice - displayPrice}
              </span>
            )}
            <span className="ml-auto text-xs text-slate-500 font-medium">
              (Inclusive of all taxes)
            </span>
          </div>

          {/* Short Description */}
          <p className="text-slate-700 text-sm leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Stock availability banner */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            {isOutOfStock ? (
              <span className="text-red-500 font-bold">Currently Out of Stock</span>
            ) : product.stock <= 10 ? (
              <span className="text-amber-700 font-bold">Hurry! Only {product.stock} units remaining in Banda warehouse</span>
            ) : (
              <span className="text-emerald-800">In Stock • Ships within 24 hours from Banda, UP</span>
            )}
          </div>

          {/* Quantity Selector & CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity counter */}
              <div className="flex items-center border-2 border-cream-dark rounded-xl bg-white px-3 py-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-forest font-bold text-base"
                  disabled={quantity <= 1 || isOutOfStock}
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-forest">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-forest font-bold text-base"
                  disabled={quantity >= product.stock || isOutOfStock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-md ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : isOutOfStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-cream border-2 border-forest text-forest hover:bg-forest hover:text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Direct Buy Now CTA */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`w-full py-4 px-6 rounded-2xl font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-luxury ${
                isOutOfStock
                  ? 'hidden'
                  : 'bg-forest hover:bg-forest-dark text-cream'
              }`}
            >
              <Zap className="w-4 h-4 text-gold fill-gold" /> Buy Now (Instant Guest Checkout)
            </button>
          </div>

          {/* Delivery PIN Code Checker */}
          <div className="pt-2">
            <PinCodeChecker />
          </div>

          {/* Trust Guarantees Strip */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-cream-dark">
              <Truck className="w-4 h-4 text-gold shrink-0" />
              <span>Free Delivery on ₹499+</span>
            </div>
            <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-cream-dark">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Cash on Delivery Available</span>
            </div>
          </div>

        </div>

      </div>

      {/* Product Details Tabs Section */}
      <div className="bg-white rounded-3xl border border-cream-dark overflow-hidden shadow-sm">
        
        {/* Tab Headers */}
        <div className="flex items-center border-b border-cream-dark bg-cream-light/60 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-gold text-forest bg-white'
                : 'border-transparent text-slate-500 hover:text-forest'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-gold text-forest bg-white'
                : 'border-transparent text-slate-500 hover:text-forest'
            }`}
          >
            Botanical Ingredients ({product.ingredients?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('howToUse')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === 'howToUse'
                ? 'border-gold text-forest bg-white'
                : 'border-transparent text-slate-500 hover:text-forest'
            }`}
          >
            How to Use &amp; Storage
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-gold text-forest bg-white'
                : 'border-transparent text-slate-500 hover:text-forest'
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-10">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-sm text-slate-700 leading-relaxed max-w-4xl">
              <h3 className="font-serif text-xl font-bold text-forest">Authentic Product Description</h3>
              <p className="whitespace-pre-line">{product.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-cream-light p-4 rounded-xl border border-cream-dark">
                  <h4 className="font-bold text-forest text-xs uppercase tracking-wider mb-1">Volume / Packaging</h4>
                  <p className="text-xs">{product.volume || '100ml'} Glass Bottle with Precision Dropper</p>
                </div>
                <div className="bg-cream-light p-4 rounded-xl border border-cream-dark">
                  <h4 className="font-bold text-forest text-xs uppercase tracking-wider mb-1">Manufacturing Hub</h4>
                  <p className="text-xs">{product.manufacturingInfo || 'Banda, Uttar Pradesh, India'}</p>
                </div>
                <div className="bg-cream-light p-4 rounded-xl border border-cream-dark">
                  <h4 className="font-bold text-forest text-xs uppercase tracking-wider mb-1">Shelf Life / Expiry</h4>
                  <p className="text-xs">{product.expiryInfo || 'Best before 24 months from manufacturing'}</p>
                </div>
                <div className="bg-cream-light p-4 rounded-xl border border-cream-dark">
                  <h4 className="font-bold text-forest text-xs uppercase tracking-wider mb-1">Storage Recommendation</h4>
                  <p className="text-xs">{product.storage || 'Store in a cool, dry place away from direct sunlight'}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INGREDIENTS */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-serif text-xl font-bold text-forest mb-2">Active Botanical Extracts</h3>
                <p className="text-xs text-slate-600">
                  Every ingredient is selected in accordance with traditional Ayurvedic science and validated for non-abrasive oral hygiene.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.ingredients?.map((ing, i) => (
                  <div key={i} className="p-4 bg-cream-light rounded-2xl border border-cream-dark flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-forest text-gold flex items-center justify-center text-xs font-bold shrink-0">
                      🌿
                    </span>
                    <div>
                      <h4 className="font-bold text-forest text-sm">{ing.name}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{ing.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HOW TO USE */}
          {activeTab === 'howToUse' && (
            <div className="space-y-6 max-w-4xl text-sm leading-relaxed text-slate-700">
              <h3 className="font-serif text-xl font-bold text-forest">Recommended Application Routine</h3>
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                <p className="font-semibold text-emerald-900">{product.howToUse}</p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-forest text-sm uppercase tracking-wider">Morning Ayurvedic Regimen:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <li>Cleanse tongue thoroughly with a copper scraper upon waking.</li>
                  <li>Use according to the instructions on the product packaging.</li>
                  <li>Gently massage teeth and gums in circular motions for 2 to 3 minutes.</li>
                  <li>Rinse thoroughly with fresh water. Do not eat or drink for 15 minutes after use for optimal botanical absorption.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-10 max-w-4xl">
              
              {/* Existing Reviews */}
              <div>
                <h3 className="font-serif text-xl font-bold text-forest mb-6">Customer Reviews &amp; Ratings</h3>
                {reviews.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Be the first verified customer to share your thoughts!</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div key={rev._id} className="p-4 bg-cream-light rounded-2xl border border-cream-dark space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-forest text-xs">{rev.customerName}</p>
                          <RatingStars rating={rev.rating} size="sm" showCount={false} />
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                        <p className="text-[10px] text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit a Review Form */}
              <div className="bg-cream p-6 rounded-2xl border border-cream-dark space-y-4">
                <h4 className="font-serif font-bold text-base text-forest">Leave a Product Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-forest uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-dark bg-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest uppercase mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="px-3 py-2 text-xs rounded-xl border border-cream-dark bg-white focus:outline-none focus:border-gold"
                    >
                      <option value={5}>★★★★★ (5/5 Excellent)</option>
                      <option value={4}>★★★★☆ (4/5 Very Good)</option>
                      <option value={3}>★★★☆☆ (3/5 Good)</option>
                      <option value={2}>★★☆☆☆ (2/5 Average)</option>
                      <option value={1}>★☆☆☆☆ (1/5 Poor)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest uppercase mb-1">Your Experience / Feedback</label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      placeholder="Share your experience with Jeevan Shaili Ayurvedic Dant Manjan..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-cream-dark bg-white focus:outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-forest text-cream font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-forest-dark transition"
                  >
                    Submit Review
                  </button>
                </form>

                {reviewStatus && (
                  <p className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    {reviewStatus}
                  </p>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-forest">Related Oral Care Formulations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
