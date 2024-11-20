import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login page if not authenticated
  }

  return children;
};

export default ProtectedRoute;
