import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/AuthContext';

export function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  const { pathname } = useLocation();

  if(!user) {
    return <Navigate to="/login" state={{from: pathname}} />;
  }

  return children;
}
