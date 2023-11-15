import jwt from "jsonwebtoken";

// Generate Token
export const generateToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
