import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

const sortOptions = [
  { name: "All files", to: "#", current: true },
  { name: "Audio files", to: "#", current: false },
  { name: "Text files", to: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectFiles = () => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-600">
              Filter by
              <BiChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-32 origin-top-left rounded-md bg-white dark:bg-s-dark shadow-2xl outline-none">
                <div className="py-1">
                  {sortOptions?.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <Link
                          to={option.to}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900 dark:text-s-light"
                              : "text-gray-500",
                            active ? "bg-gray-100 dark:bg-p-dark" : "",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div>
          <button className="btn btn-fill py-1.5 px-3 rounded-3xl">
            Upload
          </button>
        </div>
      </header>
      <section className="mt-4">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b dark:bg-p-dark dark:border-s-dark dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
                <th scope="col" className="px-6 py-3">
                  Uploaded
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <File />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProjectFiles;

const File = () => {
  return (
    <tr className="bg-white border-b dark:bg-p-dark dark:border-s-dark hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        Lyrics.text
      </th>
      <td className="px-6 py-4">5 KB</td>
      <td className="px-6 py-4">Sep 15,2023</td>
      <td className="py-4">
        <BsThreeDotsVertical />
      </td>
    </tr>
  );
};
