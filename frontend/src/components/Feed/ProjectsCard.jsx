import { BsThreeDots } from "react-icons/bs";
import { TimeStamp } from "../../utils/TimeStamp";
import { Link } from "react-router-dom";

const ProjectsCard = ({ projectId, title, createdAt }) => {
  const formattedTime = TimeStamp(createdAt);
  return (
    <Link
      to={`/project/${projectId}`}
      className="w-full my-1 p-2 hover:bg-s-light hover:dark:bg-s-dark rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 mr-4">
          <img
            src={`https://ui-avatars.com/api/?name=${title}&length=1&bold=true&background=${"B73D0D"}&color=fff&size=256`}
            alt=""
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="mr-auto">
          <h4 className="font-medium">{title}</h4>
          <p className="text-gray-500 text-xs">{formattedTime}</p>
        </div>
        <div>
          <BsThreeDots className="text-gray-500" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectsCard;
