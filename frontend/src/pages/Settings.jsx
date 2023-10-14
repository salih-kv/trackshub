import { Link, Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUserLarge } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { useEffect } from "react";

const Settings = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/settings") {
      navigate("/settings/profile");
    }
  }, [navigate]);
  return (
    <section className="flex justify-between gap-8">
      <LeftNav />
      <Outlet />
    </section>
  );
};

export default Settings;

const LeftNav = () => {
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
      to: "notifications",
      label: "Notifications",
      icon: <IoNotifications className="text-blue-500" />,
    },
  ];
  return (
    <div className="flex flex-col p-2 min-w-[280px] border-r dark:border-s-dark min-h-screen">
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
