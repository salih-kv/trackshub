import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  deleteAccount,
  forgotPassword,
  getAccount,
  resetPassword,
  updateAccount,
} from "../controllers/account.controller.js";
import {
  createUserProfile,
  getUserProfile,
} from "../controllers/profile.controller.js";
const router = express();

router.get("/account", verifyToken, getAccount);
router.post("/account", verifyToken, updateAccount);
router.post("/reset-password", verifyToken, resetPassword);
router.post("/forgot-password", forgotPassword); // ! pending
router.delete("/account", verifyToken, deleteAccount);

router.post("/profile", verifyToken, createUserProfile);
router.get("/profile", verifyToken, getUserProfile);

export default router;
