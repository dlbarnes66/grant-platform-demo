export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Grant Platform</h1>

      <p className="text-gray-700">
        Search grants, track your submissions, and manage your automated grant workflow.
      </p>

      <div className="space-y-4">
        <a href="/search" className="block p-4 bg-white shadow rounded hover:bg-gray-50">
          🔍 Search Grants
        </a>

        <a href="/jobs" className="block p-4 bg-white shadow rounded hover:bg-gray-50">
          📊 Job Status
        </a>

        <a href="/submit" className="block p-4 bg-white shadow rounded hover:bg-gray-50">
          📝 Submit Application
        </a>
      </div>
    </div>
  );
}
