import { useEffect, useState } from "react";

export default function TaskList({ tasks, setTasks }) {
  const [now, setNow] = useState(Date.now());

  // Update every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const completeTask = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, { method: "PUT" });
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
  };

  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No tasks yet. Stay productive 🚀
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => {
        const created = new Date(task.created_at).getTime();
        const totalMs = task.due_minutes * 60 * 1000;
        const remaining = totalMs - (now - created);

        let color = "text-green-400";
        if (remaining < 60000) color = "text-red-400";
        else if (remaining < 180000) color = "text-yellow-400";

        return (
          <li
            key={task.id}
            className="bg-gray-900 p-3 rounded border border-gray-700 flex justify-between items-center"
          >
            <div>
              <p className={`font-semibold ${task.completed && "line-through text-gray-500"}`}>
                {task.title}
              </p>
              <p className={`text-xs ${color}`}>
                ⏱ {task.completed ? "Completed" :
                  remaining > 0
                    ? `Time left: ${Math.floor(remaining / 60000)}m`
                    : "Overdue"}
              </p>
              <p className="text-xs text-gray-400">
                Priority: {task.priority}
              </p>
            </div>

            <div className="flex gap-2">
              {!task.completed && (
                <button onClick={() => completeTask(task.id)} className="text-green-400">
                  ✔
                </button>
              )}
              <button onClick={() => deleteTask(task.id)} className="text-red-400">
                🗑
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
