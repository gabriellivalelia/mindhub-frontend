import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './auth';

export default function UnauthRoute({ children }) {
  const auth = getToken();
  if (auth) return <Navigate to="/" replace />;
  return children;
}
