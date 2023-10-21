import { Link } from "react-router-dom";
import { TimeStamp } from "../../utils/TimeStamp";

const ProjectCard = ({ projectId, title, createdAt }) => {
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
          <img
            alt="natali craig"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
            className="relative inline-block h-6 w-6 rounded-full border-2 border-white object-cover object-center hover:z-10"
            data-tooltip-target="author-1"
          />

          <img
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            className="relative inline-block h-6 w-6 rounded-full border-2 border-white object-cover object-center hover:z-10"
            data-tooltip-target="author-2"
          />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
