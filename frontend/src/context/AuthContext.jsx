import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const authContext = createContext();

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
    <authContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
