import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
    minlength: [6, "Username must be of minimum 6 characters"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Password must be of minimum 6 characters"],
    select: false,
  },
  profilePic: {
    type: String,
  },
  followers: [
    {
      type: String,
      ref: "Users",
    },
  ],
  following: [
    {
      type: String,
      ref: "Users",
    },
  ],
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  tracks: [String],
  skills: [String],
  genres: [String],
  instruments: [String],
  tools: [String],
  languages: [String],
  links: [String],
  isProfilePublic: {
    type: Boolean,
    default: true,
  },
  projects: [
    {
      type: String,
      ref: "Projects",
    },
  ],
  isOnline: Boolean,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

export const Users = mongoose.model("Users", userSchema);
