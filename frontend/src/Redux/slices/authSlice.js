import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialToken = Cookies.get("userToken");

const initialState = {
  isLoggedIn: !!initialToken,
  userToken: initialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userToken = action.payload;
      Cookies.set("userToken", action.payload, {
        sameSite: "None",
        secure: true,
        expires: 1,
      });
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userToken = null;
      Cookies.remove("userToken", {
        sameSite: "None",
        secure: true,
      });
    },
  },
});

// createSlice automatically generates an action creator function
export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
