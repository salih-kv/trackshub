import { createContext, useContext, useState } from "react";
import instance from "../axios/instance";

const userContext = createContext();

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
    <userContext.Provider value={{ user, fetchUser, updateUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserState = () => {
  return useContext(userContext);
};
