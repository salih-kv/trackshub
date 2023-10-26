import { BsFillLayersFill, BsThreeDots } from "react-icons/bs";
import { TimeStamp } from "../../utils/TimeStamp";
import { Link } from "react-router-dom";

const ProjectsCard = ({ projectId, title, createdAt }) => {
  const formattedTime = TimeStamp(createdAt);
  return (
    <Link to={`/project/${projectId}`} className="w-full m-2">
      <div className="flex items-center justify-between">
        <div className="w-15 h-auto mr-6">
          {/* project thumbnail */}
          {/* <img src="" alt="" /> */}
          {<BsFillLayersFill className="text-5xl text-primary-400" />}
        </div>
        <div className="mr-auto">
          <h4 className="font-semibold text-base">{title}</h4>
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
