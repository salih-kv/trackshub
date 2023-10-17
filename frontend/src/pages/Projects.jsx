import { Link, Outlet } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { CgGoogleTasks } from "react-icons/cg";

export default function Projects() {
  const NavLinks = [
    {
      to: "all",
      label: "All Projects",
    },
    {
      to: "tasks",
      label: "Tasks",
    },
  ];
  return (
    <div className="flex justify-between w-full gap-8 py-0 sm:py-8 lg:py-4 mx-4 lg:mx-0">
      <div className="flex flex-col w-full">
        <header className="flex gap-8">
          {NavLinks?.map(({ to, label }) => (
            <div key={to} className="group/link hover:bg-slate-100">
              <Link
                to={to}
                className="text-gray-500 font-medium hover:text-black"
              >
                {label}
              </Link>
              <div className="w-8 h-[3px] bg-black invisible group-hover/link:visible"></div>
            </div>
          ))}
        </header>
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
