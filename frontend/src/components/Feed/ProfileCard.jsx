import { Link } from "react-router-dom";
import ProfileImg from "../ProfileImg";
import { useAuth } from "../../context/AuthContext";

const ProfileCard = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="flex items-center justify-start w-full bg-s-light dark:bg-s-dark dark:text-white rounded-lg">
      <div className="p-4 flex flex-col items-start w-full">
        <Link>
          <header className="flex items-center pb-4 w-full">
            <ProfileImg w={12} buttonStyle={`mr-4`} />
            <div>
              <h4 className="font-bold">{user?.name}</h4>
              <p className="text-xs font-semibold text-gray-500">{`@${user?.username}`}</p>
            </div>
          </header>
        </Link>
        <div className="flex justify-around items-center w-full border-t-2 dark:border-s-dark pt-2">
          <CardCounter count={0} label="Followers" />
          <CardCounter count={0} label="Following" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

const CardCounter = ({ count, label }) => {
  return (
    <div className="text-center">
      <h4 className="font-bold">{count}</h4>
      <p className="text-gray-500 text-sm font-semibold">{label}</p>
    </div>
  );
};
