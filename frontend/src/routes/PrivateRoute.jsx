import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
};
