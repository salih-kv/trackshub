import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const projectSchema = mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    default: () => uuidv4().slice(0, 6),
  },
  name: {
    type: String,
    required: [true, "Please enter project name"],
    unique: [true, "Project name already exists"],
  },
  owner: {
    required: true,
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
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

// Pre middleware to update the 'updatedAt' field before saving
projectSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Projects = mongoose.model("Projects", projectSchema);
