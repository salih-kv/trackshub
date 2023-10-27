import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async (content) => {
    const response = await instance.post("/api/v1/post/", content);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const response = await instance.delete(`/api/v1/post/${postId}`);
    return response.data;
  }
);

export const likePost = createAsyncThunk("post/likePost", async (postId) => {
  const response = await instance.post(`/api/v1/post/like`, {
    postId,
  });
  return response.data.posts;
});

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const response = await instance.get(`/api/v1/post/`);
  return response.data;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.loading = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.loading = false;
      })
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      });
  },
});

export const selectPost = (state) => state.post;
export default postSlice.reducer;
