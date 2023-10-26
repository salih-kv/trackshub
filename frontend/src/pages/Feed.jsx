import { Link, Outlet } from "react-router-dom";
import ProfileCard from "../components/Feed/ProfileCard";
import ProjectsCard from "../components/Feed/ProjectsCard";
import UsersCard from "../components/Feed/UsersCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectsByUserId,
  selectProject,
} from "../Redux/project/projectSlice";
import { useEffect } from "react";

const Feed = () => {
  return (
    <div className="flex justify-between w-full gap-8 py-0 sm:py-8 lg:py-4 mx-4 lg:mx-0">
      <Left />
      <Middle />
      <Right />
    </div>
  );
};

export default Feed;

const Left = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(selectProject);
  const latestProjects = projects
    ? projects
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (!projects && !loading) {
      dispatch(fetchProjectsByUserId());
    }
  }, [dispatch, projects]);

  return (
    <section className="md:w-1/3 lg:w-1/4 hidden md:flex flex-col justify-start items-center">
      <ProfileCard />
      {latestProjects.length > 0 && (
        <div className="w-full mt-8">
          <header className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Projects</h4>
            <Link
              to={`/projects/my-projects`}
              className="text-gray-500 text-sm"
            >
              View All
            </Link>
          </header>
        </div>
      )}
      {latestProjects?.map((project) => (
        <ProjectsCard key={project._id} {...project} />
      ))}
    </section>
  );
};

const Middle = () => {
  const NavLinks = [
    { to: "following", label: "Following" },
    { to: "trending", label: "Trending" },
  ];

  return (
    <section className="w-full md:w-2/3 lg:w-2/4 flex flex-col gap-6">
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
      <section>
        <Outlet />
      </section>
    </section>
  );
};

const Right = () => {
  return (
    <section className="w-1/4 hidden lg:block">
      <UsersCard />
    </section>
  );
};
