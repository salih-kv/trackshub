import { PiHouseBold } from "react-icons/pi";
import { TbMusicPlus } from "react-icons/tb";
import { MdOutlineExplore } from "react-icons/md";
import { RiFolderMusicLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavLinks = [
  { to: "/feed", label: "Feed", icon: <PiHouseBold /> },
  { to: "/explore", label: "Explore", icon: <MdOutlineExplore /> },
  { to: "/projects", label: "Projects", icon: <TbMusicPlus /> },
  { to: "/library", label: "Library", icon: <RiFolderMusicLine /> },
];

const Nav = () => {
  return (
    <nav className="">
      <ul className="flex items-center justify-around font-medium space-x-2 lg:space-x-4">
        {NavLinks?.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 text-black rounded-3xl py-2 px-4 dark:text-white lg:hover:bg-s-light dark:hover:text-primary-500 lg:active:bg-s-dark active:text-primary-500 hover:text-primary-500"
          >
            <span className="text-xl sm:text-base">{icon}</span>
            <span className="hidden sm:block font-semibold text-sm">{label}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
