import ProfileCard from "../components/Feed/ProfileCard";
import ProjectsCard from "../components/Feed/ProjectsCard";

const Feed = () => {
  return (
    <div className="flex items-center justify-between w-full gap-8 py-4">
      <Left />
      <Middle />
      <Right />
    </div>
  );
};

export default Feed;

const Left = () => {
  return (
    <section className="w-1/4 flex flex-col justify-center items-center">
      <ProfileCard />
      <ProjectsCard />
    </section>
  );
};

const Middle = () => {
  return <section className="w-2/4">Middle</section>;
};

const Right = () => {
  return <section className="w-1/4">Right</section>;
};
