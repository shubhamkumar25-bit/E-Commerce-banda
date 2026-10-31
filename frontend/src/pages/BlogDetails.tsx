import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { Blog } from '../types';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);

    api.getBlogBySlug(slug)
      .then((data) => {
        setBlog(data.blog);
        setRecentBlogs(data.recentBlogs || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-gold border-t-forest rounded-full animate-spin mx-auto mb-4" />
        <p className="text-forest font-serif font-bold">Loading Ayurvedic Article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-forest">Article Not Found</h2>
        <Link to="/blog" className="inline-block bg-forest text-cream font-bold px-6 py-2 rounded-full text-xs">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Back button */}
      <div>
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-gold transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-gold-dark">
          <span className="bg-gold/15 px-3 py-1 rounded-full border border-gold/30">{blog.tags[0] || 'Ayurveda'}</span>
          <span>•</span>
          <span className="text-slate-500 font-normal">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-forest tracking-tight leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-cream-dark">
          <span className="font-bold text-forest">By {blog.author}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-cream-light border border-cream-dark shadow-sm">
        <img
          src={blog.image || '/images/products/bottle-botanicals.png'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-cream-dark shadow-sm space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
        <p className="font-serif text-lg font-bold text-forest leading-relaxed italic border-l-4 border-gold pl-4">
          {blog.excerpt}
        </p>

        <div className="prose prose-emerald max-w-none space-y-4 whitespace-pre-line">
          {blog.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-cream-dark flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-forest">Tags:</span>
          {blog.tags.map((t, idx) => (
            <span key={idx} className="bg-cream text-forest text-xs font-semibold px-3 py-1 rounded-full border border-cream-dark">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-forest to-forest-dark text-cream p-8 rounded-3xl shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-xl font-bold text-white">Experience GIWANSALLY Liquid Manjan</h3>
          <p className="text-xs text-cream/80">Gentle on enamel, powerful on oral bacteria. Formulated in Banda, UP.</p>
        </div>
        <Link
          to="/shop"
          className="bg-gold hover:bg-gold-light text-forest-dark font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition shrink-0"
        >
          Shop Now
        </Link>
      </div>

    </div>
  );
};

