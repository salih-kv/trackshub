import express from "express";
import { uploadProfile } from "../controllers/upload.controller.js";
const router = express();

router.post("/", uploadProfile);

export default router;
