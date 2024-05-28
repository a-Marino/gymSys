import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

export const ProtectedRouteUserUnloged = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const ProtectedRouteUserLoged = ({ children }) => {
  const { user } = UserAuth();

  if (user) {
    return <Navigate to="/account" />;
  }

  return children;
};
