import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

export const ProtectedRouteUserUnloged = () => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const ProtectedRouteUserLoged = ({ children }) => {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to="/account" />;
  }

  return children;
};
