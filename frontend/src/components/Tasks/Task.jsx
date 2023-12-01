import { MdAccessTime } from "react-icons/md";
import ProfileImg from "../ProfileImg";
import { Link } from "react-router-dom";

export const Task = ({ task, showProjectTitle, provided, snapshot }) => {
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`select-none p-3 mb-3 min-h-[60px] rounded-lg text-sm dark:text-white ${
        snapshot.isDragging
          ? "bg-primary-300 dark:bg-[#616581]"
          : "bg-primary-200 dark:bg-[#383b4c]"
      }`}
    >
      <h1 className="mb-2">{task.title}</h1>
      <p className="mb-4 text-gray-400 h-12 overflow-hidden">
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        {task.dueDate && (
          <div className="text-xs inline-flex items-center gap-1 bg-red-500 text-white rounded-xl px-2 py-1">
            <MdAccessTime className="text-base" />
            <span>{formattedDueDate}</span>
          </div>
        )}
        {showProjectTitle ? (
          <Link
            to={`/project/${task.project.projectId}/tasks`}
            className="text-xs bg-gray-50 dark:bg-s-dark px-2 py-1 rounded-xl"
          >
            #{task.project.title}
          </Link>
        ) : (
          <div className="ring-2 ring-primary-100 rounded-full self-end">
            <ProfileImg w={6} profileURL={task.assignee.userProfile} />
          </div>
        )}
      </div>
    </div>
  );
};
