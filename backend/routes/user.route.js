import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  deleteUser,
  followUser,
  forgotPassword,
  getUser,
  resetPassword,
  searchUser,
  unFollowUser,
  updateUser,
} from "../controllers/user.controller.js";
const router = express();

router.get("/", verifyToken, getUser);
router.post("/", verifyToken, updateUser);
router.delete("/", verifyToken, deleteUser);
router.post("/reset-password", verifyToken, resetPassword);
router.post("/forgot-password", forgotPassword); // ! pending

router.post("/follow", verifyToken, followUser);
router.post("/unfollow", verifyToken, unFollowUser);
router.get("/searchUser", searchUser);

export default router;
