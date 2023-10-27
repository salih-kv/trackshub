import express from "express";
import {
  createNewPost,
  deletePost,
  getPostById,
  getPosts,
  likeUnlikePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express();

router.post("/", verifyToken, createNewPost);
router.get("/:postId", verifyToken, getPostById);
router.delete("/:postId", verifyToken, deletePost);
router.get("/", verifyToken, getPosts);
router.post("/like", verifyToken, likeUnlikePost);

export default router;
