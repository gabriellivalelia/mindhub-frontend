import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './auth';

export default function ProtectedRoute({ children }) {
  const auth = getToken();
  if (!auth) return <Navigate to="/unauthorized" replace />;
  return children;
}
