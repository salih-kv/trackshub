const Files = () => {
  return (
    <div>
      <header>
        <div>Filter by: All files</div>
        <div>
          <button>Upload files</button>
        </div>
      </header>
      <section>
        <header>
          {/* checkbox */}
          {/* Name */}
          {/* Uploaded */}
        </header>
        <div>
          <File />
        </div>
      </section>
    </div>
  );
};

export default Files;

const File = () => {
  return (
    <div>
      <input type="checkbox" name="" id="" />
      <div>
        <div>{/* file type icon */}</div>
        <div>{/* filename */}</div>
        <div>{/* uploaded date */}</div>
        <div>{/* ... more */}</div>
      </div>
    </div>
  );
};
