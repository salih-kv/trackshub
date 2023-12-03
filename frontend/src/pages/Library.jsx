import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const NavLinks = [
  {
    to: "albums",
    label: "Albums",
  },
  {
    to: "playlists",
    label: "Playlists",
  },
];

const Library = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/library" || path === "/library/") {
      navigate("/library/albums");
    }
  }, [navigate]);
  return (
    <div className="flex flex-col w-full py-0 sm:py-8 lg:py-4 mx-4 lg:mx-0">
      <div className="flex w-full gap-8">
        <header className="w-full flex justify-center lg:justify-start gap-3 lg:gap-8 pb-2 lg:pb-4">
          {NavLinks?.map(({ to, label }) => (
            <div key={to} className="group/link hover:bg-slate-100">
              <NavLink
                to={to}
                className="text-gray-500 text-xs lg:text-sm font-medium"
              >
                {label}
              </NavLink>
              <div className="w-8 h-[2px] bg-black dark:bg-white rounded-full invisible group-hover/link:visible"></div>
            </div>
          ))}
        </header>
      </div>
      <div className=" w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Library;
