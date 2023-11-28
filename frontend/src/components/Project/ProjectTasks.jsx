import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Select from "react-dropdown-select";
import { BiChevronDown } from "react-icons/bi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const sortOptions = [{ name: "See all", to: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectTasks = () => {
  const [toggle, setToggle] = useState(false);

  const assignee = [
    {
      value: 1,
      label: "user1",
    },
    {
      value: 2,
      label: "user2",
    },
    {
      value: 3,
      label: "user3",
    },
  ];

  const [selectedAssignee, setSelectedAssignee] = useState("");

  return (
    <div className="flex w-full gap-8">
      <div className="w-full">
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
          <button
            className="btn btn-fill py-1.5 px-3 rounded-3xl"
            onClick={() => setToggle(true)}
          >
            Create
          </button>
        </header>

        {/* Create Task Model */}
        {toggle && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white dark:bg-p-dark rounded-lg w-[600px] relative">
              <header className="flex items-center justify-between mt-6 mx-6">
                <h2 className="font-bold">New task</h2>
                <IoMdCloseCircleOutline
                  onClick={() => {
                    setToggle(false);
                  }}
                  className="text-red-500 text-2xl cursor-pointer"
                />
              </header>
              <form className="m-6 flex flex-col">
                <div>
                  <label htmlFor="taskTitle">Title</label>
                  <input type="text" id="taskTitle" className="input" />
                </div>
                <div>
                  <label htmlFor="taskDescription">Description</label>
                  <textarea
                    cols="30"
                    rows="5"
                    id="taskDescription"
                    className="resize-none input"
                  />
                </div>
                <div>
                  <label htmlFor="taskAssignee">Assignee</label>
                  <Select
                    placeholder="select assignee"
                    color="#774eff"
                    dropdownPosition="auto"
                    options={assignee}
                    value={selectedAssignee}
                    onChange={(value) => setSelectedAssignee(value)}
                    className="my-dropdown input !border-none !ring-0 !px-2 !py-3 !rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="taskDueDate">Due date</label>
                  <input type="date" id="taskDueDate" className="input" />
                </div>
                <div className="flex justify-end gap-3">
                  <button className="btn btn-outlined py-1.5 px-3 rounded-3xl">
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-fill py-1.5 px-3 rounded-3xl"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section>
          <div className="relative overflow-x-auto mt-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-s-light border-b dark:bg-p-dark dark:border-s-dark dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    To do
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    In progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Roles Done
                  </th>
                </tr>
              </thead>
              <tbody>{/* tasks */}</tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectTasks;
