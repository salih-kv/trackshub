import { Profiles } from "../models/profile.model.js";
import { Users } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// get account details
export const getAccount = async (req, res, next) => {
  const userId = req.user.id; // id retrieved from token
  try {
    const userAccount = await Users.findOne({ _id: userId }).select(
      "email name username"
    );
    res.status(200).json(userAccount);
  } catch (err) {
    next(err);
  }
};

// update user account
export const updateAccount = async (req, res, next) => {
  const userId = req.user.id;
  const { email, name, username } = req.body;

  try {
    let validAccount = await Users.findOne({ _id: userId });
    if (!validAccount) errorHandler(404, "User not found");

    if (email) validAccount.email = email;
    if (name) validAccount.name = name;
    if (username) validAccount.username = username;

    const response = await validAccount.save();

    if (response) {
      return res.status(200).json({
        status: true,
        message: "Account info updated successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

// reset user password
export const resetPassword = async (req, res, next) => {
  const { userId } = req.user.id;
  const { newPassword } = req.body;

  try {
    const user = await Users.findOne({ userId });
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

export const forgotPassword = async (req, res, next) => {};

// delete user account
export const deleteAccount = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const deletedUser = await Users.findOneAndDelete({ _id: userId });
    if (!deletedUser) errorHandler(404, "User not found");
    const deletedProfile = await Profiles.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};
