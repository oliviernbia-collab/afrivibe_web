import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

export function ProtectedRoute() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function AdminRoute() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  if (!['admin', 'moderator', 'finance', 'support'].includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
