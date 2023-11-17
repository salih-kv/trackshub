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
    <div className="">
      {latestPosts.length > 0 ? (
        latestPosts?.map((post) => (
          <Post key={post._id} user={userProfile} post={post} />
        ))
      ) : (
        <div className="py-4 flex gap-4">
          <div className="flex items-center justify-center w-full mt-32">
            <div className="flex items-center justify-center max-w-[240px]">
              <p className="text-gray-500 text-center text-xs font-medium">
                There are no more posts to show right now.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
