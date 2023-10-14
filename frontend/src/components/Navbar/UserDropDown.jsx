import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const UserDropDown = () => {
  return (
    <div className="absolute top-16 right-0 rounded-lg shadow-lg bg-p-light dark:bg-s-dark">
      <div className="p-4">
        <div className="text-left min-w-[280px]">
          <Link>
            <div className="flex items-center justify-between hover:bg-s-light dark:hover:bg-p-dark rounded-lg p-2">
              <div className="w-14 h-auto mr-3">
                <img
                  className="w-full h-full rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </div>
              <div className="w-full">
                <h4 className="font-semibold text-sm">User One</h4>
                <p className=" text-gray-500">View Profile</p>
              </div>
            </div>
          </Link>
          <div className="bg-s-light dark:bg-s-dark h-[1px] my-2"></div>
          <DropDownLink
            to="/settings"
            label="Settings"
            icon={<IoSettingsOutline />}
          />
          <DropDownLink to="" label="Log out" icon={<RiLogoutCircleLine />} />
          <div className="bg-s-light dark:bg-s-dark h-[1px] my-2"></div>
          <DropDownLink to="/help" label="Help" icon={<BiHelpCircle />} />
        </div>
      </div>
    </div>
  );
};

export default UserDropDown;

const DropDownLink = ({ to, label, icon }) => {
  return (
    <Link
      to={to}
      key={to}
      className="flex items-center gap-2 font-medium py-2 hover:bg-s-light dark:hover:bg-p-dark rounded-lg p-2"
    >
      {icon}
      {label}
    </Link>
  );
};
