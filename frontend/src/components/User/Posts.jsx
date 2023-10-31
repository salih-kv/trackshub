import { useEffect } from "react";
import { Post } from "../Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUsername, selectPost } from "../../Redux/slices/postSlice";
import { selectUser } from "../../Redux/slices/userSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(selectUser);
  const { userPosts } = useSelector(selectPost);

  useEffect(() => {
    dispatch(fetchPostsByUsername(userProfile?.username));
  }, [dispatch, userProfile?.username]);

  const latestPosts = userPosts
    ? userPosts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div>
      {latestPosts?.map((post) => (
        <Post key={post._id} user={userProfile} post={post} />
      ))}
    </div>
  );
};

export default Posts;
