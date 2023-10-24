import express from "express";
import {
  createNewPost,
  deletePost,
  getPosts,
} from "../controllers/post.controller.js";
const router = express();

router.post("/", createNewPost);
router.delete("/", deletePost);
router.get("/", getPosts);

export default router;
