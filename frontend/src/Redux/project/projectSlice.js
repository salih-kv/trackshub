// projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

const initialState = {
  projects: [],
  project: {},
};

export const fetchProjectsByUserId = createAsyncThunk(
  "project/fetchProjectsByUserId",
  async () => {
    const response = await instance.get(`/api/v1/project/`);
    return response.data;
  }
);

export const createNewProject = createAsyncThunk(
  "project/createNewProject",
  async (title) => {
    await instance.post("/api/v1/project/create", { title });
  }
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (projectId) => {
    const response = await instance.get(`/api/v1/project/${projectId}`);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ projectId, updateData }) => {
    const response = await instance.patch(
      `/api/v1/project/${projectId}`,
      updateData
    );
    return response.data;
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId) => {
    const response = await instance.delete(`/api/v1/project/${projectId}`);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsByUserId.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProjectsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // Repeat the above process for other async actions
  },
});

export default projectSlice.reducer;
