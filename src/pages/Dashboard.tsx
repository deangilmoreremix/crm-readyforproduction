export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">SmartCRM Dashboard</h1>
          <p className="text-sm text-gray-600">Glass UI overview of pipeline and engagement</p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: '$25.0k', hint: '+12.5%' },
            { label: 'Conversion Rate', value: '25.0%', hint: '+8.2%' },
            { label: 'Total Contacts', value: '8', hint: '+15.3%' },
            { label: 'Avg Deal Size', value: '$25.0k', hint: '-2.1%' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm">
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className="mt-1 text-2xl font-semibold">{s.value}</div>
              <div className="mt-1 text-xs text-gray-500">{s.hint}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
