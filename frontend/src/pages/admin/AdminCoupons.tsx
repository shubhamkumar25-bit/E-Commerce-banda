import React, { useEffect, useState } from 'react';
import { Tag } from 'lucide-react';
import { api } from '../../services/api';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getAdminCoupons().then(setCoupons).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest">Discount Coupons &amp; Offers</h1>
          <p className="text-xs text-slate-500">Configure promotional discount codes</p>
        </div>
        {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</p>}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-6">Coupon Code</th>
              <th className="py-3 px-6">Discount Value</th>
              <th className="py-3 px-6">Min Order Value</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {coupons.map((cpn) => (
              <tr key={cpn._id} className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-6 font-mono font-bold text-forest text-sm flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" />
                  <span>{cpn.code}</span>
                </td>
                <td className="py-4 px-6 font-bold text-slate-800">
                  {cpn.type === 'percentage' ? `${cpn.value}% OFF` : `₹${cpn.value} FLAT`}
                </td>
                <td className="py-4 px-6 text-slate-600">₹{cpn.minOrderValue}</td>
                <td className="py-4 px-6 text-slate-500">{cpn.description}</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                    Active
                  </span>
                </td>
              </tr>
            ))}
            {!coupons.length && <tr><td colSpan={5} className="py-8 text-center text-slate-400">No coupons configured.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
