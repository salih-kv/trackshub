import { Users } from "../../models/user.model.js";
import { errorHandler } from "../../utils/errorHandler.js";

export const signupUser = async (req, res, next) => {
  const { name, email, username, password } = req.body;
  console.log(req.body);

  try {
    const user = await Users.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      if (user.username === username) {
        return next(errorHandler(401, "Username already exists"));
      }
      return next(errorHandler(401, "Email already exists"));
    }

    const newUser = await Users.create({
      name,
      email,
      username,
      password,
    });

    // write code to set cookie

    res.status(200).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};
