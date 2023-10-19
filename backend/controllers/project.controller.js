import { Projects } from "../models/project.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// get a project
export const getProjectById = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Projects.findOne({ projectId });
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// create project
export const createProject = async (req, res, next) => {
  const userId = req.user.id;
  const { name, ...rest } = req.body;
  try {
    const mandatoryFields = {
      name: name,
      owner: userId,
      isClosed: false, // By default, the project is not closed
      isPrivate: true, // By default, the project is private
    };

    const project = new Projects({ ...mandatoryFields, ...rest });
    await project.save();

    return res.status(200).json({
      status: true,
      message: "Project created successfully",
    });
  } catch (err) {
    next(err);
  }
};

// update project settings
export const updateProject = async (req, res, next) => {
  const { projectId } = req.params;
  const updateData = req.body;

  try {
    const project = await Projects.findOneAndUpdate(
      { projectId: projectId },
      updateData,
      { new: true } // To return the updated document
    );

    if (!project) errorHandler(404, "Project not found");

    return res.status(200).json({
      status: true,
      message: "Project updated successfully",
      project,
    });
  } catch (err) {
    next(err);
  }
};

// delete project
export const deleteProject = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const deletedProject = await Projects.findOneAndDelete({ projectId });
    if (!deletedProject) errorHandler(404, "Project not found");
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// get user projects
export const getProjectsByUserId = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const projects = await Projects.find({ owner: userId });
    if (!projects) errorHandler(404, "Projects not found");
    return res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
