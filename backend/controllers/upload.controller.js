import { Files } from "../models/file.model";

export const uploadProfile = async (req, res, next) => {
  const myFile = req.body;
  try {
    const newImage = await Files.create(myFile);
    newImage.save();
    res.status(201).json({ msg: "New image uploaded...!" });
  } catch (err) {
    next(err);
  }
};
