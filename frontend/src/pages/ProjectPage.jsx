import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById, selectProject } from "../Redux/slices/projectSlice";
import WaveSurferPlayer from "../components/AudioPlayer/WaveSurferPlayer";
import { usePlayer } from "../context/PlayerContext";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import NumbFrozen from "../assets/Icy Narco - Numb & Frozen.mp3";
import { Transition } from "@headlessui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { selectUser, setIsOwner } from "../Redux/slices/userSlice";

const options = {
  container: "#waveform",
  height: 45,
  normalize: true,
  waveColor: "#2d2e3a",
  progressColor: "#774eff",
  cursorColor: "#774eff",
  cursorWidth: 0,
  barWidth: 2,
  barGap: 2,
  barRadius: 12,
  barHeight: 0.1,
  barAlign: "",
  minPxPerSec: 1,
  fillParent: true,
  url: NumbFrozen,
  mediaControls: false,
  autoplay: false,
  interact: true,
  dragToSeek: false,
  hideScrollbar: true,
  audioRate: 1,
  autoScroll: true,
  autoCenter: true,
  sampleRate: 8000,
};

const transitionProps = {
  enter: `transition ease-out duration-100`,
  enterFrom: `transform opacity-0 scale-95`,
  enterTo: `transform opacity-100 scale-100`,
  leave: `transition ease-out duration-75`,
  leaveFrom: `transform opacity-100 scale-100`,
  leaveTo: `transform opacity-0 scale-95`,
};

const ProjectPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [showOverview, setShowOverview] = useState(true);

  const { project } = useSelector(selectProject);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (project.owner === user._id) {
      dispatch(setIsOwner(true));
    } else {
      dispatch(setIsOwner(false));
    }
  }, [dispatch, projectId, project.owner, user._id]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === `/project/${projectId}` || path === `/project/${projectId}/`) {
      navigate(`/project/${projectId}/files`);
    }
  }, [navigate, projectId]);

  return (
    <div className="w-full sm:pt-9 lg:pt-0">
      <Transition show={showOverview} {...transitionProps}>
        <Overview project={project} />
      </Transition>
      <Workspace
        showOverview={showOverview}
        setShowOverview={setShowOverview}
      />
    </div>
  );
};

export default ProjectPage;

const Overview = ({ project }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { isPlaying, togglePlayPause } = usePlayer();

  const date = new Date(project?.createdAt);
  const DateOptions = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, DateOptions);

  useEffect(() => {
    dispatch(getProjectById(projectId));
  }, [dispatch, projectId]);

  const { isOwner } = useSelector(selectUser);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 w-full bg-primary-400 rounded-lg lg:p-6 mb-8 overflow-hidden">
      <div className="w-full sm:w-44 h-36 md:h-full bg-primary-500 rounded-lg relative">
        <img
          src="https://picsum.photos/id/304/1600/1600"
          alt="project_img"
          className="w-full h-full object-cover lg:rounded-lg"
        />
        <button
          onClick={togglePlayPause}
          className="border-2 rounded-full p-4 bg-black opacity-40 hover:opacity-60 text-white absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <div className="w-full px-3 lg:p-0">
        <div className="flex gap-4 items-center mb-2">
          <h2 className="text-primary-100 text-base lg:text-xl font-semibold">
            {project?.title}
          </h2>
          <span className="text-[10px] bg-primary-300 px-2 lg:px-4 py-[2px] lg:py-1 rounded-2xl text-primary-800">
            {project?.isPrivate ? "Private" : "Public"}
          </span>
        </div>
        <div className="flex gap-4 items-center text-xs lg:text-sm">
          {isOwner && <h1>Owner</h1>}
          <h1>{formattedDate || ""}</h1>
        </div>
        {/* //! */}
        <div className="tracking-[.5em] my-2">
          <WaveSurferPlayer options={options} />
        </div>
        <div>
          <button className="bg-primary-300 inline-flex items-center gap-1 px-2 lg:px-4 py-[2px] lg:py-1.5 rounded-2xl text-[10px]">
            <IoIosShareAlt />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Workspace = ({ showOverview, setShowOverview }) => {
  const { isOwner } = useSelector(selectUser);
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
    <div className="mb-12">
      <header className="flex items-center justify-between mb-8">
        <nav className="flex gap-8 overflow-x-scroll no-scrollbar">
          {NavLinks?.map(
            ({ to, label }) =>
              (to !== "settings" || isOwner) && (
                <div key={to} className="group/link hover:bg-slate-100">
                  <NavLink to={to} className="text-gray-500 font-medium">
                    {label}
                  </NavLink>
                  <div className="w-8 h-[1px] bg-black dark:bg-white rounded-full invisible group-hover/link:visible"></div>
                </div>
              )
          )}
        </nav>
        <button
          onClick={() => setShowOverview((prev) => !prev)}
          className="w-7 flex items-center justify-center text-xl dark:text-gray-500 hover:text-primary-500"
        >
          {showOverview ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
