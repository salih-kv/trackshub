import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const postSchema = Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().slice(0, 6),
    },
    userId: { type: String, required: true, ref: "Users" },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    likes: [
      {
        type: String,
        ref: "Users",
      },
    ],
    comments: [
      {
        type: String,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Posts = model("Posts", postSchema);
