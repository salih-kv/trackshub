import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const taskSchema = Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().slice(0, 6),
    },
    project: {
      projectId: {
        type: String,
        required: true,
        ref: "Projects",
      },
      title: {
        type: String,
        ref: "Projects",
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignee: {
      username: { type: String, ref: "Users" },
      userProfile: { type: String, ref: "Users" },
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "todo",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = model("Task", taskSchema);
