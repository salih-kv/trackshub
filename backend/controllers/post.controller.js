import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

const getUserPosts = async (userId) => {
  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      console.log("User not found");
    }
    const posts = await Post.find({ userId });
    return posts;
  } catch (err) {
    console.log(err);
  }
};

export const createNewPost = async (req, res, next) => {
  const userId = req.user.id;
  const { text, file } = req.body;

  try {
    const user = User.findOne({ _id: userId });
    if (user) {
      const newPost = await Post.create({ userId, text, file });
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
  const { postId } = req.params;
  try {
    const user = User.findOne({ _id: userId });
    if (user) {
      const post = await Post.findById({ _id: postId });
      if (post._id === postId) {
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
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const posts = await Post.find({ postId });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  const userId = req.user.id;
  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const posts = await Post.find({ userId });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const likeUnlikePost = async (req, res, next) => {
  const userId = req.user.id;
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) errorHandler(404, "Post not found");
    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      const posts = await getUserPosts(userId);
      res.status(200).json({
        message: "Post unliked successfully",
        posts,
      });
    } else {
      // Like post
      post.likes.push(userId);
      await post.save();
      const posts = await getUserPosts(userId);
      res.status(200).json({
        message: "Post liked successfully",
        posts,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const replyToPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const reply = { userId, text, userProfilePic, username };

    post.replies.push(reply);
    await post.save();

    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFeedPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const getUserPosts = async (req, res, next) => {
//   const { username } = req.params;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const posts = await Post.find({ postedBy: user._id }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
