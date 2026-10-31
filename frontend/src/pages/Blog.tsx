import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag, Search } from 'lucide-react';
import { api } from '../services/api';
import { Blog } from '../types';

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag') || '';

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (activeTag) params.tag = activeTag;

    api.getBlogs(params).then((data) => {
      setBlogs(data.blogs || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [activeTag]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
          Ayurvedic Oral Wellness Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-forest">
          Ancient Wisdom for Modern Oral Health
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Learn about the science of liquid manjan, botanical ingredient benefits, and Ayurvedic Dinacharya rituals for whole-body wellness.
        </p>
      </div>

      {/* Tag filter bar */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
            !activeTag ? 'bg-forest text-cream' : 'bg-cream text-forest hover:bg-cream-dark'
          }`}
        >
          All Topics
        </button>
        {['Liquid Manjan', 'Ayurveda', 'Enamel Protection', 'Clove Oil', 'Dinacharya'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchParams({ tag })}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              activeTag === tag ? 'bg-forest text-cream' : 'bg-cream text-forest hover:bg-cream-dark'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-white rounded-3xl animate-pulse border border-cream-dark" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-cream-dark">
          <p className="text-forest font-serif font-bold text-lg">No Articles Found for this topic</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog._id} className="bg-white rounded-3xl overflow-hidden border border-cream-dark hover:border-gold/50 shadow-sm flex flex-col h-full group">
              <Link to={`/blog/${blog.slug}`} className="block aspect-[16/10] overflow-hidden bg-cream-light">
                <img
                  src={blog.image || '/images/products/bottle-botanicals.png'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gold-dark">
                    <span>{blog.tags[0] || 'Ayurveda'}</span>
                    <span>•</span>
                    <span className="text-slate-400 font-normal">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="font-serif font-bold text-lg text-forest group-hover:text-gold-dark transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-cream-dark/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium truncate max-w-[150px]">{blog.author}</span>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="font-bold text-forest hover:text-gold flex items-center gap-1 transition"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};

