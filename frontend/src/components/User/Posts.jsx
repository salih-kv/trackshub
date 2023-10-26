import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts, selectPost } from "../../Redux/post/postSlice";
import { useEffect } from "react";
import { Post } from "../Post";
import { selectUser } from "../../Redux/user/userSlice";

const Posts = () => {
  const { user } = useSelector(selectUser);
  const { posts, loading } = useSelector(selectPost);
  const dispatch = useDispatch();

  const latestPosts = posts
    ? posts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  useEffect(() => {
    if (!loading) {
      dispatch(getPosts());
    }
  }, [dispatch, deletePost]);
  return (
    <div>
      {latestPosts?.map((post) => (
        <Post key={post._id} name={user?.name} {...post} />
      ))}
    </div>
  );
};

export default Posts;
