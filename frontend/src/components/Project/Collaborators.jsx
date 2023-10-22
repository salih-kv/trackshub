const Collaborators = () => {
  return (
    <div>
      <header>
        <div>
          <button>Invite collaborators</button>
        </div>
      </header>
      <section>
        <header>
          {/* Collaborator */}
          {/* Roles */}
          {/* ... */}
        </header>
        <div>
          <Collaborator />
        </div>
      </section>
    </div>
  );
};

export default Collaborators;

const Collaborator = () => {
  return (
    <div>
      <input type="checkbox" name="" id="" />
      <div>
        <div>{/* Collaborator icon & username */}</div>
        <div>{/* role (onwner,...) */}</div>
        <div>{/* ... more */}</div>
      </div>
    </div>
  );
};
