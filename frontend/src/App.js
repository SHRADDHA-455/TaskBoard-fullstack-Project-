import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskSection from "./components/TaskSection";
import StatsBar from "./components/StatsBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [viewFilter, setViewFilter] = useState("ALL"); 

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const now = new Date();

  const active = tasks.filter(
    (t) => !t.completed && new Date(t.due_datetime) > now
  );

  const overdue = tasks.filter(
    (t) => !t.completed && new Date(t.due_datetime) <= now
  );

  const completed = tasks.filter((t) => t.completed);

  return (
    <div className="min-h-screen px-10 py-6 relative">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-green-400 mb-6">TaskBoard</h1>

      {/* STATS BAR (CLICKABLE) */}
      <StatsBar
        total={tasks.length}
        active={active.length}
        overdue={overdue.length}
        completed={completed.length}
        setView={setViewFilter} 
      />

      {/* MAIN CONTENT (BLUR WHEN FILTER ACTIVE) */}
      <div
        className={viewFilter !== "ALL" ? "blur-sm pointer-events-none" : ""}
      >
        <TaskInput setTasks={setTasks} />

        <TaskSection title="Active Tasks" tasks={active} setTasks={setTasks} />

        <TaskSection
          title="Overdue Tasks"
          tasks={overdue}
          setTasks={setTasks}
          danger
        />

        <TaskSection
          title="Completed Tasks"
          tasks={completed}
          setTasks={setTasks}
        />
      </div>

      {/* FOCUS MODE / FILTERED VIEW */}
      {viewFilter !== "ALL" && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-20 z-50">
          <div className="bg-gray-950 border border-green-500 rounded-xl p-6 w-[85%] max-h-[80%] overflow-y-auto shadow-xl">
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-green-400">
                {viewFilter} TASKS
              </h2>

              <button
                onClick={() => setViewFilter("ALL")}
                className="text-red-400 hover:text-red-300 text-lg"
              >
                ✕ Close
              </button>
            </div>

            {/* FILTERED TASK LIST */}
            {viewFilter === "ACTIVE" && (
              <TaskSection
                title="Active Tasks"
                tasks={active}
                setTasks={setTasks}
              />
            )}

            {viewFilter === "OVERDUE" && (
              <TaskSection
                title="Overdue Tasks"
                tasks={overdue}
                setTasks={setTasks}
                danger
              />
            )}

            {viewFilter === "COMPLETED" && (
              <TaskSection
                title="Completed Tasks"
                tasks={completed}
                setTasks={setTasks}
              />
            )}

            {viewFilter === "ALL" && (
              <TaskSection
                title="All Tasks"
                tasks={tasks}
                setTasks={setTasks}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
