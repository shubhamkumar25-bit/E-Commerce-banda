import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@giwansally.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await api.adminLogin({ email: email.trim(), password });
      login(data.token, data.admin);
      navigate(from, { replace: true });
    } catch (err: any) {
      // If backend offline or credentials mock fallback for smooth testing
      if (email.trim().toLowerCase() === 'admin@giwansally.com' && password === 'Admin@123') {
        login('mock_admin_jwt_token', {
          id: 'admin_1',
          name: 'GIWANSALLY Admin',
          email: 'admin@giwansally.com',
          role: 'superadmin'
        });
        navigate(from, { replace: true });
      } else {
        setError(err.message || 'Invalid credentials. Default: admin@giwansally.com / Admin@123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-forest/10 mx-auto flex items-center justify-center">
            <img src="/logo-icon.svg" alt="GIWANSALLY" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-forest">GIWANSALLY Admin Portal</h1>
          <p className="text-xs text-slate-500">Secure store &amp; order management console</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-forest uppercase mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@giwansally.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-forest uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Quick Demo Credentials Reminder */}
          <div className="p-3 bg-cream-light rounded-xl border border-cream-dark text-[11px] text-slate-600 space-y-1">
            <p className="font-bold text-forest">Default Store Credentials:</p>
            <p>Email: <code className="text-forest font-bold">admin@giwansally.com</code></p>
            <p>Password: <code className="text-forest font-bold">Admin@123</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest hover:bg-forest-dark text-cream font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-slate-500 hover:text-forest transition">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};

