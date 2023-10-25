import { Link } from "react-router-dom";
import { TimeStamp } from "../../utils/TimeStamp";
import ProfileImg from "../ProfileImg";

const ProjectCard = ({ projectId, title, createdAt, collaborators }) => {
  const formattedTime = TimeStamp(createdAt);

  return (
    <Link
      to={`/project/${projectId}`}
      className="w-60 h-40 rounded overflow-hidden bg-s-light dark:bg-s-dark"
    >
      <div className="w-full h-2/3 p-3">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-500">{formattedTime}</p>
      </div>
      <div className="w-full h-1/3 bg-blue-gray-800 overflow-hidden flex items-center justify-between">
        <div className="flex items-center -space-x-3 px-3">
          {collaborators?.map((collaborator) => (
            <ProfileImg
              key={collaborator}
              w={6}
              imageStyle={`border-2 border-white`}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
