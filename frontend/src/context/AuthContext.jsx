import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import instance from "../axios/instance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token] = useState(Cookies.get("userToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const responseOne = await instance.get("/api/v1/user/account");
      setUser((prev) => ({
        ...prev,
        ...responseOne.data,
      }));

      const responseTwo = await instance.get("/api/v1/profile/");
      setUser((prev) => ({
        ...prev,
        ...responseTwo.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const login = (token) => {
    Cookies.set("userToken", token, {
      sameSite: "None",
      secure: true,
      expires: 7,
    });
    fetchUser();
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
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
