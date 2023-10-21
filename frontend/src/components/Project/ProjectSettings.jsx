const ProjectSettings = () => {
  return (
    <div className="flex flex-col gap-12 mb-12 max-w-screen-md">
      <section>
        <h1 className="font-semibold mb-4 text-xl">Project information</h1>
        <div className="flex w-full gap-16">
          <div className="w-1/4">
            <p>Cover</p>
            <div className="w-52 mt-3 h-52 border-2 border-dashed border-s-light dark:border-s-dark rounded-sm">
              {/* Project cover image */}
            </div>
          </div>
          <div className="w-3/4">
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Name your project"
              className="input"
            />
            <label htmlFor="title">Genres</label>
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Genres"
              className="input"
            />
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Start typing tags. Hit Enter to complete."
              className="input"
            />
          </div>
        </div>
      </section>
      <section>
        <h1 className="font-semibold mb-4 text-xl">Project metadata</h1>
        <div className="flex gap-8">
          <div>
            <label htmlFor="title">Song title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Name your song"
              className="input"
            />
          </div>
        </div>
      </section>
      <section>
        <h1 className="font-semibold mb-4 text-xl">Actions</h1>
        <div className="flex items-center gap-8 mb-8">
          <div className="max-w-lg">
            <h6>Close project</h6>
            <p className="text-sm text-gray-400">
              All files, comments and settings are saved when a project is
              closed. The content will be read-only unless it is re-opened.
            </p>
          </div>
          <div>
            <button className="btn btn-outlined py-1.5 px-4 rounded-md">
              Close project
            </button>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="max-w-lg">
            <h6>Delete project</h6>
            <p className="text-sm text-gray-400">
              Warning: All files, comments and settings are permanently deleted
              if a project is deleted.
            </p>
          </div>
          <div>
            <button className="btn btn-secondary py-1.5 px-4 rounded-md">
              Delete project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectSettings;
