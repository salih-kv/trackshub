import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { CgMusicNote } from "react-icons/cg";

const ProjectsList = () => {
  return (
    <div className="flex w-full gap-8">
      <Left />
      <Right />
    </div>
  );
};

export default ProjectsList;

const Left = () => {
  const items = ["All", "Active", "Closed"];

  return (
    <div className="w-1/4">
      <header className="font-semibold mb-4">
        <h2>Filter by:</h2>
      </header>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items?.map((item) => (
          <button
            key={item}
            className="py-2 text-center rounded-xl bg-s-light dark:bg-s-dark"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const Right = () => {
  return (
    <div className="w-3/4">
      <header className="flex justify-between">
        <div>
          <p className="text-lg font-medium">Collaborate with your team</p>
        </div>
        <div>
          <button className="btn btn-fill px-4 py-3 rounded-xl">
            New Project
          </button>
        </div>
      </header>
      <div className="py-4 flex gap-4 flex-wrap">
        {/* //! Project List Here */}
        <div className="flex items-center justify-center w-full mt-32">
          <div className="flex flex-col items-center justify-center max-w-[240px]">
            <CgMusicNote className="text-4xl mb-4" />
            <p className="text-gray-500 text-center text-xs font-medium">
              It Looks Like You Don't Have Any Projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
