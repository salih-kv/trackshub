import { createContext, useContext, useState } from "react";
import instance from "../axios/instance";

const projectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);

  const getProjectsByUserId = async () => {
    try {
      const response = await instance.get(`/api/v1/project/`);
      setProjects(response.data);
    } catch (error) {
      throw new Error("Error fetching user's projects");
    }
  };

  const createProject = async (title) => {
    try {
      const response = await instance.post("/api/v1/project/create", { title });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProjectById = async (projectId) => {
    try {
      const response = await instance.get(`/api/v1/project/${projectId}`);
      setProject(response.data);
    } catch (error) {
      throw new Error("Error fetching project");
    }
  };

  const updateProject = async (projectId, updateData) => {
    try {
      const response = await instance.patch(
        `/api/project/${projectId}`,
        updateData
      );
      console.log(response);
    } catch (error) {
      throw new Error("Error updating project");
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await instance.delete(`/api/project/${projectId}`);
      console.log(response);
    } catch (error) {
      throw new Error("Error deleting project");
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects,
        project,
        getProjectsByUserId,
        createProject,
        getProjectById,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </projectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
