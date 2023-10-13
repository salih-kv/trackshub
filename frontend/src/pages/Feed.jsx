import { Link, Outlet } from "react-router-dom";
import ProfileCard from "../components/Feed/ProfileCard";
import ProjectsCard from "../components/Feed/ProjectsCard";
import UsersCard from "../components/Feed/UsersCard";

const Feed = () => {
  return (
    <div className="flex justify-between w-full gap-8 py-4">
      <Left />
      <Middle />
      <Right />
    </div>
  );
};

export default Feed;

const Left = () => {
  return (
    <section className="w-1/4 flex flex-col justify-start items-center">
      <ProfileCard />
      <ProjectsCard />
    </section>
  );
};

const Middle = () => {
  const NavLinks = [
    { to: "following", label: "Following" },
    { to: "trending", label: "Trending" },
  ];

  return (
    <section className="w-2/4 flex flex-col gap-6">
      <header className="flex gap-8">
        {NavLinks?.map(({ to, label }) => (
          <div key={to} className="group/link hover:bg-slate-100">
            <Link
              to={to}
              className="text-gray-500 font-semibold hover:text-black"
            >
              {label}
            </Link>
            <div className="w-8 h-[3px] bg-black invisible group-hover/link:visible"></div>
          </div>
        ))}
      </header>
      <section>
        <Outlet />
      </section>
    </section>
  );
};

const Right = () => {
  return (
    <section className="w-1/4">
      <UsersCard />
    </section>
  );
};
