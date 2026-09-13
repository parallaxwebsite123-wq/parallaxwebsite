import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // TEMPORARY — BACKEND NOT IMPLEMENTED
  const [isAuthenticated] = useState<boolean>(true);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-surface-bright flex items-center justify-center relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="ambient-blob blob-1"></div>
        </div>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin z-10"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
