import { useState } from "react";

export default function TaskInput({ setTasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [due, setDue] = useState("");

  const addTask = async () => {
    if (!title || !due) return;

    const res = await fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        priority,
        due_datetime: due
      }),
    });

    const data = await res.json();
    setTasks(prev => [...prev, data]);
    setTitle("");
  };

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="bg-gray-900 border border-green-500 p-4 rounded-lg mb-10">
      <div className="grid grid-cols-4 gap-4">
        <input
          className="col-span-2 bg-black border border-gray-600 p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}   
        />

        <select
          className="bg-black border border-gray-600 p-2 rounded"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="datetime-local"
          className="bg-black border border-gray-600 p-2 rounded"
          value={due}
          onChange={e => setDue(e.target.value)}
        />
      </div>

      <button
        onClick={addTask}
        className="mt-4 bg-green-500 text-black px-6 py-2 rounded font-semibold hover:bg-green-400"
      >
        Add Task
      </button>
    </div>
  );
}
