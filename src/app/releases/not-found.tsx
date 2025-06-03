import Link from 'next/link';
import { FiAlertCircle, FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function ReleaseNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <FiAlertCircle className="text-red-600" size={48} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Release Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The release you're looking for doesn't exist or has been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/releases"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Releases
        </Link>
        <Link
          href="/releases/new"
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
        >
          Create New Release
        </Link>
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md">
        <h2 className="font-medium mb-2">Looking for something else?</h2>
        <div className="flex">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search releases..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="ml-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
