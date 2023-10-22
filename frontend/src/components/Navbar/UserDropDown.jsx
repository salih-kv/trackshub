import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProfileImg from "../ProfileImg";
import instance from "../../axios/instance";
import { AuthContext } from "../../context/AuthContext";
import { useUserState } from "../../context/UserContext";
import { useContext } from "react";

const UserDropDown = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useUserState();
  const logoutUser = async () => {
    instance.post("/api/v1/auth/logout");
    logout();
  };

  return (
    <div
      className={`absolute top-16 right-0 z-20 rounded-lg shadow-lg bg-p-light dark:bg-s-dark`}
    >
      <div className="p-4">
        <div className="text-left min-w-[280px]">
          <Link>
            <div className="flex items-center justify-between hover:bg-s-light dark:hover:bg-p-dark rounded-lg p-2">
              <ProfileImg w={10} buttonStyle={`mr-3`} name={user?.name} />
              <div className="w-full">
                <h4 className="font-semibold text-sm">{user?.name}</h4>
                <p className=" text-gray-500">View Profile</p>
              </div>
            </div>
          </Link>
          <div className="bg-s-light dark:bg-s-dark h-[1px] my-2"></div>
          <div className="flex flex-col gap-2">
            <DropDownLink
              to="/settings"
              label="Settings"
              icon={<IoSettingsOutline />}
            />
            <DropDownLink
              to=""
              label="Log out"
              icon={<RiLogoutCircleLine />}
              onClick={logoutUser}
            />
          </div>
          <div className="bg-s-light dark:bg-p-dark h-[1px] my-2"></div>
          <DropDownLink to="/help" label="Help" icon={<BiHelpCircle />} />
        </div>
      </div>
    </div>
  );
};

export default UserDropDown;

const DropDownLink = ({ to, label, icon, ...rest }) => {
  return (
    <Link
      to={to}
      key={to}
      {...rest}
      className="flex items-center gap-2 font-medium py-2 hover:bg-s-light dark:hover:bg-p-dark rounded-lg p-2"
    >
      {icon}
      {label}
    </Link>
  );
};
