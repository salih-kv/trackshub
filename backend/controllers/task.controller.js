import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (req, res, next) => {
  const { title, description, assignee, dueDate } = req.body;
  const { projectId } = req.params;

  try {
    const project = await Project.findOne({ projectId });
    const newTask = await Task.create({
      project: { projectId, title: project.title },
      title,
      description,
      assignee,
      dueDate,
    });

    res.status(200).json({
      status: true,
      message: "New task created successfully",
      newTask,
    });
  } catch (err) {
    next(err);
  }
};

export const getTasksByProjectId = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ projectId });
    if (!tasks) errorHandler(404, "Tasks not found");

    // Categorize tasks into todo, inprogress, and done
    const categorizedTasks = {
      todo: tasks.filter((task) => task.status === "todo"),
      inprogress: tasks.filter((task) => task.status === "inprogress"),
      done: tasks.filter((task) => task.status === "done"),
    };

    return res.status(200).json({ tasks: categorizedTasks });
  } catch (err) {
    next(err);
  }
};

export const getUserTasks = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ _id: userId });
    const tasks = await Task.find({ "assignee.username": user.username });
    if (!tasks) errorHandler(404, "Tasks not found");

    const categorizedTasks = {
      todo: tasks.filter((task) => task.status === "todo"),
      inprogress: tasks.filter((task) => task.status === "inprogress"),
      done: tasks.filter((task) => task.status === "done"),
    };

    return res.status(200).json({ tasks: categorizedTasks });
  } catch (err) {
    next(err);
  }
};
