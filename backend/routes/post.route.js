import express from "express";
import {
  commentToPost,
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  likeUnlikePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express();

router.post("/", verifyToken, createNewPost);
router.delete("/:postId", verifyToken, deletePost);
router.get("/:username?", verifyToken, getAllPosts);
router.post("/:postId", getPostById);
router.post("/like", verifyToken, likeUnlikePost);
router.post("/comment/:postId", verifyToken, commentToPost);

export default router;
