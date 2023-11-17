import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import nodemailer from "nodemailer";

// get account details ✅
export const getUserDetails = async (req, res, next) => {
  const { username } = req.params;

  try {
    if (username && username !== "undefined") {
      const user = await User.findOne({ username });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      const userId = req.user.id; // id retrieved from token
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  } catch (err) {
    next(err);
  }
};

// update user account ✅
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

// reset user password ✅
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
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) errorHandler(404, "User not found");

    const token = generateToken(user._id);
    const expirationTime = Date.now() + 3600000; // 1h

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expirationTime;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "your@email.com",
        pass: "your-password",
      },
    });

    const resetLink = `http://${req.headers.host}/reset-password/${token}`;

    const mailOptions = {
      to: email,
      from: "your@email.com",
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link to reset your password:\n\n
             ${resetLink}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to send reset email" });
      }
      res.json({ message: "Password reset email sent" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete user account ✅
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

// follow / unfollow ✅
export const toggleFollowUser = async (req, res, next) => {
  const userId = req.user.id; // logged-in user id
  const { followedId } = req.body; // other user id

  try {
    const follower = await User.findOne({ _id: userId });
    const followed = await User.findOne({ _id: followedId });

    if (!follower || !followed) {
      errorHandler(404, "User not found");
      return;
    }

    const isFollowing = follower.following.includes(followedId);

    if (isFollowing) {
      // If the user is already following, unfollow
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { following: followedId } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: followedId },
        { $pull: { followers: userId } },
        { new: true }
      );
      const updatedFollowedUser = await User.findById({ _id: followedId });
      res.json({
        message: "Unfollowed successfully!",
        user: updatedFollowedUser,
      });
    } else {
      // If the user is not following, follow
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { following: followedId } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: followedId },
        { $addToSet: { followers: userId } },
        { new: true }
      );
      const updatedFollowedUser = await User.findById({ _id: followedId });
      res.json({
        message: "Followed successfully!",
        user: updatedFollowedUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

// search users
export const searchUser = async (req, res, next) => {
  const searchQuery = req.query.q;
  console.log("searchQuery");

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

export const suggestUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const currentUser = await User.findById({ _id: userId });

    const suggestedUsers = await User.find({
      $and: [
        {
          $or: [
            { location: { $regex: new RegExp(currentUser.location, "i") } }, // Users in the same location & Case-insensitive regex
            { skills: { $in: currentUser.skills } }, // $in - value includes in the array, bcz skills is an array
            { genres: { $in: currentUser.genres } },
            { instruments: { $in: currentUser.instruments } },
            { tools: { $in: currentUser.tools } },
            { languages: { $in: currentUser.languages } },
          ],
        },
        { _id: { $nin: [...currentUser.following, userId] } }, // $nin - not include, Exclude already following users & current user from recommendations
      ],
    }).limit(4);

    res.status(200).json(suggestedUsers);
  } catch (err) {
    next(err);
  }
};
