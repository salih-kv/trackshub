import { PiHouseBold } from "react-icons/pi";
import { TbMusicPlus } from "react-icons/tb";
import { RiFolderMusicLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const NavLinks = [
  { to: "/feed", label: "Feed", icon: <PiHouseBold /> },
  { to: "/projects", label: "Projects", icon: <TbMusicPlus /> },
  { to: "/library", label: "Library", icon: <RiFolderMusicLine /> },
];

const Nav = () => {
  return (
    <nav className="">
      <ul className="flex items-center justify-around font-medium space-x-2 lg:space-x-4">
        {NavLinks?.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className="flex items-center gap-2 rounded-3xl py-2 px-4"
          >
            <span className="text-2xl sm:text-base">{icon}</span>
            <span className="hidden sm:block font-semibold text-sm">
              {label}
            </span>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
