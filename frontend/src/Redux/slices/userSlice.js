import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

// ✅
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await instance.get("/api/v1/user/");
  return response.data;
});

// ✅
export const fetchUserByUsername = createAsyncThunk(
  "user/fetchUserByUsername",
  async (username) => {
    const response = await instance.get(`/api/v1/user/${username}`);
    return response.data;
  }
);

// ✅
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const response = await instance.post("/api/v1/user/", userData);
    return response.data;
  }
);

// ✅
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

// ✅
export const deleteUser = createAsyncThunk("user/deleteUser", async () => {
  const response = await instance.delete("/api/v1/user/");
  console.log(response.data);
  return response.data;
});

// ✅
export const followUser = createAsyncThunk(
  "user/followUser",
  async (followedId) => {
    const response = await instance.post("/api/v1/user/follow", {
      followedId,
    });
    return response.data.user;
  }
);

export const suggestUser = createAsyncThunk("user/suggestUser", async () => {
  const response = await instance.post("/api/v1/user/suggest");
  return response.data;
});

const handleAsyncAction = (builder, action, stateKey) => {
  builder
    .addCase(action.fulfilled, (state, action) => {
      state[stateKey] = action.payload;
      state.loading = false;
      if (stateKey === "userProfile") {
        state.isCurrentUser = state.user._id === action.payload._id;
      }
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
    userProfile: {},
    isCurrentUser: false,
    userSuggestions: [],
    loading: false,
  },
  reducers: {
    setIsCurrentUser: (state, action) => {
      state.isCurrentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleAsyncAction(builder, fetchUser, "user");
    handleAsyncAction(builder, fetchUserByUsername, "userProfile");
    handleAsyncAction(builder, updateUser, "user");
    handleAsyncAction(builder, resetPassword, "user");
    handleAsyncAction(builder, deleteUser, "user");
    handleAsyncAction(builder, followUser, "userProfile");
    handleAsyncAction(builder, suggestUser, "userSuggestions");
  },
});

export const selectUser = (state) => state.user;
export const { setIsCurrentUser } = userSlice.actions;
export default userSlice.reducer;
