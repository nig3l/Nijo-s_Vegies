import { useSession } from '@supabase/auth-helpers-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const session = useSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;