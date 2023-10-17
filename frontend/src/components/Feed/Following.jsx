import { BsThreeDots } from "react-icons/bs";
import ProfileImg from "../ProfileImg";
import { useUserState } from "../../context/UserContext";

const Following = () => {
  const { user } = useUserState();
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
  return (
    <div className="flex items-center justify-between">
      <ProfileImg w={10} buttonStyle={`mr-3`} />
      <div className="w-full">
        <input
          type="text"
          className="bg-s-light dark:bg-s-dark w-full py-3 px-6 rounded-3xl placeholder:text-gray-500"
          placeholder="What's new?"
        />
      </div>
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
