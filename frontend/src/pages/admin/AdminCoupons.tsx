import React, { useState } from 'react';
import { Tag, Plus, Check } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState([
    { code: 'AYURVEDA50', type: 'fixed', value: 50, minOrderValue: 499, description: 'Flat ₹50 OFF on orders above ₹499' },
    { code: 'FIRSTBUY10', type: 'percentage', value: 10, minOrderValue: 249, description: '10% OFF on first Ayurvedic order' },
    { code: 'BANDAHERBAL', type: 'percentage', value: 15, minOrderValue: 699, description: '15% festival discount on ₹699+' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-forest">Discount Coupons &amp; Offers</h1>
          <p className="text-xs text-slate-500">Configure promotional discount codes</p>
        </div>
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
            {coupons.map((cpn, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition">
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

