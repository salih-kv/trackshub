import express from "express";
import {
  google,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";
const router = express();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google", google);

export default router;
