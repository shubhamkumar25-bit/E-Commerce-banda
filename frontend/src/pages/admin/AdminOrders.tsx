import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  X,
  ExternalLink
} from 'lucide-react';
import { api } from '../../services/api';
import { Order } from '../../types';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status update modal state
  const [newStatus, setNewStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [courierName, setCourierName] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const loadOrders = () => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (statusFilter !== 'all') params.status = statusFilter;
    if (searchTerm) params.search = searchTerm;

    api.getAdminOrders(params)
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const openOrderModal = (ord: Order) => {
    setSelectedOrder(ord);
    setNewStatus(ord.orderStatus);
    setNewPaymentStatus(ord.paymentStatus);
    setCourierName(ord.courierName || 'Delhivery');
    setTrackingNumber(ord.trackingNumber || '');
    setStatusNote('');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      await api.updateOrderStatus(selectedOrder._id, {
        orderStatus: newStatus,
        paymentStatus: newPaymentStatus,
        courierName: courierName.trim() || undefined,
        trackingNumber: trackingNumber.trim() || undefined,
        note: statusNote.trim() || undefined
      });
      setSelectedOrder(null);
      loadOrders();
    } catch (err: any) {
      alert(err.message || 'Failed to update order');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest">Customer Orders &amp; Fulfillment</h1>
        <p className="text-xs text-slate-500">Track and dispatch customer parcels from Banda, UP hub</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadOrders()}
            placeholder="Search by Order ID, Customer name or Mobile..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs">
          <Filter className="w-4 h-4 text-gold shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-forest text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-gold"
          >
            <option value="all">All Statuses</option>
            <option value="placed">Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer &amp; Mobile</th>
                <th className="py-3 px-6">City / State</th>
                <th className="py-3 px-6">Payment Method</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Order Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No orders matching your criteria found.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-mono font-bold text-forest">
                      {ord.orderId}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{ord.customer.name}</p>
                      <p className="text-[11px] text-slate-400">{ord.customer.mobile}</p>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {ord.shippingAddress.city}, {ord.shippingAddress.state}
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
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => openOrderModal(ord)}
                        className="bg-forest text-cream font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-forest-dark transition shadow-sm"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Manage Order</span>
                <h3 className="font-mono font-bold text-lg text-forest">{selectedOrder.orderId}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <p className="font-bold text-forest uppercase text-[10px]">Customer Details</p>
                <p className="font-semibold text-slate-800 mt-1">{selectedOrder.customer.name}</p>
                <p className="text-slate-600">{selectedOrder.customer.mobile}</p>
                {selectedOrder.customer.email && <p className="text-slate-500">{selectedOrder.customer.email}</p>}
              </div>

              <div>
                <p className="font-bold text-forest uppercase text-[10px]">Shipping Address</p>
                <p className="text-slate-700 mt-1">
                  {selectedOrder.shippingAddress.house}, {selectedOrder.shippingAddress.street}<br />
                  {selectedOrder.shippingAddress.landmark ? `${selectedOrder.shippingAddress.landmark}, ` : ''}
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                </p>
              </div>
            </div>

            {/* Items summary */}
            <div className="space-y-2">
              <p className="font-bold text-forest uppercase text-xs">Ordered Products</p>
              <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl p-3">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{it.name}</p>
                      <p className="text-[10px] text-slate-400">Qty: {it.quantity} • {it.volume}</p>
                    </div>
                    <span className="font-extrabold text-forest">₹{(it.salePrice || it.price) * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-2 border-t border-slate-100 text-xs">
              <h4 className="font-bold text-forest uppercase tracking-wider">Update Dispatch &amp; Tracking</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Order Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
                  >
                    <option value="placed">Order Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Payment Status</label>
                  <select
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-bold"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Courier Partner</label>
                  <input
                    type="text"
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    placeholder="e.g. Delhivery, BlueDart, DTDC"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-forest uppercase mb-1">Courier Tracking / AWB</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. 12948291048"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold font-mono font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-forest uppercase mb-1">Internal Note (Optional)</label>
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="e.g. Dispatched via Banda main post office"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-forest hover:bg-forest-dark text-cream font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider transition shadow"
                >
                  Save Status Update
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

