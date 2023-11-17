import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async (content) => {
    const response = await instance.post("/api/v1/post/", content);
    return response.data.newPost;
  }
);

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await instance.get(`/api/v1/post/`);
  return response.data;
});

export const fetchFollowingPosts = createAsyncThunk(
  "post/fetchFollowingPosts",
  async () => {
    const response = await instance.post("/api/v1/post/following");
    return response.data;
  }
);

export const fetchPostById = createAsyncThunk(
  "post/fetchPostById",
  async (postId) => {
    const response = await instance.post(`/api/v1/post/${postId}`);
    return response.data;
  }
);

export const fetchPostsByUsername = createAsyncThunk(
  "post/fetchPostsByUsername",
  async (username) => {
    const response = await instance.get(`/api/v1/post/${username}`);
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
  return response.data;
});

export const commentToPost = createAsyncThunk(
  "post/commentToPost",
  async ({ postId, text }) => {
    const response = await instance.post(`/api/v1/post/comment/${postId}`, {
      text,
    });
    return response.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post: {},
    userPosts: [],
    followingPosts: [],
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
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchFollowingPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowingPosts.fulfilled, (state, action) => {
        state.followingPosts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsByUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsByUsername.fulfilled, (state, action) => {
        state.userPosts = action.payload;
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
        state.post = action.payload.post;
        state.posts = action.payload.posts;
        state.loading = false;
      })
      .addCase(commentToPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(commentToPost.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.posts = action.payload.posts;
        state.loading = false;
      });
  },
});

export const selectPost = (state) => state.post;
export default postSlice.reducer;
