import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleProtectedRoute = ({
  children,
  allowedRoles,
}: RoleProtectedRouteProps) => {
  const { user, userProfile } = useAuth();

  // not logged in
  if (!user) {
    return <Navigate to="/user-login" replace />;
  }

  // profile not loaded yet
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  // role check
  if (!allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
