import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  deleteUser,
  forgotPassword,
  getUser,
  resetPassword,
  updateUser,
} from "../controllers/user.controller.js";
const router = express();

router.get("/", verifyToken, getUser);
router.post("/", verifyToken, updateUser);
router.delete("/", verifyToken, deleteUser);
router.post("/reset-password", verifyToken, resetPassword);
router.post("/forgot-password", forgotPassword); // ! pending

export default router;
