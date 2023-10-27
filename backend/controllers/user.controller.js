import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// get account details
export const getUser = async (req, res, next) => {
  const userId = req.user.id; // id retrieved from token
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// update user account
export const updateUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    let validUser = await User.findOne({ _id: userId });
    if (!validUser) errorHandler(404, "User not found");

    const userData = {
      ...req.body,
      _id: userId,
    };

    const user = await User.findOneAndUpdate({ _id: userId }, userData, {
      upsert: true,
      new: true,
    });

    if (user) {
      return res.status(200).json({
        status: true,
        message: "User info updated successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

// reset user password
export const resetPassword = async (req, res, next) => {
  const userId = req.user.id;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) errorHandler(400, "Invalid user or expired token");

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};

// ! pending
export const forgotPassword = async (req, res, next) => {};

// delete user account
export const deleteUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (!deletedUser) errorHandler(404, "User not found");
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// follow user
export const followUser = async (req, res, next) => {
  const userId = req.user.id; // logged-in user id
  const { followedId } = req.body; // other user id

  try {
    const follower = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { following: followedId } }, // $addToSet - avoid duplicate entries
      { new: true }
    );

    const followed = await User.findOneAndUpdate(
      { _id: followedId },
      { $addToSet: { followers: userId } },
      { new: true }
    );

    if (!follower || !followed) errorHandler(404, "User not found");

    res.json({ message: "Followed successfully!" });
  } catch (err) {
    next(err);
  }
};

// unfollow user
export const unFollowUser = async (req, res) => {
  const userId = req.user.id;
  const { followedId } = req.body;

  try {
    const follower = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { following: followedId } },
      { new: true }
    );

    const followed = await User.findOneAndUpdate(
      { _id: followedId },
      { $pull: { followers: userId } },
      { new: true }
    );

    if (!follower || !followed) errorHandler(404, "User not found");

    res.json({ message: "Unfollowed successfully!" });
  } catch (err) {
    next(err);
  }
};

// search users
export const searchUser = async (req, res, next) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.json([]);
  }
  try {
    const result = await User.find({
      username: { $regex: new RegExp(searchQuery, "i") }, // case-insensitive regex search
    }).select("username name profilePic");
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
