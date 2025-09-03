import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import WorkProgress  from "./components/WorkProgress";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

    useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const moveTask = (id, status) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));

  return (
    <div className="Container">
      <h1 className="Title">Task Tracker</h1>
      <TaskForm addTask={addTask} />
      <div className="ProgressGrid">
        <WorkProgress title="To Do" status="todo" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
        <WorkProgress title="In Progress" status="in-progress" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
        <WorkProgress title="Done" status="done" tasks={tasks} moveTask={moveTask} deleteTask={deleteTask} />
      </div>
    </div>
    );
}

export default App
