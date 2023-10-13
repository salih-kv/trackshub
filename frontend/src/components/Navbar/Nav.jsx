import { HiHome } from "react-icons/hi";
import { IoLayers } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { RiFolderMusicFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavLinks = [
  { to: "feed", label: "Feed", icon: <HiHome /> },
  { to: "explore", label: "Explore", icon: <MdOutlineExplore /> },
  { to: "projects", label: "Projects", icon: <IoLayers /> },
  { to: "library", label: "Library", icon: <RiFolderMusicFill /> },
];

const Nav = () => {
  return (
    <nav className="">
      <ul className="flex items-center justify-around font-medium space-x-2 lg:space-x-4">
        {NavLinks?.map(({ to, label, icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex items-center gap-2 text-black rounded-3xl py-2 px-4 dark:text-white lg:hover:bg-s-light dark:hover:text-primary-500 lg:active:bg-s-dark active:text-primary-500 hover:text-primary-500"
            >
              <span className="text-xl sm:text-base">{icon}</span>
              <span className="hidden sm:block font-semibold">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
