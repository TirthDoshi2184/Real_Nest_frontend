import { Navigate, useLocation } from 'react-router-dom';
import React from 'react'

const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem('user')) || {};
  const isAuthenticated = !!auth.token;
  const userRole = auth.role;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
