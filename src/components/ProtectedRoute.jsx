import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./ui/Loader.jsx";
import { ROLE_DASHBOARDS } from "../utils/constants";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullPage text="Authenticating..." />;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_DASHBOARDS[user.role] || "/"} replace />;
  }

  return children;
};
export default ProtectedRoute;
