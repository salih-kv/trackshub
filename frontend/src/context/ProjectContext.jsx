import { createContext, useState } from "react";
import instance from "../axios/instance";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  const getProjectsByUserId = async () => {
    try {
      const response = await instance.get(`/api/v1/project/`);
      setProjects((prev) => [...prev, response.data]);
    } catch (error) {
      throw new Error("Error fetching user's projects");
    }
  };

  const createProject = async (title) => {
    try {
      await instance.post("/api/v1/project/create", { title });
    } catch (err) {
      console.log(err);
    }
  };

  const getProjectById = async (projectId) => {
    try {
      const response = await instance.get(`/api/v1/project/${projectId}`);
      setProject((prev) => ({ ...prev, ...response.data }));
      return project;
    } catch (error) {
      throw new Error("Error fetching project");
    }
  };

  const updateProject = async (projectId, updateData) => {
    try {
      const response = await instance.patch(
        `/api/v1/project/${projectId}`,
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
    <ProjectContext.Provider
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
    </ProjectContext.Provider>
  );
};
