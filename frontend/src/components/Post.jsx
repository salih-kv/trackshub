import { BsThreeDots } from "react-icons/bs";
import { TimeStamp } from "../utils/TimeStamp";
import ProfileImg from "./ProfileImg";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { deletePost } from "../Redux/post/postSlice";
import { useDispatch } from "react-redux";

export const Post = ({ _id: postId, name, text, createdAt }) => {
  const dispatch = useDispatch();
  const formattedTime = TimeStamp(createdAt);
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="border-b dark:border-s-dark pb-6">
      <header className="flex items-center justify-between py-4">
        <ProfileImg w={10} buttonStyle={`mr-3`} />
        <div className="mr-auto w-full">
          <h4 className="font-semibold text-base">{name}</h4>
          <p className="text-gray-500 text-xs">{formattedTime}</p>
        </div>
        <div onClick={() => setIsShow(!isShow)} className="relative">
          <div
            className={`p-2 hover:bg-s-light ${
              isShow && "bg-s-light"
            } rounded-full`}
          >
            <BsThreeDots className="text-gray-500 " />
          </div>
          {isShow && (
            <div className="absolute right-0 top-10 bg-white dark:bg-s-dark shadow-lg rounded-lg">
              <button
                onClick={() => dispatch(deletePost(postId))}
                className="text-sm text-red-500 flex items-center gap-2 hover:bg-s-light hover:dark:bg-p-dark p-2 rounded"
              >
                <MdDelete />
                <span>delete</span>
              </button>
            </div>
          )}
        </div>
      </header>
      {/* post content */}
      <div className="mt-2 mb-4">
        <div>{text}</div>
      </div>
      {/* comment */}
      <div className="">
        <div className="w-full">
          <input
            type="text"
            className="bg-s-light dark:bg-s-dark w-full py-2 pl-10 rounded-3xl placeholder:text-gray-500 text-xs outline-none"
            placeholder="Leave a comment..."
          />
        </div>
      </div>
    </div>
  );
};
