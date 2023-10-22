import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token] = useState(Cookies.get("userToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  const login = (token) => {
    Cookies.set("userToken", token, {
      sameSite: "None",
      secure: true,
      expires: 1,
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
