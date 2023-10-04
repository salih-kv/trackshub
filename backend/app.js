import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { error } from "./middlewares/error.js";
import user from "./routes/user.route.js";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV != "production") {
  dotenv.config({ path: "../backend/config/config.env" });
}

app.use("/api/v1", user);

// error handling middleware
app.use(error);
