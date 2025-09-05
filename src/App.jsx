import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import WorkProgress from "./components/WorkProgress";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [
      // Sample tasks to match the image
      { id: 1, title: "To-Do", notes: "", status: "todo", pinned: true },
      { id: 2, title: "Doing", notes: "", status: "doing", pinned: true },
      { id: 3, title: "Example task", notes: "", status: "doing", pinned: false },
      { id: 4, title: "Code Review", notes: "", status: "code-review", pinned: true },
      { id: 5, title: "Example task", notes: "", status: "code-review", pinned: false },
      { id: 6, title: "Testing", notes: "", status: "testing", pinned: true },
      { id: 7, title: "Example task", notes: "", status: "testing", pinned: false },
      { id: 8, title: "Done", notes: "", status: "done", pinned: true },
      { id: 9, title: "[Completed task]", notes: "Jan 23, 2020", status: "done", pinned: false }
    ];
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const moveTask = (id, status) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(status);
  };

  const handleDragLeave = (e) => {
    // Only clear if we're actually leaving the column, not just moving between child elements
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== targetStatus) {
      moveTask(draggedTask.id, targetStatus);
    }
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const columns = [
    { title: "To Do", status: "todo", limit: null },
    { title: "Doing", status: "doing", limit: null },
    { title: "Code Review", status: "code-review", limit: 3 },
    { title: "Testing", status: "testing", limit: null },
    { title: "Done", status: "done", limit: null }
  ];

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Task Tracker</h1>
        
        <div className="kanban-board">
          {columns.map((column) => (
            <WorkProgress
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={tasks}
              moveTask={moveTask}
              deleteTask={deleteTask}
              limit={column.limit}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              dragOverColumn={dragOverColumn}
            />
          ))}
        </div>
        
        <div className="task-form-container">
          <TaskForm addTask={addTask} />
        </div>
      </div>
    </div>
  );
}

export default App
