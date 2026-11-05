import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
  Package,
  Star,
  Flame,
  AlertTriangle,
  Upload
} from 'lucide-react';
import { api } from '../../services/api';
import { Product, Category } from '../../types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    salePrice: '',
    volume: 'Tooth powder',
    stock: '100',
    shortDescription: '',
    description: '',
    howToUse: 'Use according to the instructions on the product packaging.',
    storage: '',
    manufacturingInfo: 'JEEVAN SHAILI PVT. LTD., Bangalipura, Banda, Uttar Pradesh, India.',
    expiryInfo: '',
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
    imageUrl: ''
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([api.getAdminProducts(), api.getAdminCategories()]).then(([prodData, catData]) => {
      setProducts(prodData.products || []);
      setCategories(catData || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0]?._id || '',
      price: '',
      salePrice: '',
      volume: 'Tooth powder',
      stock: '100',
      shortDescription: '',
      description: '',
      howToUse: 'Use according to the instructions on the product packaging.',
      storage: '',
      manufacturingInfo: 'JEEVAN SHAILI PVT. LTD., Bangalipura, Banda, Uttar Pradesh, India.',
      expiryInfo: '',
      isFeatured: false,
      isBestSeller: false,
      isActive: true,
      imageUrl: '/images/products/jeevan-shaili-dant-manjan.jpg'
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    const catId = typeof p.category === 'object' ? p.category._id : p.category;
    setFormData({
      name: p.name,
      category: catId || categories[0]?._id || '',
      price: String(p.price),
      salePrice: p.salePrice ? String(p.salePrice) : '',
      volume: p.volume || '100ml',
      stock: String(p.stock),
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      howToUse: p.howToUse || '',
      storage: p.storage || '',
      manufacturingInfo: p.manufacturingInfo || '',
      expiryInfo: p.expiryInfo || '',
      isFeatured: p.isFeatured || false,
      isBestSeller: p.isBestSeller || false,
      isActive: p.isActive !== undefined ? p.isActive : true,
      imageUrl: p.images[0] || '/images/products/jeevan-shaili-dant-manjan.jpg'
    });
    setModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('category', formData.category);
    dataToSend.append('price', formData.price);
    if (formData.salePrice) dataToSend.append('salePrice', formData.salePrice);
    dataToSend.append('volume', formData.volume);
    dataToSend.append('stock', formData.stock);
    dataToSend.append('shortDescription', formData.shortDescription);
    dataToSend.append('description', formData.description);
    dataToSend.append('howToUse', formData.howToUse);
    dataToSend.append('storage', formData.storage);
    dataToSend.append('manufacturingInfo', formData.manufacturingInfo);
    dataToSend.append('expiryInfo', formData.expiryInfo);
    dataToSend.append('isFeatured', String(formData.isFeatured));
    dataToSend.append('isBestSeller', String(formData.isBestSeller));
    dataToSend.append('isActive', String(formData.isActive));
    if (formData.imageUrl) dataToSend.append('imageUrl', formData.imageUrl);

    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct._id, dataToSend);
      } else {
        await api.createProduct(dataToSend);
      }
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Error saving product');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.deleteProduct(id);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest">Product Management</h1>
          <p className="text-xs text-slate-500">Manage JEEVAN SHAILI Ayurvedic Dant Manjan products</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-forest hover:bg-forest-dark text-cream font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
          />
        </div>
        <span className="text-xs font-bold text-slate-500">
          Showing {filtered.length} product(s)
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6">Badges</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((prod) => (
                <tr key={prod._id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={prod.images[0] || '/images/products/jeevan-shaili-dant-manjan.jpg'}
                      alt={prod.name}
                      className="w-12 h-12 object-contain p-1 bg-cream-light rounded-xl border border-cream-dark shrink-0"
                    />
                    <div>
                      <p className="font-bold text-forest text-sm line-clamp-1">{prod.name}</p>
                      <p className="text-[11px] text-slate-400">Vol: {prod.volume} • SKU: {prod.sku || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-extrabold text-forest">₹{prod.salePrice || prod.price}</span>
                    {prod.salePrice && (
                      <span className="ml-1.5 text-[11px] text-slate-400 line-through">₹{prod.price}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      prod.stock <= 10 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {prod.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-1.5">
                      {prod.isFeatured && (
                        <span className="bg-gold/20 text-gold-dark px-2 py-0.5 rounded text-[10px] font-bold">Featured</span>
                      )}
                      {prod.isBestSeller && (
                        <span className="bg-forest/10 text-forest px-2 py-0.5 rounded text-[10px] font-bold">Best Seller</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      prod.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {prod.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 text-slate-500 hover:text-forest hover:bg-slate-100 rounded-lg transition"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id, prod.name)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add / Edit Product */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-serif font-bold text-lg text-forest">
                {editingProduct ? 'Edit Product' : 'Add New Ayurvedic Formulation'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-forest uppercase mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jeevan Shaili Ayurvedic Dant Manjan"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Volume / Packaging</label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="e.g. 100ml"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Regular Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 299"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Sale Discounted Price (₹)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="e.g. 249"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Available Stock (Units) *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="e.g. 150"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Product Mockup Image Path</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/products/jeevan-shaili-dant-manjan.jpg"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-forest uppercase mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Concise 1-sentence product summary"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-forest uppercase mb-1">Full Ayurvedic Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed explanation of formulation, herbs, and benefits"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="accent-forest"
                    />
                    <span className="font-bold text-forest">Mark as Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="accent-forest"
                    />
                    <span className="font-bold text-forest">Mark as Best Seller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="accent-forest"
                    />
                    <span className="font-bold text-forest">Active for Sale</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-forest hover:bg-forest-dark text-cream font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider transition shadow"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
