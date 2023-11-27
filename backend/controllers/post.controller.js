import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// function for controllers
const getUserPosts = async (userId) => {
  try {
    console.log("1");
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const posts = await Post.find({ userId });
    return posts;
  } catch (err) {
    console.log(err);
  }
};

export const createNewPost = async (req, res, next) => {
  console.log("2");
  const userId = req.user.id;
  const { text, file } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const { username, name, profilePic } = user;
    if (user) {
      const newPost = await Post.create({
        postedBy: userId,
        username,
        name,
        profilePic,
        text,
        file,
      });

      res.status(200).json({
        status: true,
        message: "New post created successfully",
        newPost,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  console.log("3");

  const { postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const result = await Post.findByIdAndDelete(postId);

    if (result) {
      res.status(200).json({
        status: true,
        message: "Post deleted successfully",
        postId: result._id,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  const userId = req.user.id;
  const { username } = req.params;
  try {
    if (username) {
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send("User not found");
      }
      const posts = await Post.find({ postedBy: user?._id });
      res.json(posts);
    }

    if (userId) {
      let user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json("User not found");
      }
      const posts = await Post.find({ postedBy: userId });
      res.json(posts);
    }
  } catch (err) {
    next(err);
  }
};

export const likeUnlikePost = async (req, res, next) => {
  console.log("6");

  const userId = req.user.id;
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) errorHandler(404, "Post not found");
    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      const updatedPost = await Post.findById(postId);
      const posts = await getUserPosts(userId);
      res.status(200).json({
        message: "Post unliked successfully",
        post: updatedPost,
        posts,
      });
    } else {
      // Like post
      post.likes.push(userId);
      await post.save();
      const updatedPost = await Post.findById(postId);
      const posts = await getUserPosts(userId);
      res.status(200).json({
        message: "Post liked successfully",
        post: updatedPost,
        posts,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const commentToPost = async (req, res, next) => {
  console.log("7");

  const userId = req.user.id;
  const { text } = req.body;
  const { postId } = req.params;

  try {
    const user = await User.findById({ _id: userId });
    const userProfilePic = user.profilePic;
    const username = user.username;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { userId, text, userProfilePic, username };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await Post.findById(postId);
    const posts = await getUserPosts(userId);

    res.status(200).json({
      message: "commented successfully",
      post: updatedPost,
      posts,
    });
  } catch (err) {
    next(err);
  }
};

export const getFeedPosts = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const following = user.following;

    // Find latest posts of following users
    const feedPosts = await Post.find({ postedBy: { $in: following } })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(feedPosts);
  } catch (err) {
    next(err);
  }
};
