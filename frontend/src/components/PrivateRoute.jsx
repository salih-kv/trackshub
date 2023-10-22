import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/welcome" />}</>;
};
