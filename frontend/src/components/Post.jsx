import { BsThreeDots } from "react-icons/bs";
import { TimeStamp } from "../utils/TimeStamp";
import ProfileImg from "./ProfileImg";

export const Post = ({ name, text, createdAt }) => {
  const formattedTime = TimeStamp(createdAt);
  return (
    <div className="border-b dark:border-s-dark pb-6">
      <header className="flex items-center justify-between py-4">
        <ProfileImg w={10} buttonStyle={`mr-3`} />
        <div className="mr-auto w-full">
          <h4 className="font-semibold text-base">{name}</h4>
          <p className="text-gray-500 text-xs">{formattedTime}</p>
        </div>
        <button>
          <BsThreeDots className="text-gray-500" />
        </button>
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
