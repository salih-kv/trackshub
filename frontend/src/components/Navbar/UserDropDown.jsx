import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import ProfileImg from "../ProfileImg";
import instance from "../../axios/instance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/slices/authSlice";
import { selectUser } from "../../Redux/slices/userSlice";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const logoutUser = async () => {
    try {
      await instance.post("/api/v1/auth/logout");
      dispatch(logout());
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div
      className={`absolute top-8 right-0 z-20 rounded-lg shadow-lg bg-p-light dark:bg-s-dark`}
    >
      <div className="p-4">
        <div className="text-left min-w-[280px]">
          <Link to={`/${user?.username}`}>
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
