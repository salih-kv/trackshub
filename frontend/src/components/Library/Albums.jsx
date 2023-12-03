import { FaHeart } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import ProfileImg from "../ProfileImg";

const NavItems = [
  { to: "", text: "My Albums", icon: <ProfileImg w={4} /> },
  { to: "", text: "Liked Albums", icon: <FaHeart className="text-red-500" /> },
];

const Albums = () => {
  return (
    <section className="flex justify-between w-full gap-8 pt-4">
      <div className="flex flex-col min-w-[280px] w-1/4">
        {NavItems?.map(({ to, text, icon }) => (
          <Link
            to={to}
            key={text}
            className="p-4 flex items-center gap-4 hover:bg-s-light dark:hover:bg-s-dark rounded-lg"
          >
            <span className={`p-2 rounded-lg bg-[#ffdbe5]`}>{icon}</span>
            <span className="text-sm">{text}</span>
          </Link>
        ))}
      </div>
      <Outlet />
    </section>
  );
};

export default Albums;
