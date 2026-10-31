import React, { useEffect, useState } from 'react';
import { BookOpen, Plus, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { Blog } from '../../types';

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogs().then((data) => {
      setBlogs(data.blogs || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest">Ayurvedic Journal &amp; Articles</h1>
          <p className="text-xs text-slate-500">Publish educational oral health guides</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-6">Article Title</th>
              <th className="py-3 px-6">Author</th>
              <th className="py-3 px-6">Tag</th>
              <th className="py-3 px-6">Published</th>
              <th className="py-3 px-6 text-right">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {blogs.map((b) => (
              <tr key={b._id} className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-6 font-bold text-forest text-sm max-w-sm truncate">
                  {b.title}
                </td>
                <td className="py-4 px-6 text-slate-600">{b.author}</td>
                <td className="py-4 px-6">
                  <span className="bg-cream text-forest px-2 py-0.5 rounded text-[10px] font-bold">
                    {b.tags[0] || 'Ayurveda'}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-400">
                  {new Date(b.publishedAt || b.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-right">
                  <a
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-forest hover:text-gold transition inline-flex items-center gap-1 font-bold text-xs"
                  >
                    <span>Read</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

