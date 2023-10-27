import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavLinks = [
  {
    to: "collab",
    label: "Collab Projects",
  },
  {
    to: "my-projects",
    label: "My Projects",
  },
  {
    to: "deleted",
    label: "Deleted Projects",
  },
];

export default function Projects() {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/projects" || path === "/projects/") {
      navigate("/projects/my-projects");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col w-full py-0 sm:py-8 lg:py-4 mx-4 lg:mx-0">
      <div className="flex w-full gap-8">
        <div className="w-1/4 h-auto"></div>
        <header className="w-3/4 flex gap-8">
          {NavLinks?.map(({ to, label }) => (
            <div key={to} className="group/link hover:bg-slate-100">
              <Link
                to={to}
                className="text-gray-500 font-medium hover:text-white"
              >
                {label}
              </Link>
              <div className="w-8 h-[3px] bg-black invisible group-hover/link:visible"></div>
            </div>
          ))}
        </header>
      </div>
      <div className="mt-8 w-full">
        <Outlet />
      </div>
    </div>
  );
}
