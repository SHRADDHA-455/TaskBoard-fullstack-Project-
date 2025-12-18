export default function ProgressBar({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-4">
      <div className="h-2 bg-gray-700 rounded">
        <div
          className="h-2 bg-green-500 rounded transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-center mt-1 text-green-400">
        {percent}% completed
      </p>
    </div>
  );
}
