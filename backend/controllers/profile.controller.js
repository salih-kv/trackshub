import { Profiles } from "../models/profile.model.js";
import { Users } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// create or update public profile details
export const createUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const userProfileData = {
      ...req.body,
      user: userId,
    };

    // Create or update the user's profile
    const userProfile = await Profiles.findOneAndUpdate(
      { user: userId },
      userProfileData,
      { upsert: true, new: true }
    );

    res.status(200).json({
      status: true,
      message: "User Profile created or updated successfully",
      userProfile,
    });
  } catch (err) {
    next(err);
  }
};

// get user
export const getUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    // find user
    const user = await Users.findOne({ _id: userId });
    if (!user) errorHandler(404, "User not found");
    const userProfile = await Profiles.findOne({ user: user._id });
    res.status(200).json(userProfile);
  } catch (err) {
    next(err);
  }
};
