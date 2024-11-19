import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check if the token exists

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login page if not authenticated
  }

  return children; // Render the protected content
};

export default ProtectedRoute;
