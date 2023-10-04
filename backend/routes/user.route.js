import express from "express";
import { signupUser } from "../controllers/user/signup.controller.js";
import { loginUser } from "../controllers/user/login.controller.js";
import { logoutUser } from "../controllers/user/logout.controller.js";

const router = express();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
