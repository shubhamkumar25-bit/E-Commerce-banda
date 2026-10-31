import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Layers } from 'lucide-react';
import { api } from '../../services/api';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then((data) => {
      setCategories(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest">Category Management</h1>
          <p className="text-xs text-slate-500">Organize GIWANSALLY herbal product lines</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-6">Category Name</th>
              <th className="py-3 px-6">Slug</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-6 font-bold text-forest text-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
                    <Layers className="w-4 h-4 text-gold" />
                  </div>
                  <span>{cat.name}</span>
                </td>
                <td className="py-4 px-6 font-mono text-slate-500">
                  {cat.slug}
                </td>
                <td className="py-4 px-6 text-slate-600 max-w-xs">
                  {cat.description || 'Ayurvedic formulations'}
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

