import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createTask,
  getTasksByProjectId,
  getUserTasks,
} from "../controllers/task.controller.js";
const router = express();

router.post("/create/:projectId", verifyToken, createTask);
router.get("/:projectId", verifyToken, getTasksByProjectId);
router.get("/", verifyToken, getUserTasks);
// router.get("/:taskId", verifyToken, getTaskById);

export default router;
