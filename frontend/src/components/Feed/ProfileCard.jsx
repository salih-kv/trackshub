import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileImg from "../ProfileImg";

const ProfileCard = () => {
  const user = useSelector((state) => state.user.user);

  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;

  const CardCounter = ({ count, label }) => (
    <div className="text-center">
      <h4 className="font-bold">{count}</h4>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
    </div>
  );

  return (
    <div className="w-full bg-s-light dark:bg-s-dark dark:text-white rounded-md">
      <Link to={`/${user?.username}`}>
        <header className="p-4 flex flex-col items-center justify-center">
          <ProfileImg
            w={"full"}
            buttonStyle={`w-24`}
            name={user?.name}
            profileURL={user?.profilePic}
          />
          <div className="text-center mt-2">
            <h4 className="font-bold">{user?.name}</h4>
            <p className="text-xs font-semibold text-gray-500">{`@${user?.username}`}</p>
          </div>
        </header>
      </Link>
      <div className="flex justify-around items-center w-full border-t-2 dark:border-s-dark p-2">
        <CardCounter count={followersCount} label="Followers" />
        <CardCounter count={followingCount} label="Following" />
      </div>
    </div>
  );
};

export default ProfileCard;
