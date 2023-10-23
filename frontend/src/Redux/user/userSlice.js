import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/user/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/user/", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (newPassword, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/api/v1/user/reset-password",
        newPassword
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.delete("/api/v1/user/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (followedId, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/user/follow", {
        followedId,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async (followedId, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/user/unfollow", followedId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const handleAsyncAction = (builder, action) => {
  builder
    .addCase(action.fulfilled, (state, action) => {
      state.user = action.payload;
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
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleAsyncAction(builder, fetchUser);
    handleAsyncAction(builder, updateUser);
    handleAsyncAction(builder, resetPassword);
    handleAsyncAction(builder, deleteUser);
    handleAsyncAction(builder, followUser);
    handleAsyncAction(builder, unFollowUser);
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
