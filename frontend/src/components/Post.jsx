import { BsThreeDots } from "react-icons/bs";
import { TimeStamp } from "../utils/TimeStamp";
import ProfileImg from "./ProfileImg";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { commentToPost, deletePost, likePost } from "../Redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../Redux/slices/userSlice";

export const Post = ({ user, post }) => {
  const dispatch = useDispatch();
  const { isCurrentUser } = useSelector(selectUser);
  const formattedTime = TimeStamp(post?.createdAt);
  const [isShow, setIsShow] = useState(false);
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id));
  const [commentInput, setCommentInput] = useState("");
  const [commentInputToggle, setCommentInputToggle] = useState(false);

  useEffect(() => {
    setLiked(post?.likes?.includes(user?._id));
  }, [post, user]);

  const handleCommentChange = (e) => {
    setCommentInputToggle(true);
    setCommentInput(e.target.value);
  };

  const handleCommentToPost = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (commentInput.trim() !== "") {
        dispatch(commentToPost({ postId: post?._id, text: commentInput }));
        setCommentInput("");
        setCommentInputToggle(false);
      }
    }
  };

  return (
    <div className="border-b dark:border-s-dark pb-6">
      <header className="flex items-center justify-between py-4">
        <ProfileImg w={10} buttonStyle={`mr-3`} />
        <div className="mr-auto w-full">
          <div className="flex items-center gap-1">
            <h4 className="font-semibold text-base">{post?.name}</h4>
            <span className="text-gray-500 text-xs font-medium">{`@${post?.username}`}</span>
          </div>
          <p className="text-gray-500 text-xs">{formattedTime}</p>
        </div>
        {isCurrentUser && (
          <div
            onClick={() => setIsShow(!isShow)}
            className="relative cursor-pointer"
          >
            <div
              className={`p-2 hover:bg-s-light ${
                isShow && "bg-s-light"
              } rounded-full`}
            >
              <BsThreeDots className="text-gray-500 " />
            </div>
            {isShow && (
              <div className="absolute right-0 top-10 bg-white dark:bg-s-dark shadow-lg rounded-lg cursor-pointer">
                <button
                  onClick={() => dispatch(deletePost(post?._id))}
                  className="text-sm text-red-500 flex items-center gap-2 hover:bg-s-light hover:dark:bg-p-dark p-2 rounded"
                >
                  <MdDelete className="text-lg" />
                  <span>delete</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      {/* post content */}
      <Link
        to={`/${user?.username}/post/${post?._id}`}
        className="mt-2 mb-2 flex items-center justify-between"
      >
        <div className="w-10 mr-4"></div>
        <div className="mr-auto w-full">{post?.text}</div>
      </Link>
      {/* count */}
      <div className="text-gray-600 text-xs flex items-center gap-2 py-3">
        <p>{post?.comments?.length || 0} comments</p>
        <div className="font-extrabold w-1 h-1 bg-gray-600 rounded-full"></div>
        <p>{post?.likes?.length || 0} likes</p>
      </div>
      {/* comment */}
      <div className="w-full flex gap-2">
        <div>
          <div
            onClick={() => {
              setLiked(!liked);
              dispatch(likePost(post?._id));
            }}
            className={`flex items-center justify-center bg-s-light dark:bg-s-dark rounded-full p-2 cursor-pointer`}
          >
            {liked ? (
              <AiFillHeart className="text-lg text-primary-500" />
            ) : (
              <AiOutlineHeart className="text-lg" />
            )}
          </div>
        </div>
        <textarea
          value={commentInput}
          type="text"
          rows={commentInputToggle ? 3 : 1}
          onChange={handleCommentChange}
          onKeyDown={handleCommentToPost}
          className={`bg-s-light h-auto dark:bg-s-dark w-full py-2 pl-4 ${
            commentInputToggle ? "rounded-md" : "rounded-3xl"
          } placeholder:text-gray-500 text-xs outline-none resize-none`}
          placeholder="Leave a comment..."
        />
      </div>
    </div>
  );
};
