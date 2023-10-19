import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axios/instance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await instance.get("/api/v1/user/");
      setUser((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await instance.post("/api/v1/user/", userData);
      setUser((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => {
  return useContext(UserContext);
};
