import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const verifyToken = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = await req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
      } catch (err) {
        next(err);
      }
    }
    if (!token) return next(errorHandler(401, "Unauthorized, invalid token"));
  } catch (err) {
    next(err);
  }
};
