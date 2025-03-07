import { useState } from "react";
import "../index.css";

export default function TodoList({ darkMode, setDarkMode }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectAll, setSelectAll] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditedTask(text);
  };

  const saveEdit = (index) => {
    if (editedTask.trim() === "") return;
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, text: editedTask } : t))
    );
    setEditingIndex(null);
  };

  const handleDeleteAll = () => {
    if (selectAll) {
      setTasks([]);
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setTasks(tasks.map((t) => ({ ...t, completed: !selectAll })));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button className="delete-all-button" onClick={handleDeleteAll} disabled={!selectAll}>Delete All</button>
      </div>
      <div className="select-all-container">
  <input 
    type="checkbox" 
    checked={selectAll} 
    onChange={handleSelectAll} 
    id="select-all"
  />
  <label htmlFor="select-all">Select All</label>
      </div>
      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(index)}
            />
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>✅</button>
              </>
            ) : (
              <>
                <span>{t.text}</span>
                <button onClick={() => startEditing(index, t.text)}>✏️</button>
                <button onClick={() => removeTask(index)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
