import { useEffect, useState } from "react";

export default function TaskSection({ title, tasks, setTasks, danger }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  if (tasks.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className={`text-xl font-semibold mb-4 ${danger ? "text-red-400" : "text-green-300"}`}>
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {tasks.map(task => {
          const due = new Date(task.due_datetime);
          const remaining = due - now;

          return (
            <div
              key={task.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:scale-[1.02] transition"
            >
              <p className="font-semibold">{task.title}</p>

              <p className="text-sm text-gray-400">
                Due: {due.toLocaleString()}
              </p>

              {!task.completed && (
                <p className={`text-sm ${remaining < 0 ? "text-red-400" : "text-green-400"}`}>
                  ⏱ {remaining < 0
                    ? "Overdue"
                    : `${Math.floor(remaining / 60000)} min left`}
                </p>
              )}

              <p className="text-xs mt-1">
                Priority: <span className="text-yellow-400">{task.priority}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
