import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = useSelector((state) => state.user.user);
  return !auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
