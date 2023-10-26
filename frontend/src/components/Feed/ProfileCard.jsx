import { Link } from "react-router-dom";
import ProfileImg from "../ProfileImg";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const user = useSelector((state) => state.user.user);

  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;

  const CardCounter = ({ count, label }) => (
    <div className="text-center">
      <h4 className="font-bold">{count}</h4>
      <p className="text-gray-500 text-sm font-semibold">{label}</p>
    </div>
  );

  return (
    <div className="flex items-center justify-start w-full bg-s-light dark:bg-s-dark dark:text-white rounded-xl">
      <div className="p-6 flex flex-col items-start w-full">
        <Link to={`/${user?.username}`}>
          <header className="flex items-center pb-4 w-full">
            <ProfileImg w={12} buttonStyle={`mr-4`} name={user?.name} />
            <div>
              <h4 className="font-bold">{user?.name}</h4>
              <p className="text-xs font-semibold text-gray-500">{`@${user?.username}`}</p>
            </div>
          </header>
        </Link>
        <div className="flex justify-around items-center w-full border-t-2 dark:border-s-dark pt-2">
          <CardCounter count={followersCount} label="Followers" />
          <CardCounter count={followingCount} label="Following" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
