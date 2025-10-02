import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-wider">
        404
      </h1>

      <p className="text-2xl md:text-3xl font-semibold mt-4 mb-2">
        Page Not Found
      </p>

      <p className="text-lg text-gray-600 mb-8 text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Go Back Home
      </Link>

      <div className="mt-12 text-sm text-gray-500">
        For developers: notFound() called this page.
      </div>
    </div>
  );
}
