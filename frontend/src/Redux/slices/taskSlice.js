import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios/instance";

export const createNewTask = createAsyncThunk(
  "task/createNewTask",
  async ({ formData, projectId }) => {
    const response = await instance.post(
      `/api/v1/task/create/${projectId}`,
      formData
    );
    return response.data;
  }
);

export const fetchTasksByProjectId = createAsyncThunk(
  "task/fetchTasksByProjectId",
  async (projectId) => {
    const response = await instance.get(`/api/v1/task/${projectId}`);
    return response.data.tasks;
  }
);

export const fetchTasksByUserId = createAsyncThunk(
  "task/fetchTasksByUserId",
  async () => {
    const response = await instance.get(`/api/v1/task`);
    return response.data.tasks;
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

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    task: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncAction(builder, createNewTask, "task");
    handleAsyncAction(builder, fetchTasksByProjectId, "tasks");
    handleAsyncAction(builder, fetchTasksByUserId, "tasks");
  },
});

export const selectTask = (state) => state.task;
export default taskSlice.reducer;
