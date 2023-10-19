import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const projectSchema = mongoose.Schema({
  projectId: {
    type: String,
    default: () => uuidv4().slice(0, 6),
  },
  name: {
    type: String,
    required: [true, "Please enter project name"],
    unique: [true, "Project name already exists"],
  },
  owner: {
    type: String,
    ref: "Users",
  },
  genres: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  metadata: {
    type: [
      {
        songTitle: {
          type: String,
        },
        description: {
          type: String,
        },
        releaseDate: {
          type: Date,
        },
      },
    ],
  },
  collaborators: {
    type: [String],
  },
  files: {
    type: [String],
  },
  isClosed: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const Projects = mongoose.model("Projects", projectSchema);
