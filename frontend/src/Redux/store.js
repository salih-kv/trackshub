import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import projectReducer from "./slices/projectSlice";
import postReducer from "./slices/postSlice";
import taskReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    post: postReducer,
    task: taskReducer,
  },
  devTools: true,
});

export default store;
