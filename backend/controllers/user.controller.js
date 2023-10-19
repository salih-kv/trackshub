import { Users } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// get account details
export const getUser = async (req, res, next) => {
  const userId = req.user.id; // id retrieved from token
  try {
    const user = await Users.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// update user account
export const updateUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    let validUser = await Users.findOne({ _id: userId });
    if (!validUser) errorHandler(404, "User not found");

    const userData = {
      ...req.body,
      _id: userId,
    };

    const user = await Users.findOneAndUpdate({ _id: userId }, userData, {
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
    const user = await Users.findOne({ _id: userId });
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
export const deleteUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const deletedUser = await Users.findOneAndDelete({ _id: userId });
    if (!deletedUser) errorHandler(404, "User not found");
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};
