import { useState } from "react";
import ProfileImg from "../ProfileImg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiUserFollowLine } from "react-icons/ri";
import instance from "../../axios/instance";
import {
  addCollaborator,
  selectProject,
} from "../../Redux/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProjectCollaborators = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { project } = useSelector(selectProject);
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [isInvited, setIsInvited] = useState({});

  const searchUsers = async () => {
    try {
      const response = await instance.get(
        `/api/v1/user/search?q=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInvite = (collaboratorId) => {
    dispatch(
      addCollaborator({
        projectId,
        collaboratorId,
      })
    );

    setIsInvited((prev) => ({
      ...prev,
      [collaboratorId]: {
        isInvited: !prev[collaboratorId]?.isInvited || true,
      },
    }));
  };

  return (
    <div>
      <header className="flex items-center justify-end">
        <button
          onClick={() => setToggle(!toggle)}
          className="btn btn-fill py-1.5 px-3 rounded-3xl"
        >
          Invite
        </button>
      </header>
      {/* Search Model */}
      {toggle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white dark:bg-p-dark rounded-lg w-[400px] relative">
            <header className="flex items-center justify-between mt-6 mx-6">
              <h2>Search for collaborators</h2>
              <IoMdCloseCircleOutline
                onClick={() => {
                  setToggle(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="text-red-500 text-2xl cursor-pointer"
              />
            </header>
            <div className="flex items-center group m-6">
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchUsers();
                }}
                className="hidden md:block px-2 lg:px-4 py-2 w-full rounded-md dark:text-white bg-s-light dark:bg-s-dark focus:border-primary-500 outline-none"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-36 z-20">
                <div className="rounded-lg shadow-lg bg-p-light dark:bg-p-dark min-w-[400px] text-sm p-2">
                  {searchResults.map((result) => (
                    <div key={result._id}>
                      <div className="flex items-center justify-between p-2 w-full rounded-md hover:bg-s-light dark:hover:bg-s-dark">
                        <div className="flex items-center">
                          <ProfileImg
                            w={10}
                            profileURL={result?.profilePic}
                            buttonStyle={`mr-4`}
                            name={result?.name}
                          />
                          <div>
                            <h4 className="font-bold">{result?.name}</h4>
                            <p className="text-xs font-semibold text-gray-500">{`@${result?.username}`}</p>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => handleInvite(result._id)}
                            className="btn btn-fill w-16 h-8 rounded-2xl"
                          >
                            {isInvited[result._id] ? (
                              <RiUserFollowLine />
                            ) : (
                              <span className="text-xs">Invite</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <section>
        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-s-light border-b dark:bg-p-dark dark:border-s-dark dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Collaborator
                </th>
                <th scope="col" className="px-6 py-3">
                  Roles
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {project?.collaborators?.map((collaborator) => (
                <Collaborator
                  key={collaborator.collaborator}
                  {...collaborator}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProjectCollaborators;

const Collaborator = ({ username, userProfile, role }) => {
  return (
    <tr className="bg-white border-b dark:bg-p-dark dark:border-s-dark hover:dark:bg-s-dark">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-4"
      >
        <span>
          <ProfileImg profileURL={userProfile} w={8} />
        </span>
        <span>{username}</span>
      </th>
      <td className="px-6 py-4">{role}</td>
      <td className="py-4">
        <BsThreeDotsVertical />
      </td>
    </tr>
  );
};
