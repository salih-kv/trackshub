import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import projectReducer from "./project/projectSlice";
import postReducer from "./post/postSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    post: postReducer,
  },
  devTools: true,
});

export default store;
