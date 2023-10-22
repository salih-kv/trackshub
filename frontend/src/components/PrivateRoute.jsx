import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/welcome" />}</>;
};
