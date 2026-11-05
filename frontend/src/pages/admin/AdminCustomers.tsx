import React, { useEffect, useState } from 'react';
import { Users, Search, Phone, Mail, MapPin } from 'lucide-react';
import { api } from '../../services/api';

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAdminCustomers().then((data) => {
      setCustomers(data.customers || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest">Customer Directory</h1>
        <p className="text-xs text-slate-500">View customer purchases and delivery locations</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-6">Customer Name</th>
              <th className="py-3 px-6">Mobile Number</th>
              <th className="py-3 px-6">City / State</th>
              <th className="py-3 px-6">Orders Placed</th>
              <th className="py-3 px-6 text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  Customer records will populate automatically as orders are placed.
                </td>
              </tr>
            ) : (
              customers.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6 font-bold text-forest flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold" />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-medium">{c.mobile}</td>
                  <td className="py-4 px-6 text-slate-600">{c.city}, {c.state}</td>
                  <td className="py-4 px-6">
                    <span className="bg-forest/10 text-forest px-2.5 py-0.5 rounded-full font-bold text-[11px]">
                      {c.totalOrders} order(s)
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-extrabold text-forest">
                    ₹{c.totalSpent}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
