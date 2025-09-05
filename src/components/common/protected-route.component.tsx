import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin }: Props) {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isLoggedIn) {
    // chưa login → về trang login
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // login rồi nhưng không phải admin → về home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
