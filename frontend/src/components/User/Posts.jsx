import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectPost } from "../../Redux/post/postSlice";
import { useEffect } from "react";
import { Post } from "../Post";
import { selectUser } from "../../Redux/user/userSlice";

const Posts = () => {
  const { user } = useSelector(selectUser);
  const { posts } = useSelector(selectPost);
  const dispatch = useDispatch();

  const latestPosts = posts
    ? posts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      {latestPosts?.map((post) => (
        <Post key={post._id} user={user} post={post} />
      ))}
    </div>
  );
};

export default Posts;
