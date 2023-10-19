import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { useEffect } from "react";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    const path = window.location.pathname;
    if (path === `/project/${projectId}` || path === `/project/${projectId}/`) {
      navigate(`/project/${projectId}/files`);
    }
  }, [navigate, projectId]);

  return (
    <div className="w-full">
      <Overview />
      <Workspace />
    </div>
  );
};

export default ProjectPage;

const Overview = () => {
  const { projectId } = useParams();

  // Fetch project data using projectId

  return (
    <div className="flex items-center gap-8 w-full bg-primary-400 rounded-lg p-4 mb-8">
      <div className="w-40 h-40 bg-primary-500 rounded-lg">{/* Project */}</div>
      <div>
        <div className="flex gap-4 items-center mb-2">
          <h2 className="text-primary-100 text-xl font-semibold">
            Project Name
          </h2>
          <span className="text-xs bg-primary-300 px-4 py-1 rounded-2xl text-primary-800">
            Private
          </span>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <h1>Owner</h1>
          <h1>Created Date</h1>
        </div>
        <div className="tracking-[.5em] my-2">
          |||||||| |||||||||||||| Audio Visualizer Here... ||||||||||
          ||||||||||||||
        </div>
        <div>
          <button className="bg-primary-300 inline-flex gap-2 py-1.5 px-3 rounded-2xl">
            <IoIosShareAlt className="" />
            <span className="text-xs">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Workspace = () => {
  const NavLinks = [
    {
      to: "files",
      label: "Files",
    },
    {
      to: "collaborators",
      label: "Collaborators",
    },
    {
      to: "messages",
      label: "Messages",
    },
    {
      to: "tasks",
      label: "Tasks",
    },
    {
      to: "settings",
      label: "Settings",
    },
    {
      to: "comments",
      label: "Comments",
    },
  ];

  return (
    <div>
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
      <div>
        <Outlet />
      </div>
    </div>
  );
};
