import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async (content) => {
    await instance.post("/api/v1/post/", content);
  }
);

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (postId) => {
    const response = await instance.get(`/api/v1/post/${postId}`);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    console.log(postId);
    const response = await instance.delete(`/api/v1/post/${postId}`);
    return response.data;
  }
);

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const response = await instance.get(`/api/v1/post/`);
  return response.data;
});

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

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncAction(builder, getPostById, "post");
    handleAsyncAction(builder, getPosts, "posts");
  },
});

export const selectPost = (state) => state.post;
export default postSlice.reducer;
