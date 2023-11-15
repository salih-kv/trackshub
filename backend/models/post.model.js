import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const postSchema = Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().slice(0, 6),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    username: { type: String, required: true, ref: "Users" },
    name: { type: String, required: true, ref: "Users" },
    text: {
      type: String,
      maxLength: 400,
      required: [true, "text is required"],
    },
    file: { type: String },
    likes: [
      {
        type: String,
        ref: "Users",
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = model("Post", postSchema);
