import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useAuth();

  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    // If user is not an admin, redirect to home page
    return <Navigate to="/" />;
  }

  // If user is authenticated and has the required role, render the children
  return children;
};

export default ProtectedRoute;