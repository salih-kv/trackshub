import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Select from "react-dropdown-select";
import { BiChevronDown } from "react-icons/bi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewTask,
  fetchTasksByProjectId,
  selectTask,
} from "../../Redux/slices/taskSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "../Tasks/Task.jsx";
import { selectProject } from "../../Redux/slices/projectSlice";

const sortOptions = [{ name: "See all", to: "", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectTasks = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { tasks } = useSelector(selectTask);
  const { project } = useSelector(selectProject);
  const [toggle, setToggle] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [assigneeOptions, setAssigneeOptions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: {
      username: "",
      userProfile: "",
    },
    dueDate: "",
  });

  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      tasks: [],
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      tasks: [],
    },
    done: {
      id: "done",
      title: "Done",
      tasks: [],
    },
  });

  useEffect(() => {
    if (project?.collaborators && project.collaborators.length > 0) {
      setAssigneeOptions(() =>
        project.collaborators.map(
          ({ collaborator, username, userProfile }) => ({
            collaborator,
            username,
            userProfile,
          })
        )
      );
    }
  }, [project?.collaborators]);

  useEffect(() => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      todo: { ...prevColumns.todo, tasks: tasks.todo || [] },
      inProgress: { ...prevColumns.inProgress, tasks: tasks.inProgress || [] },
      done: { ...prevColumns.done, tasks: tasks.done || [] },
    }));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsDirty(true);
  };

  const handleSelectChange = (selectedAssignee) => {
    const { username, userProfile } = selectedAssignee[0];
    setFormData({
      ...formData,
      assignee: {
        username,
        userProfile,
      },
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewTask({ formData, projectId }));
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
    });
    setToggle(false);
  };

  useEffect(() => {
    dispatch(fetchTasksByProjectId(projectId));
  }, [dispatch, projectId]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Check if there is no destination or if the destination is the same as the source
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    // Move between columns
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceTasks = Array.from(sourceColumn.tasks);
    const destinationTasks = Array.from(destinationColumn.tasks);

    const [movedItem] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, movedItem);

    columns[source.droppableId].tasks = sourceTasks;
    columns[destination.droppableId].tasks = destinationTasks;
  };

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

        {/* Create Task Modal */}
        {toggle && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white dark:bg-p-dark rounded-lg w-[600px] max-h-[90vh] overflow-y-auto relative">
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
                  <input
                    type="text"
                    id="taskTitle"
                    className="input"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="taskDescription">Description</label>
                  <textarea
                    cols="30"
                    rows="3"
                    id="taskDescription"
                    className="resize-none input"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between items-center gap-6">
                  <div className="w-full">
                    <label htmlFor="taskAssignee">Assignee</label>
                    <Select
                      placeholder="select assignee"
                      color="#774eff"
                      dropdownPosition="auto"
                      options={assigneeOptions}
                      labelField="username"
                      valueField="collaborator"
                      onChange={handleSelectChange}
                      className="my-dropdown input !border-none !ring-0 !px-2 !py-3 !rounded-lg"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="taskDueDate">Due date</label>
                    <input
                      type="date"
                      id="taskDueDate"
                      className="input"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="btn btn-outlined py-1.5 px-3 rounded-3xl"
                    onClick={() => {
                      setFormData({
                        title: "",
                        description: "",
                        assignee: "",
                        dueDate: "",
                      });
                      setIsDirty(false);
                    }}
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty}
                    onClick={handleFormSubmit}
                    className="btn btn-fill py-1.5 px-3 rounded-3xl"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* <section>
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
                    Done
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task) => (
                  <Task key={task._id} {...task} />
                ))}
              </tbody>
            </table>
          </div>
        </section> */}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.keys(columns).map((columnId) => {
              const column = columns[columnId];
              return (
                <div key={columnId} className="mb-12 py-4 md:mb-0">
                  <h3 className="mb-2 font-bold select-none text-gray-700 dark:text-gray-400">
                    {column.title}
                  </h3>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`p-4 border dark:border-gray-800 rounded-md w-full h-full ${
                          snapshot.isDraggingOver
                            ? "bg-primary-100 dark:bg-primary-300"
                            : "bg-s-light dark:bg-s-dark"
                        }`}
                      >
                        {column?.tasks?.map((task, index) => (
                          <Draggable
                            key={index}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Task
                                task={task}
                                provided={provided}
                                snapshot={snapshot}
                              />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProjectTasks;
