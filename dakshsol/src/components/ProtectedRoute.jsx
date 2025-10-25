import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

// Component to protect user routes
export const ProtectedRoute = () => {
  const { userInfo, loading } = useAuth();
  
  if (loading) return <Loader />; // Or a simple spinner

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

// Component to protect admin routes
export const AdminRoute = () => {
  const { userInfo, loading, isAdmin } = useAuth();

  if (loading) return <Loader />;

  // User must be logged in AND an Admin
  return userInfo && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace /> // Redirect non-admins
  );
};