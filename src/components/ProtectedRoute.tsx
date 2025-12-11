import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingScreen } from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, authReady, loading } = useAuth();

  console.log('[ProtectedRoute] State:', { authReady, loading, authenticated: !!user });

  if (!authReady || loading) {
    console.log('[ProtectedRoute] Showing loading screen');
    return <LoadingScreen />;
  }

  if (!user) {
    console.log('[ProtectedRoute] Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('[ProtectedRoute] Rendering protected content');
  return <>{children}</>;
}
