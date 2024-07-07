import React,{ReactElement} from 'react';
import { Navigate } from 'react-router-dom';
import useCheckAuth from '../utils/hooks/useCheckAuth';
interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute = ({ element }:ProtectedRouteProps) => {
  const { isAuthenticated } = useCheckAuth();
  

  return isAuthenticated ? element : <Navigate to="/accessdenied" />;
};

export default ProtectedRoute;