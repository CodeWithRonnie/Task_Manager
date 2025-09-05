import TaskCard from "./TaskCard";

function WorkProgress({ title, status, tasks, moveTask, deleteTask, limit, onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop, dragOverColumn }) {
  const filtered = tasks.filter((t) => t.status === status);
  const taskCount = filtered.length;
  const isOverLimit = limit && taskCount > limit;

  const getColumnClass = (status) => {
    let baseClass = "column ";
    switch (status) {
      case "todo":
        baseClass += "column-todo";
        break;
      case "in-progress":
        baseClass += "column-doing";
        break;
      case "postponed":
        baseClass += "column-code-review";
        break;
      case "completed":
        baseClass += "column-done";
        break;
      default:
        baseClass += "column-todo";
    }
    
    if (dragOverColumn === status) {
      baseClass += " drag-over";
    }
    
    return baseClass;
  };

  return (
    <div 
      className={getColumnClass(status)}
      onDragOver={(e) => onDragOver(e, status)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, status)}
    >
      {/* Column Header */}
      <div className="column-header">
        <div className="task-icon-title">
          <h2 className="column-title">{title}</h2>
          <span className="column-count">
            {taskCount}
          </span>
        </div>
        {limit && (
          <div className="column-limit">
            {taskCount}/{limit}
          </div>
        )}
      </div>

      {/* Over limit warning */}
      {isOverLimit && (
        <div className="over-limit-warning">
          This list has the List Limits Power-up enabled, to help the team prioritize and remove bottlenecks before picking up new work. The list will be highlighted if the number of cards in it passes the limit that the team determines based on team size.
        </div>
      )}

      {/* Tasks Container */}
      <div className="tasks-container">
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
}

export default WorkProgress;
