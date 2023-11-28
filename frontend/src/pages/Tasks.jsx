import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdAccessTime } from "react-icons/md";

const Task = ({ task, provided, snapshot }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className={`select-none p-3 mb-3 min-h-[60px] rounded-lg text-sm text-white ${
      snapshot.isDragging ? "bg-[#263B4A]" : "bg-[#383b4c]"
    }`}
  >
    <h1 className="mb-2">{task.content}</h1>
    <p className="mb-4 text-gray-400 h-12 overflow-hidden">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, velit.
    </p>
    <div className="flex items-center justify-between">
      <div className="text-xs inline-flex items-center gap-1 bg-red-500 rounded-xl px-2 py-1">
        <MdAccessTime className="text-base" />
        <span>Nov 20</span>
      </div>
      <span>projectname</span>
    </div>
  </div>
);

const tasks = [
  { id: "1", content: "Task 1" },
  { id: "2", content: "Task 2" },
  { id: "3", content: "Task 3" },
  { id: "4", content: "Task 4" },
  { id: "5", content: "Task 5" },
  { id: "6", content: "Task 6" },
];

const Tasks = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      tasks: tasks,
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
    const fetchData = async () => {
      try {
        // const response = await fetch("");
        // const data = await response.json();
        // setTasks({
        //   todo: data.todo || [],
        //   inProgress: data.inProgress || [],
        //   done: data.done || [],
        // });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

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
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
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
  );
};

export default Tasks;
