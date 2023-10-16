import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userToken = Cookies.get("userToken");
  const [isLoggedIn, setIsLoggedIn] = useState(userToken ? true : false);

  const login = () => {
    // Implement login logic here, e.g., check user credentials
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("userToken", {
      sameSite: "None",
      secure: true,
    });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
