import express from "express";
import { verifyToken } from "../middlewares/auth.js";
const router = express();

// router.post("/create", verifyToken, createTask);
// router.post("/:projectId", verifyToken, getTasksByProjectId);
// router.get("/", verifyToken, getUserTasks);
// router.get("/:taskId", verifyToken, getTaskById);

export default router;
