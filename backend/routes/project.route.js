import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectsByUserId,
  updateProject,
} from "../controllers/project.controller.js";

const router = express();
router.post("/create", verifyToken, createProject);
router.get("/:projectId", verifyToken, getProjectById);
router.patch("/:projectId", verifyToken, updateProject);
router.delete("/:projectId", verifyToken, deleteProject);

router.get("/:userId/", verifyToken, getProjectsByUserId);

export default router;
