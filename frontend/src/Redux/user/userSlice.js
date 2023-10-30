import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await instance.get("/api/v1/user/");
  return response.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const response = await instance.post("/api/v1/user/", userData);
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (newPassword) => {
    const response = await instance.post(
      "/api/v1/user/reset-password",
      newPassword
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async () => {
  const response = await instance.delete("/api/v1/user/");
  return response.data;
});

export const fetchNotLoggedInUser = createAsyncThunk(
  "user/fetchNotLoggedInUser",
  async (username) => {
    const response = await instance.get(`/api/v1/user${username}`);
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (followedId) => {
    const response = await instance.post("/api/v1/user/follow", {
      followedId,
    });
    return response.data;
  }
);

const handleAsyncAction = (builder, action, stateKey) => {
  builder
    .addCase(action.fulfilled, (state, action) => {
      state[stateKey] = action.payload;
      state.loading = false;
    })
    .addCase(action.pending, (state) => {
      state.loading = true;
    })
    .addCase(action.rejected, (state) => {
      state.loading = false;
    });
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    notLoggedInUser: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncAction(builder, fetchUser, "user");
    handleAsyncAction(builder, updateUser, "user");
    handleAsyncAction(builder, resetPassword, "user");
    handleAsyncAction(builder, deleteUser, "user");
    handleAsyncAction(builder, fetchNotLoggedInUser, "notLoggedInUser");
    handleAsyncAction(builder, followUser, "user");
  },
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
