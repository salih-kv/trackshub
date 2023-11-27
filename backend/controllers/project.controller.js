import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

// create new project ✅
export const createProject = async (req, res, next) => {
  const userId = req.user.id;
  const { title } = req.body;
  try {
    const project = await Project.create({
      title,
      owner: userId,
      isClosed: false,
      isPrivate: true,
    });

    return res.status(200).json({
      status: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// get a project
export const getProjectById = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({ projectId });
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// update project settings
export const updateProject = async (req, res, next) => {
  const { projectId } = req.params;
  const updateData = req.body;

  try {
    const project = await Project.findOneAndUpdate(
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
  const userId = req.user.id;
  const { projectId } = req.params;
  try {
    await Project.findOneAndDelete({ projectId });
    const projects = await Project.find({ owner: userId });
    res.status(200).json({ message: "Project deleted successfully", projects });
  } catch (err) {
    next(err);
  }
};

// get user all projects
export const getProjectsByUserId = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const projects = await Project.find({ owner: userId });
    if (!projects) errorHandler(404, "Projects not found");
    return res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// add collaborator to project
export const addCollaborator = async (req, res, next) => {
  const { projectId, collaboratorId } = req.body;
  try {
    const user = await User.findById(collaboratorId);

    const project = await Project.findOneAndUpdate(
      { projectId: projectId },
      {
        $addToSet: {
          collaborators: {
            collaborator: collaboratorId,
            role: user.role,
            username: user.username,
            userProfile: user.profilePic,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Collaborator added successfully", project });
  } catch (err) {
    next(err);
  }
};
