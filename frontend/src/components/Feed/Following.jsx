import { BsThreeDots } from "react-icons/bs";
import ProfileImg from "../ProfileImg";

const Following = () => {
  return (
    <div className="flex flex-col gap-6">
      <CreatePost />
      <Post
        imgUrl="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        name="User One"
      />
      <Post
        imgUrl="https://picsum.photos/id/319/80/80"
        name="Kristian Karlsson"
      />
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

const Post = ({ imgUrl, name }) => {
  return (
    <div className="border-b dark:border-s-dark pb-6">
      <header className="flex items-center justify-between py-4">
        <div className="w-12 h-auto mr-3">
          <img
            className="w-full h-full rounded-full"
            src={imgUrl}
            alt="user photo"
          />
        </div>
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
