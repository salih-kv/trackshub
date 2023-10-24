import ProfileImg from "../ProfileImg";
import { BsThreeDotsVertical } from "react-icons/bs";

const Collaborators = () => {
  return (
    <div>
      <header className="flex items-center justify-end">
        <button className="btn btn-fill py-1.5 px-3 rounded-lg">Invite</button>
      </header>
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
              <Collaborator />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Collaborators;

const Collaborator = () => {
  return (
    <tr className="bg-white border-b dark:bg-p-dark dark:border-s-dark hover:dark:bg-s-dark">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-4"
      >
        <span>
          <ProfileImg w={8} />
        </span>
        <span>Username</span>
      </th>
      <td className="px-6 py-4">Owner</td>
      <td className="py-4">
        <BsThreeDotsVertical />
      </td>
    </tr>
  );
};
