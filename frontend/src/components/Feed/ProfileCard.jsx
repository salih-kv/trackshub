import { Link } from "react-router-dom";
import ProfileImg from "../ProfileImg";

const ProfileCard = () => {
  return (
    <div className="flex items-center justify-start w-full bg-s-light dark:bg-s-dark rounded-lg">
      <div className="p-4 flex flex-col items-center justify-center w-full">
        <Link>
          <header className="flex items-center pb-4 w-full">
            <ProfileImg w={14} buttonStyle={`mr-4`} />
            <div>
              <h4 className="font-bold">User One</h4>
              <p className="text-xs font-semibold text-gray-500">
                @username43252345234
              </p>
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
