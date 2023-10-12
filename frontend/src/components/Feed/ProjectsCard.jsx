import { BsFillLayersFill, BsThreeDots } from "react-icons/bs";

const ProjectsCard = () => {
  return (
    <div className="w-full mt-8">
      <header className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Projects</h4>
        <span className="text-gray-500 text-sm">View All</span>
      </header>
      <div className="flex items-center justify-between">
        <div className="w-15 h-auto mr-6">
          {/* project thumbnail */}
          {/* <img src="" alt="" /> */}
          <BsFillLayersFill className="text-5xl text-primary-400" />
        </div>
        <div className="mr-auto">
          <h4 className="font-semibold text-base">New Project</h4>
          <p className="text-gray-500 text-xs">22h ago</p>
        </div>
        <div>
          <BsThreeDots className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;
