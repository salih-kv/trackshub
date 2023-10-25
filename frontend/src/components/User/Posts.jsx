import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectPost } from "../../Redux/post/postSlice";
import { useEffect } from "react";
import { Post } from "../Post";
import { selectUser } from "../../Redux/user/userSlice";

const Posts = () => {
  const { user } = useSelector(selectUser);
  const { posts, loading } = useSelector(selectPost);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      dispatch(getPosts());
    }
  }, [dispatch]);
  return (
    <div>
      {posts?.map((post) => (
        <Post key={post._id} name={user?.name} {...post} />
      ))}
    </div>
  );
};

export default Posts;
