import "./globals.css";

export const metadata = {
  title: "Grant Platform",
  description: "Automated grant search and application system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-8">Grant Platform</h1>

          <nav className="space-y-4">
            <a href="/" className="block text-lg hover:text-blue-600">
              Home
            </a>
            <a href="/search" className="block text-lg hover:text-blue-600">
              Search Grants
            </a>
            <a href="/jobs" className="block text-lg hover:text-blue-600">
              Job Status
            </a>
            <a href="/submit" className="block text-lg hover:text-blue-600">
              Submit Application
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
