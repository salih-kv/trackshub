import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { error } from "./middlewares/error.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import homeRoute from "./routes/home.route.js";
import projectRoute from "./routes/project.route.js";
import postRoute from "./routes/post.route.js";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// config develop environment
if (process.env.NODE_ENV != "production") {
  dotenv.config({ path: "../backend/config/config.env" });
}

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/home", homeRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/post", postRoute);
// app.use("/api/v1/upload", uploadRoute);

// error handling middleware
app.use(error);
