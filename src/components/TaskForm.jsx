import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      notes: notes.trim(),
      status: "todo",
      pinned: false,
    };
    addTask(newTask);
    setTitle("");
    setNotes("");
    setIsExpanded(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Add a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyPress={handleKeyPress}
            className="form-input"
          />
          
          {isExpanded && (
            <div className="form-group">
              <textarea
                placeholder="Add a description..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onKeyPress={handleKeyPress}
                className="form-textarea"
                rows="2"
              />
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle("");
                    setNotes("");
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
