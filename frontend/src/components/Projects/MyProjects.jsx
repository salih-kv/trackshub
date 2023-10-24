import { FaPlus } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdAudiotrack } from "react-icons/md";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import {
  fetchProjectsByUserId,
  createNewProject,
} from "../../Redux/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";

const MyProjects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.project);

  useEffect(() => {
    if (!loading) {
      dispatch(fetchProjectsByUserId());
    }
  }, [dispatch]);

  return (
    <div className="flex w-full gap-8">
      <Left />
      <Right projects={projects} dispatch={dispatch} loading={loading} />
    </div>
  );
};

export default MyProjects;

const Left = () => {
  const items = ["All", "Active", "Closed"];
  return (
    <div className="w-1/4">
      <header className="font-semibold mb-4">
        <h2>Filter by:</h2>
      </header>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items?.map((item) => (
          <div
            key={item}
            className="py-2 text-center rounded-xl bg-s-light dark:bg-s-dark"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const Right = ({ projects, dispatch }) => {
  const [toggle, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-3/4">
      <header className="flex justify-between">
        <div>
          <p>Projects Created by you</p>
        </div>
        <div>
          <button
            className="btn btn-fill px-4 py-3 rounded-xl"
            onClick={() => setToggle(true)}
          >
            New Project
          </button>
        </div>
      </header>

      {/* project input modal */}
      {toggle && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
          onClick={() => setToggle(false)}
        >
          <div className="bg-white dark:bg-p-dark p-6 rounded-lg">
            <header className="flex items-center justify-between mb-2">
              <h2>New Project</h2>
              <IoMdCloseCircleOutline
                onClick={() => setToggle(false)}
                className="text-red-500 text-2xl cursor-pointer"
              />
            </header>
            <div className="relative flex items-center group">
              <MdAudiotrack className="text-xl absolute left-2 top-[24px] z-30 group-focus-within:text-primary-500" />
              <input
                type="text"
                className="input !pl-10"
                placeholder="Project Name"
                value={inputValue}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="btn dark:bg-s-dark ml-4 py-1.5 px-3 rounded-lg"
                onClick={() => {
                  dispatch(createNewProject(inputValue));
                  setInputValue("");
                  dispatch(fetchProjectsByUserId());
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {/* project input modal */}

      <div className="py-4 flex gap-4 flex-wrap">
        <button
          onClick={() => setToggle(true)}
          className="w-60 h-40 flex items-center justify-center rounded bg-s-light dark:bg-s-dark"
        >
          <FaPlus className="text-lg text-s-dark dark:text-s-light" />
        </button>

        {projects?.map((project) => (
          <ProjectCard {...project} key={project.title} />
        ))}
      </div>
    </div>
  );
};
