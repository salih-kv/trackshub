import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  deleteUser,
  forgotPassword,
  getUserDetails,
  resetPassword,
  searchUser,
  suggestUser,
  toggleFollowUser,
  updateUser,
} from "../controllers/user.controller.js";
const router = express();

router.post("/", verifyToken, updateUser); // ✅
router.delete("/", verifyToken, deleteUser); // ✅
router.post("/reset-password", verifyToken, resetPassword); // ✅
router.post("/follow", verifyToken, toggleFollowUser); // ✅
router.post("/suggest", verifyToken, suggestUser);
router.get("/search", searchUser);
router.post("/forgot-password", forgotPassword); // ! pending
router.get("/:username?", verifyToken, getUserDetails); // ✅

export default router;
