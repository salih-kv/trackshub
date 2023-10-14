import express from "express";
import { getHomeContent, search } from "../controllers/home.controller.js";
const router = express();

router.get("/", getHomeContent);
router.get("/search", search)

export default router;
