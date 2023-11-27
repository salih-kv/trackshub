import { useState } from "react";
import { MdLock } from "react-icons/md";

const ProjectComments = () => {
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <>
      <section></section>
      {isPrivate && (
        <div className="flex items-center justify-center mt-32">
          <div className="flex flex-col items-center justify-center max-w-[240px]">
            <MdLock className="text-4xl mb-4" />
            <h2 className="font-semibold text-center">
              You can't get feedback on a private project.
            </h2>
            <p className="text-gray-500 text-center text-xs font-medium">
              Publish this project to be able to leave a comment
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectComments;
