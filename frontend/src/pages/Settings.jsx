import { Link, Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUserLarge } from "react-icons/fa6";
import { IoNotifications, IoTicket } from "react-icons/io5";
import { useEffect } from "react";
import ProfileImg from "../components/ProfileImg";
import { useSelector } from "react-redux";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/settings") {
      navigate("/settings/profile");
    }
  }, [navigate]);
  return (
    <section className="flex justify-between w-full gap-8 pt-8">
      <LeftNav />
      <Outlet />
    </section>
  );
};

export default Settings;

const LeftNav = () => {
  const { user } = useSelector((state) => state.user);

  const NavItems = [
    {
      to: "profile",
      label: "Profile",
      icon: <CgProfile className="text-red-500" />,
    },
    {
      to: "account",
      label: "Account",
      icon: <FaUserLarge className="text-primary-500" />,
    },
    {
      to: "billing",
      label: "Plans",
      icon: <IoTicket className="text-green-500" />,
    },
    {
      to: "notifications",
      label: "Notifications",
      icon: <IoNotifications className="text-blue-500" />,
    },
  ];
  return (
    <div className="flex flex-col min-w-[280px] w-1/4 border-r dark:border-s-dark">
      <Link className="flex items-center justify-start p-4 gap-4">
        <ProfileImg w={8} name={user?.name} profileURL={user?.profilePic} />
        <div>
          <h4 className="text-sm">{user?.name}</h4>
          <p className="text-xs text-gray-500">Back to Profile</p>
        </div>
      </Link>
      {NavItems?.map(({ to, label, icon, bgcolor }) => (
        <Link
          to={to}
          key={to}
          className="p-4 my-1 flex items-center gap-4 hover:bg-s-light dark:hover:bg-s-dark rounded-lg"
        >
          <span className={`p-2 rounded-lg bg-[#EBE4FF]`}>{icon}</span>
          {label}
        </Link>
      ))}
    </div>
  );
};
