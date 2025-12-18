export default function StatsBar({ total, active, overdue, completed, setView }) {
  const Card = ({ label, value, color, onClick }) => (
    <div
      onClick={onClick}
      className="bg-gray-900 border border-gray-700 rounded-lg p-4 w-56 cursor-pointer
                 hover:scale-105 hover:border-green-400 transition"
    >
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="flex gap-6 mb-8">
      <Card label="Total Tasks" value={total} color="text-blue-400" onClick={() => setView("ALL")} />
      <Card label="Active" value={active} color="text-green-400" onClick={() => setView("ACTIVE")} />
      <Card label="Overdue" value={overdue} color="text-red-400" onClick={() => setView("OVERDUE")} />
      <Card label="Completed" value={completed} color="text-emerald-400" onClick={() => setView("COMPLETED")} />
    </div>
  );
}
