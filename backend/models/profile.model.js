import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  profilePic: {
    type: String,
  },
  country: {
    type: String,
    required: [true, "Please choose your country"],
  },
  state: {
    type: String,
  },
  city: {
    type: String,
    required: true,
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
});

export const Profiles = mongoose.model("Profiles", profileSchema);
