import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  IndianRupee,
  Eye
} from 'lucide-react';
import { api } from '../../services/api';
import { Order, Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getAdminStats(),
      api.getAdminOrders({ limit: '6' }),
      api.getAdminProducts({ limit: '100' })
    ]).then(([statsData, ordersData, prodData]) => {
      setStats({
        totalOrders: statsData?.totalOrders || 0,
        pendingOrders: statsData?.pendingOrders || 0,
        deliveredOrders: statsData?.deliveredOrders || 0,
        totalRevenue: statsData?.totalRevenue || 0
      });
      setRecentOrders(ordersData?.orders || []);

      const lowStock = (prodData?.products || []).filter((p: Product) => p.stock <= 10);
      setLowStockProducts(lowStock);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-forest">
            Store Performance Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            JEEVAN SHAILI Ayurvedic Dant Manjan • Banda, UP Operations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="bg-forest hover:bg-forest-dark text-cream font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition shadow flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-gold" />
            <span>Manage Products</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-forest">
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Direct Store Sales
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-gold" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-forest">
            {stats.totalOrders}
          </p>
          <p className="text-[11px] text-slate-500 font-semibold">
            Razorpay + Cash on Delivery
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Dispatch</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-700">
            {stats.pendingOrders}
          </p>
          <Link to="/admin/orders?status=placed" className="text-[11px] text-amber-700 font-bold hover:underline">
            View pending orders →
          </Link>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Delivered Orders</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-forest">
            {stats.deliveredOrders}
          </p>
          <p className="text-[11px] text-emerald-600 font-bold">
            Delivered successfully across India
          </p>
        </div>

      </div>

      {/* Low Stock Warning Alert if any */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Low Inventory Notice:</strong> {lowStockProducts.length} product(s) have 15 or fewer units in the Banda warehouse.
            </span>
          </div>
          <Link to="/admin/products" className="font-bold underline text-amber-900 shrink-0">
            Update Stock
          </Link>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-forest">Recent Customer Orders</h3>
            <p className="text-xs text-slate-400">Latest transactions from public storefront</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-forest hover:text-gold flex items-center gap-1 transition"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Payment</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No orders placed yet. Orders will appear here live when placed by customers.
                  </td>
                </tr>
              ) : (
                recentOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-mono font-bold text-forest">
                      {ord.orderId}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{ord.customer.name}</p>
                      <p className="text-[11px] text-slate-400">{ord.customer.mobile}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.paymentMethod.toUpperCase()} ({ord.paymentStatus})
                      </span>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-forest">
                      ₹{ord.pricing.total}
                    </td>
                    <td className="py-4 px-6">
                      <span className="capitalize font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full text-[11px]">
                        {ord.orderStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to="/admin/orders"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-forest hover:bg-slate-100 transition inline-block"
                        title="Manage Order"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
