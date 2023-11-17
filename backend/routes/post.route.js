import express from "express";
import {
  commentToPost,
  createNewPost,
  deletePost,
  getAllPosts,
  getFeedPosts,
  getPostById,
  likeUnlikePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express();

router.post("/", verifyToken, createNewPost);
router.post("/like", verifyToken, likeUnlikePost);
router.post("/following", verifyToken, getFeedPosts);
router.post("/comment/:postId", verifyToken, commentToPost);
router.delete("/:postId", verifyToken, deletePost);
router.get("/:username?", verifyToken, getAllPosts);
router.post("/:postId", getPostById);

export default router;
