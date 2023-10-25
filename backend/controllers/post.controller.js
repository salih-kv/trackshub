import { Posts } from "../models/post.model.js";
import { Users } from "../models/user.model.js";

export const createNewPost = async (req, res, next) => {
  const userId = req.user.id;
  const { text, file } = req.body;

  try {
    const user = Users.findOne({ _id: userId });
    if (user) {
      const newPost = await Posts.create({ userId, text, file });
      res.status(200).json({
        status: true,
        message: "New post created successfully",
        data: newPost,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.body;
  try {
    const user = Users.findOne({ _id: userId });
    if (user) {
      const post = await Posts.findById(id);
      if (post._id === id) {
        await post.deleteOne();
        res.status(200).json({
          status: true,
          message: "Post deleted successully",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  const userId = req.user.id;
  const { postId } = req.params;
  try {
    let user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const posts = await Posts.find({ postId });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  const userId = req.user.id;
  try {
    let user = await Users.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const posts = await Posts.find({ userId });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};
