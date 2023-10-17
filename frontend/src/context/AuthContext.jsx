import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token] = useState(Cookies.get("userToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  const login = (token) => {
    Cookies.set("userToken", token, {
      sameSite: "None",
      secure: true,
      expires: 7,
    });
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
