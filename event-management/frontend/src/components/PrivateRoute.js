import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    // Optionally, you can show a loading spinner or some placeholder content
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;