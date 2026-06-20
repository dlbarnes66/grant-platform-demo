export default function HomePage() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-4xl font-bold">Grant Engine</h1>
      <p className="text-gray-600">
        Welcome to your AI-powered grant search platform.
      </p>

      <div className="space-x-4">
        <a href="/search" className="text-blue-600 underline">AI Search</a>
        <a href="/jobs" className="text-blue-600 underline">Jobs</a>
        <a href="/jobs/new" className="text-blue-600 underline">Create Job</a>
      </div>
    </div>
  );
}
