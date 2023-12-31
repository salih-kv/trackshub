import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const projectSchema = mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      default: () => uuidv4().slice(0, 6),
    },
    title: {
      type: String,
      required: [true, "Please enter project name"],
      minlength: [3, "title must be of minimum 3 characters"],
      unique: true,
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
    songTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    releaseDate: {
      type: Date,
    },
    collaborators: [
      {
        collaborator: {
          type: String,
          ref: "Users",
        },
        role: {
          type: String,
          default: "Unassigned",
        },
        username: {
          type: String,
          ref: "Users",
        },
        userProfile: {
          type: String,
          ref: "Users",
        },
      },
    ],
    files: {
      type: [String],
    },
    isPrivate: {
      type: Boolean,
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
  },
  {
    timestamps: true,
  }
);

// Pre middleware to update the 'updatedAt' field before saving
projectSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Project = mongoose.model("Project", projectSchema);
