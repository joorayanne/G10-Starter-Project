import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, we could not  find the page you are looking for.
        </p>
        <Link href="/">
          <a className="inline-block mt-6 px-6 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Go Home
          </a>
        </Link>
      </div>
    </main>
  );
}
