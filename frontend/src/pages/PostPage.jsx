import { PrivateHeader } from "../components/Navbar/PrivateHeader";
import { Post } from "../components/Post";
import ProfileCard from "../components/Feed/ProfileCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostById, selectPost } from "../Redux/slices/postSlice";
import { selectUser } from "../Redux/slices/userSlice";
import ProfileImg from "../components/ProfileImg";

const PostPage = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { user } = useSelector(selectUser);
  const { post } = useSelector(selectPost);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  return (
    <div className="relative dark:text-white">
      <PrivateHeader />
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl mt-16 px-4">
        <div className="flex justify-center w-full gap-12 py-0 sm:py-8 lg:py-4 mx-4 lg:mx-0">
          <section className="max-w-xl md:w-2/3 lg:w-2/4 flex flex-col gap-4">
            <Post user={user} post={post} />
            {post &&
              post.comments?.map((comment) => (
                <PostComment key={comment._id} {...comment} />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

const PostComment = ({ userProfilePic, username, text }) => {
  return (
    <div className="py-2">
      <header className="flex items-center justify-between">
        <ProfileImg profileURL={userProfilePic} w={7} buttonStyle={`mr-3`} />
        <div className="mr-auto w-full">
          <h4 className="font-medium text-sm">{username}</h4>
        </div>
      </header>
      {/* post content */}
      <div className="flex items-center justify-between">
        <div className="w-10 mr-2"></div>
        <div className="mr-auto w-full text-sm">{text}</div>
      </div>
    </div>
  );
};
