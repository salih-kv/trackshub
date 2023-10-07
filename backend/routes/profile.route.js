import express from "express";
import {
  createUserProfile,
  getUserProfile,
} from "../controllers/profile.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express();

router.post("/", verifyToken, createUserProfile);
router.get("/", verifyToken, getUserProfile);

export default router;
