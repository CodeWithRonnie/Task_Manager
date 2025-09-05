function TaskCard({ task, moveTask, deleteTask, onDragStart, onDragEnd }) {
  const nextStatus = {
    todo: "doing",
    doing: "code-review",
    "code-review": "testing",
    testing: "done",
    done: "done",
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return "✓";
      default:
        return "📌";
    }
  };

  const getTaskCardClass = (status) => {
    switch (status) {
      case "todo":
        return "task-card task-card-todo";
      case "doing":
        return "task-card task-card-doing";
      case "code-review":
        return "task-card task-card-code-review";
      case "testing":
        return "task-card task-card-testing";
      case "done":
        return "task-card task-card-done";
      default:
        return "task-card task-card-todo";
    }
  };

  return (
    <div 
      className={getTaskCardClass(task.status)}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
      {/* Card Header */}
      <div className="task-header">
        <div className="task-icon-title">
          <span className="task-icon">{getStatusIcon(task.status)}</span>
          <h3 className="task-title">{task.title}</h3>
        </div>
        {task.pinned && (
          <span className="task-number">1</span>
        )}
      </div>

      {/* Card Content */}
      {task.notes && (
        <p className="task-notes">{task.notes}</p>
      )}

      {/* Card Actions */}
      <div className="task-actions">
        <button
          onClick={() => deleteTask(task.id)}
          className="btn btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
