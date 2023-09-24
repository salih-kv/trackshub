import express from "express";
import dotenv from "dotenv";
import cors from "cors";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV != "production") {
  dotenv.config({ path: "backend/config/config.env" });
}

app.get("/", (req, res) => {
  res.json({ test: "success" });
});
