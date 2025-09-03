function TaskCard({ task, moveTask, deleteTask }) {
  const nextStatus = {
    todo: "in-progress",
    "in-progress": "done",
    done: "done",
  };

  return (
    <div className="border p-3 rounded mb-2">
      <h3 className="font-medium">{task.title}</h3>
      {task.notes && <p className="text-sm text-gray-600">{task.notes}</p>}
      <div className="flex gap-2 mt-2">
        {task.status !== "done" && (
          <button
            onClick={() => moveTask(task.id, nextStatus[task.status])}
            className="bg-green-500 text-white px-2 rounded"
          >
            Move
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
