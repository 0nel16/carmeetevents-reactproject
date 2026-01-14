import { Navigate, useLocation } from 'react-router';
import { useAuthContext } from '../../features/Auth/AuthContext';

export function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  const { pathname } = useLocation();

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login', { state: { from: pathname } });
  //   }
  // }, [user, navigate]);

  if(!user) {
    return <Navigate to="/login" state={{from: pathname}} />;
  }

  return children;
}
