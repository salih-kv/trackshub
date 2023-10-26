import { useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { IoIosShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById, selectProject } from "../Redux/project/projectSlice";

import { AudioPlayer } from "react-audio-player-component";
import NumbFrozen from "../assets/Icy Narco - Numb & Frozen.mp3";

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
  const dispatch = useDispatch();
  const { project } = useSelector(selectProject);

  const date = new Date(project?.createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-6 w-full bg-primary-400 rounded-lg p-6 mb-8">
      <div className="w-44 h-48 bg-primary-500 rounded-lg ">
        <img src="https://picsum.photos/id/304/400/400" alt="project_img" className="w-full h-full rounded-lg" />
      </div>
      <div className="w-full">
        <div className="flex gap-4 items-center mb-2">
          <h2 className="text-primary-100 text-xl font-semibold">
            {project?.title}
          </h2>
          <span className="text-xs bg-primary-300 px-4 py-1 rounded-2xl text-primary-800">
            {project?.isPrivate ? "Private" : "Public"}
          </span>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <h1>Owner</h1>
          <h1>{formattedDate || ""}</h1>
        </div>
        <div className="tracking-[.5em] my-2">
          <AudioPlayer
            src={NumbFrozen}
            minimal={true}
            width={1060}
            trackHeight={75}
            barWidth={2}
            gap={1}
            visualise={true}
            backgroundColor="#BCB1FF"
            barColor="#262831"
            barPlayedColor="#774EFF"
            skipDuration={2}
            showLoopOption={false}
            showVolumeControl={false}
            seekBarColor="#774EFF"
            hideSeekBar={true}
            hideTrackKnobWhenPlaying={true}
          />
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
      <header className="flex gap-8 mb-8">
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
