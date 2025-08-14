export default function ResearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Research Tool</h2>
          <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-900">Close</button>
        </div>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Ask a question..." />
          <div className="rounded-lg border bg-gray-50 p-3 text-sm text-gray-700">
            Results will appear here...
          </div>
        </div>
      </div>
    </div>
  );
}
