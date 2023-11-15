import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  deleteUser,
  forgotPassword,
  getUserDetails,
  resetPassword,
  searchUser,
  toggleFollowUser,
  updateUser,
} from "../controllers/user.controller.js";
const router = express();

router.get("/:username?", verifyToken, getUserDetails); // ✅
router.post("/", verifyToken, updateUser); // ✅
router.delete("/", verifyToken, deleteUser); // ✅
router.post("/reset-password", verifyToken, resetPassword); // ✅
router.post("/forgot-password", forgotPassword); // ! pending

router.post("/follow", verifyToken, toggleFollowUser); // ✅
router.get("/searchUser", searchUser);

export default router;
