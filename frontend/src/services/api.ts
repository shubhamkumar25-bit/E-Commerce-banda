const API_BASE = '/api';

export const getAuthToken = () => {
  return localStorage.getItem('giwansally_admin_token');
};

const getHeaders = (isMultipart = false) => {
  const headers: Record<string, string> = {};
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// FALLBACK DATA in case backend is loading or initial startup
export const FALLBACK_PRODUCTS = [
  {
    _id: 'prod_1',
    name: 'GIWANSALLY Ayurvedic Liquid Manjan (Classic 100ml)',
    slug: 'giwansally-ayurvedic-liquid-manjan-classic-100ml',
    shortDescription: 'Flagship herbal liquid manjan formulated with traditional botanical extracts for healthy gums & sparkling teeth.',
    description: 'GIWANSALLY Ayurvedic Liquid Manjan is an innovative breakthrough in herbal dental wellness. Unlike conventional abrasive tooth powders, our concentrated liquid manjan gently reaches deep between teeth and periodontal pockets without abrading enamel. Infused with potent extracts of Babool bark, Clove oil (Laung), Bakul, and Majuphal, this formula helps protect against bleeding gums, strengthens teeth roots, eliminates bad breath, and maintains healthy oral microflora. Crafted with pride in Banda, Uttar Pradesh.',
    category: { _id: 'cat_1', name: 'Ayurvedic Liquid Manjan', slug: 'ayurvedic-liquid-manjan' },
    images: [
      '/images/products/bottle-hero.png',
      '/images/products/bottle-front.png',
      '/images/products/bottle-botanicals.png',
      '/images/products/bottle-lifestyle.png'
    ],
    price: 299,
    salePrice: 249,
    volume: '100ml',
    stock: 150,
    sku: 'GWS-LM-100',
    isFeatured: true,
    isBestSeller: true,
    isActive: true,
    averageRating: 4.9,
    totalReviews: 28,
    totalSold: 142,
    ingredients: [
      { name: 'Laung (Clove Oil)', description: 'Relieves tooth sensitivity and eliminates bad breath naturally.' },
      { name: 'Babool Bark (Acacia Arabica)', description: 'Tightens spongy gums and supports tooth density.' },
      { name: 'Bakul (Mimusops Elengi)', description: 'Traditional herb revered for strengthening dental roots.' },
      { name: 'Majuphal (Quercus Infectoria)', description: 'Powerful natural astringent reducing gum bleeding.' },
      { name: 'Pudina Satva (Spearmint)', description: 'Long-lasting natural breath coolness.' }
    ],
    howToUse: 'Pour 5-10 drops directly on toothbrush or swish in oral cavity for 2 minutes after brushing. Spit out and rinse with fresh water. Use twice daily.',
    storage: 'Store in a cool and dry place away from direct sunlight.',
    manufacturingInfo: 'Crafted & Bottled at GIWANSALLY Herbals, Banda, Uttar Pradesh, India.',
    expiryInfo: 'Best before 24 months from manufacturing date.',
    tags: ['liquid manjan', 'ayurvedic', 'gum care', 'clove', 'oral hygiene', 'banda herbal'],
    createdAt: new Date().toISOString()
  },
  {
    _id: 'prod_2',
    name: 'GIWANSALLY Liquid Manjan - Gum Defence & Sensitivity (100ml)',
    slug: 'giwansally-liquid-manjan-gum-defence-sensitivity-100ml',
    shortDescription: 'Targeted botanical formula enriched with Vajradanti and Neem for soothing sensitive gums.',
    description: 'Specially formulated for sensitive gums and tingling nerve endings. GIWANSALLY Gum Defence blends wild-harvested Vajradanti and Neem with cooling camphor and Akarkara to calm gum sensitivity to hot or cold foods while nourishing gum tissue.',
    category: { _id: 'cat_1', name: 'Ayurvedic Liquid Manjan', slug: 'ayurvedic-liquid-manjan' },
    images: [
      '/images/products/bottle-front.png',
      '/images/products/bottle-botanicals.png',
      '/images/products/bottle-hero.png'
    ],
    price: 349,
    salePrice: 289,
    volume: '100ml',
    stock: 120,
    sku: 'GWS-GD-100',
    isFeatured: true,
    isBestSeller: false,
    isActive: true,
    averageRating: 4.8,
    totalReviews: 19,
    totalSold: 88,
    ingredients: [
      { name: 'Vajradanti', description: 'Deep structural reinforcement for enamel.' },
      { name: 'Neem Extract', description: 'Defends oral cavity against bacterial plaque.' },
      { name: 'Akarkara', description: 'Soothes exposed sensitive dental roots.' }
    ],
    howToUse: 'Apply 6-8 drops with soft toothbrush or fingertip onto gums. Massage gently for 3 minutes before rinsing.',
    storage: 'Keep in dry cabinet at ambient room temperature.',
    manufacturingInfo: 'GIWANSALLY Herbals, Banda, Uttar Pradesh, India.',
    expiryInfo: 'Best before 24 months from MFD.',
    tags: ['sensitivity', 'vajradanti', 'neem', 'gum defense'],
    createdAt: new Date().toISOString()
  },
  {
    _id: 'prod_3',
    name: 'GIWANSALLY Herbal Duo - 2x Liquid Manjan Saver Pack',
    slug: 'giwansally-herbal-duo-2x-liquid-manjan-saver-pack',
    shortDescription: 'Two 100ml bottles of GIWANSALLY Classic Liquid Manjan at an exclusive discounted family rate.',
    description: 'Double the natural oral protection with our best-value Duo Pack. Enjoy two 100ml bottles of authentic GIWANSALLY Liquid Manjan, giving your family a 60-day supply of chemical-free, herbal dental care.',
    category: { _id: 'cat_3', name: 'Combo Packs', slug: 'combo-packs' },
    images: [
      '/images/products/combo-packs.png',
      '/images/products/bottle-hero.png'
    ],
    price: 598,
    salePrice: 449,
    volume: '2 x 100ml',
    stock: 90,
    sku: 'GWS-DUO-200',
    isFeatured: true,
    isBestSeller: true,
    isActive: true,
    averageRating: 5.0,
    totalReviews: 34,
    totalSold: 110,
    ingredients: [
      { name: 'Clove Oil (Laung)', description: 'Toothache & breath defense.' },
      { name: 'Babool Extract', description: 'Gum strengthening.' },
      { name: 'Bakul Bark', description: 'Enamel preservation.' }
    ],
    howToUse: 'Standard morning and night dental cleansing routine with 5-10 drops per application.',
    storage: 'Store in cool ambient environment.',
    manufacturingInfo: 'GIWANSALLY Herbals, Banda, Uttar Pradesh, India.',
    expiryInfo: 'Best before 24 months from MFD.',
    tags: ['combo pack', 'duo pack', 'discount'],
    createdAt: new Date().toISOString()
  },
  {
    _id: 'prod_4',
    name: 'GIWANSALLY Royal Ayurvedic Oral Care Kit (3x 100ml + Copper Scraper)',
    slug: 'giwansally-royal-ayurvedic-oral-care-kit',
    shortDescription: 'Complete traditional Ayurvedic oral regimen: 3 Liquid Manjan bottles plus pure Ayurvedic Copper Tongue Cleaner.',
    description: 'The ultimate Ayurvedic dental rejuvenation experience. Includes 3 bottles of GIWANSALLY Liquid Manjan accompanied by an ergonomically designed 100% pure copper tongue cleaner to complete the ancient "Dinacharya" oral detox ritual.',
    category: { _id: 'cat_3', name: 'Combo Packs', slug: 'combo-packs' },
    images: [
      '/images/products/special-offers.png',
      '/images/products/combo-packs.png'
    ],
    price: 999,
    salePrice: 699,
    volume: '3 x 100ml + Accessory',
    stock: 45,
    sku: 'GWS-KIT-300',
    isFeatured: false,
    isBestSeller: true,
    isActive: true,
    averageRating: 4.9,
    totalReviews: 22,
    totalSold: 76,
    ingredients: [
      { name: 'Full Spectrum Herbal Extract Blend', description: 'Laung, Babool, Vajradanti, Majuphal, Pudina Satva & Akarkara.' }
    ],
    howToUse: 'Clean tongue with copper scraper every morning before swishing with GIWANSALLY Liquid Manjan.',
    storage: 'Store dry.',
    manufacturingInfo: 'GIWANSALLY Herbals, Banda, Uttar Pradesh, India.',
    expiryInfo: 'Best before 24 months from MFD.',
    tags: ['complete kit', 'copper tongue scraper', 'royal ayurvedic'],
    createdAt: new Date().toISOString()
  }
];

export const FALLBACK_CATEGORIES = [
  { _id: 'cat_1', name: 'Ayurvedic Liquid Manjan', slug: 'ayurvedic-liquid-manjan', description: 'Pure herbal liquid formulations with time-tested Ayurvedic herbs.', image: '/images/products/liquid-manjan-hero.png', sortOrder: 1, isActive: true },
  { _id: 'cat_2', name: 'Herbal Oral Care', slug: 'herbal-oral-care', description: 'Gentle, natural solutions for gums, enamel and fresh breath.', image: '/images/products/herbal-oral-care.png', sortOrder: 2, isActive: true },
  { _id: 'cat_3', name: 'Combo Packs', slug: 'combo-packs', description: 'Value collections designed for comprehensive family dental protection.', image: '/images/products/combo-packs.png', sortOrder: 3, isActive: true },
  { _id: 'cat_4', name: 'Special Offers', slug: 'special-offers', description: 'Exclusive seasonal bundles crafted in Banda, Uttar Pradesh.', image: '/images/products/special-offers.png', sortOrder: 4, isActive: true }
];

export const FALLBACK_BLOGS = [
  {
    _id: 'blog_1',
    title: 'Why Liquid Manjan is Revolutionizing Traditional Ayurvedic Oral Hygiene',
    slug: 'why-liquid-manjan-is-revolutionizing-traditional-oral-hygiene',
    excerpt: 'Discover why switching from coarse dry tooth powders and chemical pastes to herbal liquid manjan is the healthiest choice for your gums and enamel.',
    content: `For decades, millions in India grew up using dry herbal manjans or powdered dant-manjan. While the medicinal herbs used in classical formulations were remarkably potent, coarse powders can sometimes cause micro-abrasions on delicate tooth enamel over years of vigorous brushing.

### The Innovation of Liquid Manjan
GIWANSALLY Ayurvedic Liquid Manjan solves this exact challenge. By hydro-extracting the active botanical phytonutrients of Clove, Babool, Bakul, and Majuphal into an unctuous, biocompatible liquid base, the medicinal compounds reach microscopic sulcular spaces that powders and stiff pastes miss entirely.

#### Key Advantages:
1. **Zero Micro-Abrasion**: Gentle on tooth enamel and dentin.
2. **Capillary Penetration**: The liquid naturally flows into interdental gaps where food debris and plaque breed.
3. **Concentrated Botanical Bioactivity**: Delivers pure plant essences directly to the gingival margin.
4. **Natural Breath Refreshment**: Pure mint and clove without saccharin, artificial dyes, or SLS.

Transitioning to GIWANSALLY Liquid Manjan is not just an upgrade in dental care — it is a reconnection to the purest form of Ayurvedic wisdom formulated for the contemporary lifestyle.`,
    image: '/images/products/bottle-botanicals.png',
    author: 'Dr. Anand Sharma, BAMS (Ayurveda Consultant)',
    tags: ['Liquid Manjan', 'Ayurveda', 'Enamel Protection', 'Herbal Oral Care'],
    isPublished: true,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    _id: 'blog_2',
    title: 'The Science Behind Clove (Laung) and Babool in Ancient Indian Dental Care',
    slug: 'science-behind-clove-and-babool-in-ancient-dental-care',
    excerpt: 'Explore the peer-reviewed bioactivity of Eugenol from Clove and Tannins from Babool that make them nature’s undisputed champions for oral health.',
    content: `In the classical treatises of Charaka and Sushruta, the twigs of Babool (Acacia Arabica) and the aromatic buds of Lavanga (Clove) were recognized as the premier guardians of the mouth (Mukha Rogahara).

### The Biochemical Power of Eugenol
Clove oil contains over 70-90% eugenol, an aromatic phenol with documented antimicrobial and analgesic properties. When applied in low concentrated ratios, eugenol disrupts the cell walls of harmful oral bacteria while providing prompt relief from nerve irritation.

### Babool: Nature’s Biological Astringent
Babool bark contains natural catechin gallates and condensed tannins. In oral biology, tannins bind with salivary proteins, creating a protective barrier over inflamed gingiva and tightening periodontal ligaments.

When blended in the synergistic proportions found in GIWANSALLY Liquid Manjan, these two botanicals work symbiotically: Clove pacifies inflammation and bacterial load, while Babool restores gum structural integrity.`,
    image: '/images/products/bottle-lifestyle.png',
    author: 'GIWANSALLY Ayurvedic Research Team',
    tags: ['Clove Oil', 'Babool', 'Herbal Ingredients', 'Oral Health'],
    isPublished: true,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    _id: 'blog_3',
    title: 'Daily Ayurvedic Morning Ritual: The Step-by-Step Guide to Oral Detoxing',
    slug: 'daily-ayurvedic-morning-ritual-step-by-step-guide-to-oral-detox',
    excerpt: 'Learn the sacred Dinacharya sequence — from tongue scraping (Jihwa Nirlekhana) to Gandusha (herbal swishing) with GIWANSALLY.',
    content: `Ayurveda considers the oral cavity to be the gateway to the entire digestive system. A clean mouth ensures balanced Agni (digestive fire) and prevents the circulation of Ama (toxic metabolic residues).

### The Ideal Morning Oral Dinacharya:
1. **Jihwa Nirlekhana (Tongue Scraping)**: Immediately upon waking, scrape the coating off your tongue from back to front using a pure copper tongue cleaner.
2. **Kavala / Swishing with GIWANSALLY**: Place 8-10 drops of GIWANSALLY Liquid Manjan in your mouth. Gently swish it around teeth and gums for 2-3 minutes.
3. **Gentle Brushing or Gum Massage**: Use a soft-bristled brush or your clean ring finger to massage gums in gentle circular motions.
4. **Lukewarm Water Rinse**: Rinse your mouth with warm water to clear residual herbal extracts.

Practicing this ritual daily revitalizes your gums, protects tooth stability, and leaves your breath naturally fresh for hours.`,
    image: '/images/products/bottle-hero.png',
    author: 'Shubham Gupta, GIWANSALLY Brand Team',
    tags: ['Dinacharya', 'Morning Ritual', 'Oral Detox', 'Banda Ayurveda'],
    isPublished: true,
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  }
];

export const api = {
  // Products
  async getProducts(params?: Record<string, string>) {
    try {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      const res = await fetch(`${API_BASE}/products${qs}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      // Fallback
      let filtered = [...FALLBACK_PRODUCTS];
      if (params?.featured === 'true') filtered = filtered.filter(p => p.isFeatured);
      if (params?.bestseller === 'true') filtered = filtered.filter(p => p.isBestSeller);
      if (params?.search) {
        const s = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.shortDescription.toLowerCase().includes(s));
      }
      return { products: filtered, total: filtered.length, page: 1, pages: 1 };
    }
  },

  async getProductBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      return data.data;
    } catch (e) {
      const prod = FALLBACK_PRODUCTS.find(p => p.slug === slug || p._id === slug) || FALLBACK_PRODUCTS[0];
      const related = FALLBACK_PRODUCTS.filter(p => p._id !== prod._id).slice(0, 3);
      return { product: prod, relatedProducts: related };
    }
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return FALLBACK_CATEGORIES;
    }
  },

  // Orders
  async createOrder(orderPayload: any) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to place order');
    }
    return data;
  },

  async trackOrder(orderId: string, mobile: string) {
    const res = await fetch(`${API_BASE}/orders/track`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ orderId, mobile })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Order not found');
    }
    return data.data;
  },

  // Payments
  async verifyPayment(payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; orderId: string }) {
    const res = await fetch(`${API_BASE}/payments/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Payment verification failed');
    }
    return data;
  },

  // Coupons
  async validateCoupon(code: string, orderValue: number) {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code, orderValue })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Invalid coupon');
    }
    return data;
  },

  // Blogs
  async getBlogs(params?: Record<string, string>) {
    try {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      const res = await fetch(`${API_BASE}/blogs${qs}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return { blogs: FALLBACK_BLOGS, total: FALLBACK_BLOGS.length };
    }
  },

  async getBlogBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE}/blogs/${slug}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      const blog = FALLBACK_BLOGS.find(b => b.slug === slug || b._id === slug) || FALLBACK_BLOGS[0];
      return { blog, recentBlogs: FALLBACK_BLOGS.filter(b => b._id !== blog._id) };
    }
  },

  // Contact
  async sendContactMessage(payload: any) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send message');
    return data;
  },

  // Newsletter
  async subscribeNewsletter(email: string) {
    const res = await fetch(`${API_BASE}/subscribers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to subscribe');
    return data;
  },

  // Reviews
  async getProductReviews(productId: string) {
    try {
      const res = await fetch(`${API_BASE}/reviews/${productId}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return [];
    }
  },

  async submitReview(payload: any) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit review');
    return data;
  },

  // Admin APIs
  async adminLogin(credentials: { email: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data.data;
  },

  async getAdminMe() {
    const res = await fetch(`${API_BASE}/auth/admin/me`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Unauthorized');
    return data.data;
  },

  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/orders/stats`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },

  async getAdminOrders(params?: Record<string, string>) {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(`${API_BASE}/admin/orders${qs}`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },

  async updateOrderStatus(orderId: string, updatePayload: any) {
    const res = await fetch(`${API_BASE}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updatePayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },

  async getAdminProducts(params?: Record<string, string>) {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    const res = await fetch(`${API_BASE}/admin/products${qs}`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },

  async createProduct(formData: FormData) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },

  async updateProduct(id: string, formData: FormData) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  },

  async getAdminSettings() {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.data;
  },

  async saveAdminSettings(settings: Record<string, any>) {
    const res = await fetch(`${API_BASE}/admin/settings/bulk`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(settings)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  }
};

