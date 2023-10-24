import { BsThreeDots } from "react-icons/bs";
import ProfileImg from "../ProfileImg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Following = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-6">
      <CreatePost />
      {/* My posts */}
      <Post name={user?.name} />
      <div>{/* render following users posts */}</div>
    </div>
  );
};

export default Following;

const CreatePost = () => {
  const [postToggle, setPostToggle] = useState(false);

  const PostForm = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white dark:bg-p-dark p-6 rounded-lg w-[650px]">
        <div className="flex items-center gap-2 mb-3">
          <ProfileImg w={10} buttonStyle={`mr-3`} />
          <div>
            <h2 className="text-sm">Username</h2>
            <p className="text-xs text-blue-gray-300">Posting to Feed</p>
          </div>
          <div>
            <IoMdCloseCircleOutline
              onClick={() => setPostToggle(false)}
              className="text-red-500 text-2xl cursor-pointer"
            />
          </div>
        </div>
        <div>
          <textarea
            type="text"
            className="bg-s-light dark:bg-s-dark w-full py-3 px-6 rounded-xl placeholder:text-gray-500 resize-none outline-none"
            placeholder="What's new?"
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <button className="btn btn-secondary !text-primary-500 py-1.5 px-3 rounded-2xl">
            Audio
          </button>
          <button className="btn btn-fill py-1.5 px-3 rounded-2xl">Post</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between relative">
      <ProfileImg w={10} buttonStyle={`mr-3`} />
      <div className="w-full">
        <input
          type="text"
          className="bg-s-light dark:bg-s-dark w-full py-3 px-6 rounded-3xl placeholder:text-gray-500"
          placeholder="What's new?"
          onClick={() => setPostToggle((prev) => !prev)}
        />
      </div>
      {postToggle && <PostForm />}
    </div>
  );
};

const Post = ({ name }) => {
  return (
    <div className="border-b dark:border-s-dark pb-6">
      <header className="flex items-center justify-between py-4">
        <ProfileImg w={10} buttonStyle={`mr-3`} />
        <div className="mr-auto w-full">
          <h4 className="font-semibold text-base">{name}</h4>
          <p className="text-gray-500 text-xs">1d ago</p>
        </div>
        <div>
          <BsThreeDots className="text-gray-500" />
        </div>
      </header>
      {/* post content */}
      <div className="mt-2 mb-4">
        <div>Post content here...</div>
      </div>
      {/* comment */}
      <div className="">
        <div className="w-full">
          <input
            type="text"
            className="bg-s-light dark:bg-s-dark w-full py-2 pl-10 rounded-3xl placeholder:text-gray-500 text-xs"
            placeholder="Leave a comment..."
          />
        </div>
      </div>
    </div>
  );
};
