import { Link } from "react-router-dom";
import { TimeStamp } from "../../utils/TimeStamp";
import ProfileImg from "../ProfileImg";
import { IoMdMusicalNote } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";

const ProjectCard = ({ projectId, title, createdAt, collaborators }) => {
  const formattedTime = TimeStamp(createdAt);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-full rounded-md overflow-hidden bg-s-light dark:bg-s-dark p-4">
      <div className="flex items-center justify-between">
        <IoMdMusicalNote />
        <button className="p-2" onClick={() => setToggle(!toggle)}>
          <BsThreeDotsVertical />
        </button>
      </div>
      <Link to={`/project/${projectId}/files`}>
        <div className="w-full h-1/3 my-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-xs text-gray-500">{formattedTime}</p>
        </div>
      </Link>
      <div className="w-full h-1/3 overflow-hidden flex items-center justify-between my-2">
        <Link
          to={`/project/${projectId}/collaborators`}
          className="flex items-center -space-x-3"
        >
          {collaborators?.map((collaborator) => (
            <ProfileImg
              profileURL={collaborator.userProfile}
              key={collaborator}
              w={7}
              imageStyle={`border-2 border-white`}
            />
          ))}

          <div className="w-7 h-7 bg-[#efeffe] dark:bg-gray-500 rounded-full flex items-center justify-center">
            <BiPlus className="text-xs font-semibold text-s-dark dark:text-s-light" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
