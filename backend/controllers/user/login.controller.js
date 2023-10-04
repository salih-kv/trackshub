import { Users } from "../../models/user.model.js";
import { errorHandler } from "../../utils/errorHandler.js";

export const loginUser = async (req, res, next) => {
  const { userId, password } = req.body;

  try {
    const user = await Users.findOne({
      $or: [{ email: userId }, { username: userId }],
    }).select("+password");

    if (!user) {
      return next(errorHandler(401, "User doesn't exist"));
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return next(errorHandler(401, "Password doesn't match"));
    }

    // write code to set cookie

    res.status(200).json({
      status: true,
      message: "login successfully",
    });
  } catch (err) {
    next(err);
  }
};
