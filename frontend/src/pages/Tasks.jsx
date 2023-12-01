import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Task } from "../components/Tasks/Task";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksByUserId, selectTask } from "../Redux/slices/taskSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(selectTask);
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
    dispatch(fetchTasksByUserId());
  }, [dispatch]);

  useEffect(() => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      todo: { ...prevColumns.todo, tasks: tasks.todo || [] },
      inProgress: { ...prevColumns.inProgress, tasks: tasks.inProgress || [] },
      done: { ...prevColumns.done, tasks: tasks.done || [] },
    }));
  }, [tasks]);

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
    <div className="py-0 sm:py-8 lg:py-4 mx-4 lg:mx-0 mb-8 w-full">
      <header className="mb-8">
        <p>All tasks assigned to you</p>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.keys(columns).map((columnId) => {
            const column = columns[columnId];
            return (
              <div key={columnId} className="mb-12 md:mb-0">
                <h3 className="mb-4 font-bold select-none">{column.title}</h3>
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
                              showProjectTitle={true}
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
  );
};

export default Tasks;
