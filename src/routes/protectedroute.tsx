import React,{ReactElement} from 'react';
import { Navigate } from 'react-router-dom';
import useCheckAuth from '../utils/hooks/useCheckAuth';
interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute = ({ element }:ProtectedRouteProps) => {
  const { isAuthenticated,isLoading } = useCheckAuth();
  
  if(isLoading) return <div></div>
  else
  return isAuthenticated === true ? element : <Navigate to="/accessdenied" />;
};

export default ProtectedRoute;