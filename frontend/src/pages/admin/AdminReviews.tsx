import React, { useState } from 'react';
import { Star, Check, Trash2 } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState([
    {
      _id: 'rev_1',
      productName: 'GIWANSALLY Ayurvedic Liquid Manjan (Classic 100ml)',
      customerName: 'Rajesh Verma (Lucknow)',
      rating: 5,
      comment: 'Bleeding gums stopped within 10 days of gentle swishing. Highly effective!',
      isApproved: true
    },
    {
      _id: 'rev_2',
      productName: 'GIWANSALLY Ayurvedic Liquid Manjan (Classic 100ml)',
      customerName: 'Priya Tiwari (Kanpur)',
      rating: 5,
      comment: 'Zero enamel abrasion and very clean packaging from Banda. 5 stars!',
      isApproved: true
    },
    {
      _id: 'rev_3',
      productName: 'GIWANSALLY Liquid Manjan - Gum Defence',
      customerName: 'Sunita Mishra (Varanasi)',
      rating: 5,
      comment: 'Great sensitivity relief from cold water tingling.',
      isApproved: true
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest">Customer Review Moderation</h1>
        <p className="text-xs text-slate-500">Moderate feedback before displaying on product pages</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Product</th>
              <th className="py-3 px-6">Rating</th>
              <th className="py-3 px-6">Feedback Comment</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {reviews.map((r) => (
              <tr key={r._id} className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-6 font-bold text-slate-800">{r.customerName}</td>
                <td className="py-4 px-6 text-forest font-semibold">{r.productName}</td>
                <td className="py-4 px-6 text-amber-500 font-bold">{'★'.repeat(r.rating)}</td>
                <td className="py-4 px-6 text-slate-600 max-w-sm">{r.comment}</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                    Approved
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

