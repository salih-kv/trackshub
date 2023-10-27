import { CgMusicNote } from "react-icons/cg";
import { BiSolidLayerPlus } from "react-icons/bi";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdAudiotrack } from "react-icons/md";
import { createNewProject } from "../../Redux/project/projectSlice";
import { useDispatch } from "react-redux";

const items = ["All", "Active", "Closed"];

const CollabProjects = () => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex w-full gap-8">
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
      <div className="w-3/4">
        <header className="flex justify-between">
          <div>
            <p className="text-lg font-medium">Collaborate with your team</p>
          </div>
          <div>
            <button
              className="btn btn-fill px-3 py-2 text-sm rounded-xl flex items-center gap-2"
              onClick={() => setToggle(true)}
            >
              <BiSolidLayerPlus className="text-lg" />
              New
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
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
        {/* project input modal ^ */}
        <div className="py-4 flex gap-4 flex-wrap">
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
    </div>
  );
};

export default CollabProjects;
