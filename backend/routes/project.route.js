import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  addCollaborator,
  createProject,
  deleteProject,
  getCollabProjects,
  getProjectById,
  getProjectsByUserId,
  updateProject,
} from "../controllers/project.controller.js";

const router = express();

router.post("/create", verifyToken, createProject); // ✅
router.patch("/:projectId", verifyToken, updateProject);
router.delete("/:projectId", verifyToken, deleteProject);
router.get("/", verifyToken, getProjectsByUserId);
router.post("/collaborator", verifyToken, addCollaborator);
router.get("/collab", verifyToken, getCollabProjects);
router.get("/:projectId", verifyToken, getProjectById);

export default router;
