import React, { useEffect, useState } from 'react';
import { Edit, ImagePlus, Layers, Plus, Trash2, X } from 'lucide-react';
import { api, resolveImageUrl } from '../../services/api';
import { Category } from '../../types';

type CategoryForm = {
  nameEnglish: string;
  nameHindi: string;
  descriptionEnglish: string;
  descriptionHindi: string;
  sortOrder: string;
  isActive: boolean;
  image: File | null;
};

const emptyForm: CategoryForm = {
  nameEnglish: '', nameHindi: '', descriptionEnglish: '', descriptionHindi: '', sortOrder: '0', isActive: true, image: null
};

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const loadCategories = () => {
    setLoading(true);
    api.getAdminCategories().then((data) => setCategories(data || [])).catch((err) => setError(err.message)).finally(() => setLoading(false));
  };

  useEffect(loadCategories, []);

  const openForm = (category?: Category) => {
    setEditing(category || null);
    setForm(category ? {
      nameEnglish: category.nameEnglish || category.name,
      nameHindi: category.nameHindi || '',
      descriptionEnglish: category.descriptionEnglish || category.description || '',
      descriptionHindi: category.descriptionHindi || '',
      sortOrder: String(category.sortOrder || 0),
      isActive: category.isActive,
      image: null
    } : emptyForm);
    setFormOpen(true);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData();
    data.append('nameEnglish', form.nameEnglish.trim());
    data.append('nameHindi', form.nameHindi.trim());
    data.append('descriptionEnglish', form.descriptionEnglish.trim());
    data.append('descriptionHindi', form.descriptionHindi.trim());
    data.append('sortOrder', form.sortOrder);
    data.append('isActive', String(form.isActive));
    if (form.image) data.append('image', form.image);
    try {
      if (editing) await api.updateCategory(editing._id, data);
      else await api.createCategory(data);
      setFormOpen(false);
      loadCategories();
    } catch (err: any) {
      setError(err.message || 'Unable to save category');
    }
  };

  const remove = async (category: Category) => {
    if (!window.confirm(`Delete "${category.nameEnglish || category.name}"? Categories with assigned products cannot be deleted.`)) return;
    try {
      await api.deleteCategory(category._id);
      loadCategories();
    } catch (err: any) {
      setError(err.message || 'Unable to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest">Category Management</h1>
          <p className="text-xs text-slate-500">Manage bilingual categories shown in the storefront navigation.</p>
        </div>
        <button type="button" onClick={() => openForm()} className="flex items-center gap-2 self-start rounded-xl bg-forest px-4 py-2.5 text-xs font-bold uppercase text-white">
          <Plus className="h-4 w-4 text-gold" /> Add Category
        </button>
      </div>

      {error && <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"><span>{error}</span><button type="button" onClick={() => setError('')}><X className="h-4 w-4" /></button></div>}

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? <p className="p-8 text-sm text-slate-500">Loading categories…</p> : (
          <div className="divide-y divide-slate-100">
            {categories.map((category) => (
              <div key={category._id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  {category.image ? <img src={resolveImageUrl(category.image)} alt="" className="h-12 w-12 rounded-xl object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10"><Layers className="h-5 w-5 text-gold" /></div>}
                  <div className="min-w-0">
                    <p className="truncate font-bold text-forest">{category.nameEnglish || category.name}</p>
                    {category.nameHindi && <p className="truncate text-sm text-slate-500">{category.nameHindi}</p>}
                    <p className="truncate text-xs text-slate-400">{category.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${category.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{category.isActive ? 'Active' : 'Inactive'}</span>
                  <button type="button" onClick={() => openForm(category)} className="rounded-lg p-2 text-slate-500 hover:bg-cream hover:text-forest" aria-label="Edit category"><Edit className="h-4 w-4" /></button>
                  <button type="button" onClick={() => remove(category)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label="Delete category"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
            {!categories.length && <p className="p-8 text-sm text-slate-500">No categories found.</p>}
          </div>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <form onSubmit={submit} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between"><h2 className="font-serif text-xl font-bold text-forest">{editing ? 'Edit Category' : 'Add Category'}</h2><button type="button" onClick={() => setFormOpen(false)}><X className="h-5 w-5 text-slate-500" /></button></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-forest">English Name<input required value={form.nameEnglish} onChange={(e) => setForm({ ...form, nameEnglish: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-gold" /></label>
              <label className="text-xs font-bold text-forest">Hindi Name<input value={form.nameHindi} onChange={(e) => setForm({ ...form, nameHindi: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-gold" /></label>
              <label className="text-xs font-bold text-forest">English Description<textarea value={form.descriptionEnglish} onChange={(e) => setForm({ ...form, descriptionEnglish: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-gold" /></label>
              <label className="text-xs font-bold text-forest">Hindi Description<textarea value={form.descriptionHindi} onChange={(e) => setForm({ ...form, descriptionHindi: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-gold" /></label>
              <label className="text-xs font-bold text-forest">Sort Order<input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-gold" /></label>
              <label className="flex items-center gap-2 pt-6 text-xs font-bold text-forest"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active category</label>
              <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-forest sm:col-span-2"><ImagePlus className="h-4 w-4 text-gold" /> Upload category image<input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} className="hidden" /></label>
            </div>
            <button type="submit" className="mt-6 w-full rounded-xl bg-forest py-3 text-xs font-bold uppercase tracking-wider text-white">Save Category</button>
          </form>
        </div>
      )}
    </div>
  );
};
