import React, { useEffect, useState } from 'react';
import { Save, Check, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { api } from '../../services/api';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    brandName: 'GIWANSALLY',
    phone: '+91 8840091758',
    email: 'shubhamcoder@gmail.com',
    location: 'Banda, Uttar Pradesh, India',
    shippingCharge: 49,
    freeShippingMinimum: 499,
    codEnabled: true,
    instagramUrl: 'https://instagram.com/giwansally',
    facebookUrl: 'https://facebook.com/giwansally',
    youtubeUrl: 'https://youtube.com/@giwansally'
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getAdminSettings().then((data) => {
      if (data && Object.keys(data).length > 0) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    }).catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.saveAdminSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest">Store &amp; Brand Settings</h1>
        <p className="text-xs text-slate-500">Configure phone, shipping policies, and operational controls</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 text-xs">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base text-forest border-b border-slate-100 pb-2">
            Brand Identity &amp; Contact Desk
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-forest uppercase mb-1">Brand Name</label>
              <input
                type="text"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-forest uppercase mb-1">Customer Helpline Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-forest uppercase mb-1">Official Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block font-bold text-forest uppercase mb-1">Manufacturing City / State</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Shipping & COD Configurations */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif font-bold text-base text-forest border-b border-slate-100 pb-2">
            Shipping &amp; Cash on Delivery Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-forest uppercase mb-1">Standard Delivery Fee (₹)</label>
              <input
                type="number"
                value={settings.shippingCharge}
                onChange={(e) => setSettings({ ...settings, shippingCharge: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-forest uppercase mb-1">Free Shipping Order Minimum (₹)</label>
              <input
                type="number"
                value={settings.freeShippingMinimum}
                onChange={(e) => setSettings({ ...settings, freeShippingMinimum: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.codEnabled}
                  onChange={(e) => setSettings({ ...settings, codEnabled: e.target.checked })}
                  className="w-4 h-4 accent-forest"
                />
                <span className="font-bold text-forest text-sm">
                  Enable Cash on Delivery (COD) for public storefront checkout
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          {saved && (
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Settings updated successfully!
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="ml-auto bg-forest hover:bg-forest-dark text-cream font-bold px-8 py-3 rounded-xl uppercase tracking-wider transition shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-gold" />
            <span>{saving ? 'Saving...' : 'Save Website Settings'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

