import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";

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

const Right = () => {
  return (
    <div className="w-3/4">
      <header className="flex justify-between">
        <div>
          {/* <h1 className="text-3xl font-bold mb-1">Projects</h1> */}
          <p>Collaborate with your team</p>
        </div>
        <div>
          <button className="btn btn-fill px-4 py-3 rounded-xl">
            New Project
          </button>
        </div>
      </header>
      <div className="py-4 flex gap-4 flex-wrap">
        <button className="w-60 h-40 flex items-center justify-center rounded bg-s-light dark:bg-s-dark">
          <FaPlus className="text-lg text-s-dark dark:text-s-light" />
        </button>
        {/* //! Project List Here */}
      </div>
    </div>
  );
};
