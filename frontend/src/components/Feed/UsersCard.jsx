import { IoMdPersonAdd } from "react-icons/io";
import { RiUserFollowLine } from "react-icons/ri";
import ProfileImg from "../ProfileImg";
import { useDispatch } from "react-redux";
import { followUser } from "../../Redux/slices/userSlice";
import { useState } from "react";

const UsersCard = ({ userSuggestions }) => {
  const dispatch = useDispatch();
  const [userStates, setUserStates] = useState({});

  const handleFollow = (suggestedUser) => {
    dispatch(followUser(suggestedUser._id));

    // Update count state for the specific user
    setUserStates((prev) => ({
      ...prev,
      [suggestedUser._id]: {
        isFollowing: !prev[suggestedUser._id]?.isFollowing,
        followerCount:
          suggestedUser.followers.length +
          (prev[suggestedUser._id]?.isFollowing ? 0 : 1),
      },
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between w-full">
        <h2 className="font-semibold">People to Follow</h2>
        {/* <span className="text-sm text-gray-500">Refresh</span> */}
      </header>
      <div className="mt-4 flex flex-col gap-6">
        {userSuggestions?.map((suggestedUser) => (
          <div
            key={suggestedUser?._id}
            className="flex items-center justify-between overflow-hidden"
          >
            <div className="mr-6">
              <ProfileImg profileURL={suggestedUser?.profilePic} w={10} />
            </div>
            <div className="mr-auto">
              <h4 className="font-semibold text-sm">{suggestedUser?.name}</h4>
              <p className="text-gray-500 text-xs">{`${
                userStates[suggestedUser._id]?.followerCount ||
                suggestedUser.followers.length
              } Followers`}</p>
            </div>
            <button
              onClick={() => handleFollow(suggestedUser)}
              className="bg-black px-4 py-2 rounded-3xl"
            >
              {userStates[suggestedUser._id]?.isFollowing ? (
                <RiUserFollowLine className="text-white" />
              ) : (
                <IoMdPersonAdd className="text-white" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersCard;
