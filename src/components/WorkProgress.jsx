import TaskCard from "./TaskCard";

function WorkProgress({ title, status, tasks, moveTask, deleteTask }) {
  const filtered = tasks.filter((t) => t.status === status);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{title}</h2>
      {filtered.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default WorkProgress;
