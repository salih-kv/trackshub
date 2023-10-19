import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

const MyProjects = () => {
  return (
    <div className="flex w-full gap-8">
      <Left />
      <Right />
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

const Right = () => {
  const [toggle, setToggle] = useState(false);

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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white dark:bg-p-dark p-6 rounded-lg">
            <input type="text" className="input" placeholder="Project Name" />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setToggle(false)}
                className="btn btn-secondary dark:bg-p-dark py-1.5 px-3 rounded-lg"
              >
                close
              </button>
              <button className="btn dark:bg-s-dark ml-4 py-1.5 px-3 rounded-lg">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      {/* project input modal */}

      <div className="py-4 flex gap-4 flex-wrap">
        <button className="w-60 h-40 flex items-center justify-center rounded bg-s-light dark:bg-s-dark">
          <FaPlus className="text-lg text-s-dark dark:text-s-light" />
        </button>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};
