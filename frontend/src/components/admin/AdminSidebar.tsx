import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  BookOpen,
  Star,
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Blogs & Articles', path: '/admin/blogs', icon: BookOpen },
    { name: 'Customer Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-forest-dark text-cream flex flex-col h-screen sticky top-0 border-r border-gold/20 shrink-0">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-cream/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-icon.svg" alt="GIWANSALLY Emblem" className="w-9 h-9" />
          <div>
            <h2 className="font-serif font-bold text-white tracking-wider text-base">GIWANSALLY</h2>
            <p className="text-[10px] text-gold uppercase tracking-widest font-semibold">Admin CMS</p>
          </div>
        </div>
      </div>

      {/* Admin User Info */}
      <div className="px-6 py-3 bg-forest/40 border-b border-cream/10 text-xs">
        <p className="text-white font-bold truncate">{admin?.name || 'Administrator'}</p>
        <p className="text-[10px] text-gold truncate">{admin?.email || 'admin@giwansally.com'}</p>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                isActive
                  ? 'bg-gold text-forest-dark shadow-sm'
                  : 'text-cream/80 hover:text-white hover:bg-forest'
              }`
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-cream/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-semibold text-cream/70 hover:text-white hover:bg-forest transition"
        >
          <span>View Public Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-300 hover:text-red-100 hover:bg-red-900/40 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
};

