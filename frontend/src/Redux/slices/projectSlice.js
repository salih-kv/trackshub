import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

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
    const response = await instance.post("/api/v1/project/create", { title });
    return response.data;
  }
);

export const getProjectById = createAsyncThunk(
  "project/getProjectById",
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
    return response.data.projects;
  }
);

export const addCollaborator = createAsyncThunk(
  "project/addCollaborator",
  async ({ projectId, collaboratorId }) => {
    const response = await instance.post(`/api/v1/project/collaborator`, {
      projectId,
      collaboratorId,
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

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    project: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncAction(builder, createNewProject, "projects");
    handleAsyncAction(builder, fetchProjectsByUserId, "projects");
    handleAsyncAction(builder, getProjectById, "project");
    handleAsyncAction(builder, updateProject, "project");
    handleAsyncAction(builder, deleteProject, "projects");
    handleAsyncAction(builder, addCollaborator, "project");
  },
});

export const selectProject = (state) => state.project;

export default projectSlice.reducer;
