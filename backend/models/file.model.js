import { Schema, model } from "mongoose";

const fileSchema = Schema({
  myFile: String,
});

export const Files = model("files", fileSchema);
