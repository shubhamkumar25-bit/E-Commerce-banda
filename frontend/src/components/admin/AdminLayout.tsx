import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-cream-light">
        <div className="w-10 h-10 border-4 border-gold border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  );
};

