import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateProject,
  deleteProject,
  selectProject,
} from "../../Redux/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";

const ProjectSettings = () => {
  const { projectId } = useParams();
  const { project, loading } = useSelector(selectProject);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const confirmDelete = async () => {
    setShowDeleteConfirmation(true);
  };

  const [input, setInput] = useState(project);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const update = async (e) => {
    e.preventDefault();
    await dispatch(updateProject({ projectId, updateData: input }));
    setIsDirty(false);
  };

  useEffect(() => {
    if (!loading) {
      setInput(project);
    }
  }, [project, loading]);

  return (
    <div className="flex flex-col gap-12 mb-12 max-w-screen-md">
      <section>
        <h1 className="font-semibold mb-4 text-xl">Project information</h1>
        <div className="flex flex-col md:flex-row w-full gap-6 lg:gap-8">
          <div className="">
            <p>Cover</p>
            <div className="w-full h-36 md:aspect-square mt-3 border-2 border-dashed border-primary-400 rounded-sm">
              {/* Project cover image */}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Name your project"
              className="input"
              value={input?.title || ""}
              onChange={handleInputChange}
            />
            <label htmlFor="genres">Genres</label>
            <input
              type="text"
              id="genres"
              name="genres"
              placeholder="Genres"
              className="input"
              value={input?.genres || ""}
              onChange={handleInputChange}
            />
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Start typing tags. Hit Enter to complete."
              className="input"
              value={input?.tags || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </section>
      <section>
        <h1 className="font-semibold mb-4 text-xl">Project metadata</h1>
        <div className="flex flex-col justify-between md:flex-row gap-2 md:gap-8">
          <div className="w-full">
            <label htmlFor="songTitle">Song title</label>
            <input
              id="songTitle"
              name="songTitle"
              placeholder="Name your song"
              className="input"
              value={input?.songTitle || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              placeholder="Song description"
              className="input"
              value={input?.description || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button className="btn btn-outlined py-1.5 px-3 rounded-3xl">
            cancel
          </button>
          <button
            type="submit"
            className="btn btn-fill py-1.5 px-3 rounded-3xl"
            disabled={!isDirty}
            onClick={update}
          >
            Save
          </button>
        </div>
      </section>
      <section>
        <h1 className="font-semibold mb-4 text-xl">Actions</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-8 mb-8">
          <div className="">
            <h6>Close project</h6>
            <p className="text-sm text-gray-400">
              All files, comments and settings are saved when a project is
              closed. The content will be read-only unless it is re-opened.
            </p>
          </div>
          <button className="btn  border border-gray-500 py-1.5 px-4 rounded-md">
            Close project
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-8">
          <div className="max-w-lg">
            <h6>Delete project</h6>
            <p className="text-sm text-gray-400">
              Warning: All files, comments and settings are permanently deleted
              if a project is deleted.
            </p>
          </div>
          <button
            className="btn btn-secondary py-1.5 px-4 rounded-md"
            onClick={confirmDelete}
          >
            Delete project
          </button>
        </div>
      </section>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white dark:bg-s-dark p-6 rounded-lg">
            <p>Are you sure you want to delete your project?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="btn btn-secondary dark:bg-p-dark py-1.5 px-3 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(deleteProject(projectId));
                  navigate("/projects/my-projects");
                }}
                className="btn btn-fill ml-4 py-1.5 px-3 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSettings;
