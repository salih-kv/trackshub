import express from "express";
import {
  deleteAccount,
  getAccount,
  resetPassword,
  updateAccount,
} from "../controllers/account.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express();

router.get("/account", verifyToken, getAccount);
router.post("/account", verifyToken, updateAccount);
router.post("/forgot-password", resetPassword); // ! pending
router.delete("/account", verifyToken, deleteAccount);

export default router;
