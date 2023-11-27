import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Task = ({ item, provided, snapshot }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className={`select-none p-3 mb-3 min-h-[60px] rounded-lg text-sm text-white ${
      snapshot.isDragging ? "bg-[#263B4A]" : "bg-[#383b4c]"
    }`}
  >
    {item.content}
  </div>
);

const Tasks = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("");
        const data = await response.json();

        setTasks({
          todo: data.todo || [],
          inProgress: data.inProgress || [],
          done: data.done || [],
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const items = [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
    { id: "3", content: "Task 3" },
    { id: "4", content: "Task 4" },
    { id: "6", content: "Task 5" },
    { id: "7", content: "Task 7" },
  ];

  const columns = {
    todo: {
      id: "todo",
      title: "To Do",
      items: items,
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      items: [],
    },
    done: {
      id: "done",
      title: "Done",
      items: [],
    },
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const column = columns[source.droppableId];
      const newItems = Array.from(column.items);
      newItems.splice(source.index, 1);
      newItems.splice(
        destination.index,
        0,
        items.find((item) => item.id === draggableId)
      );
      columns[source.droppableId].items = newItems;
    } else {
      // Move between columns
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destinationItems = Array.from(destinationColumn.items);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      columns[source.droppableId].items = sourceItems;
      columns[destination.droppableId].items = destinationItems;
    }
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
                      ref={provided.innerRef}
                      className={`p-4 border dark:border-gray-800 rounded-md w-full h-full ${
                        snapshot.isDraggingOver
                          ? "bg-primary-100 dark:bg-primary-300"
                          : "bg-s-light dark:bg-s-dark"
                      }`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Task
                              item={item}
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
