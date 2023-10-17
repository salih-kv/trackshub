const Tasks = () => {
  return (
    <div className="flex w-full gap-8">
      <Left />
      <Right />
    </div>
  );
};

export default Tasks;

const Left = () => {
  return (
    <div className="w-1/4">
      <div>To do</div>
      <div>In progress</div>
      <div>Done</div>
    </div>
  );
};

const Right = () => {
  return (
    <div className="w-3/4">
      <header>
        <h1 className="text-3xl font-bold mb-1">Tasks</h1>
        <p>All tasks assigned to you</p>
      </header>
      <div></div>
    </div>
  );
};
