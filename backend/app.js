import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { error } from "./middlewares/error.js";
import authRoute from "./routes/auth.route.js";
import userAccountRoute from "./routes/account.route.js";
import userProfileRoute from "./routes/profile.route.js";
import homeRoute from "./routes/home.route.js";
import projectRoute from "./routes/profile.route.js";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// config develop environment
if (process.env.NODE_ENV != "production") {
  dotenv.config({ path: "../backend/config/config.env" });
}

// routes
app.use("/api/v1/auth", authRoute); // ✅
app.use("/api/v1/user", userAccountRoute);
app.use("/api/v1/profile", userProfileRoute); // ✅
app.use("/api/v1/home", homeRoute);
app.use("/api/v1/project", projectRoute);

// error handling middleware
app.use(error);
