import { createContext, useContext, useState } from "react";
import instance from "../axios/instance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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

  return (
    <UserContext.Provider value={{ fetchUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = () => {
  return useContext(UserContext);
};
