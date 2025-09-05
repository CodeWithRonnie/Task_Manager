import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import WorkProgress from "./components/WorkProgress";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [
      // Sample tasks for the new structure
      { id: 1, title: "Design new feature", notes: "Create wireframes and mockups", status: "todo" },
      { id: 2, title: "Implement user authentication", notes: "Add login and signup functionality", status: "in-progress" },
      { id: 3, title: "Fix responsive layout", notes: "Make sure it works on mobile", status: "in-progress" },
      { id: 4, title: "Update documentation", notes: "Need to wait for API changes", status: "postponed" },
      { id: 5, title: "Code review for payment system", notes: "Review security implementation", status: "postponed" },
      { id: 6, title: "Deploy to production", notes: "Final deployment after testing", status: "completed" },
      { id: 7, title: "User testing feedback", notes: "Collected and analyzed", status: "completed" }
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
    { title: "In Progress", status: "in-progress", limit: null },
    { title: "Postponed", status: "postponed", limit: null },
    { title: "Completed", status: "completed", limit: null }
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
