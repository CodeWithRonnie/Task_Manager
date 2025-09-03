import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    const newTask = {
      id: Date.now(),
      title,
      notes,
      status: "todo",
    };
    addTask(newTask);
    setTitle("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <input
        type="text"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
}

export default TaskForm;
