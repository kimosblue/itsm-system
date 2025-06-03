import Link from 'next/link';
import { FiAlertCircle, FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <FiAlertCircle className="text-red-600" size={48} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <FiHome className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md">
        <h2 className="font-medium mb-2">Quick Navigation</h2>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Link href="/tickets" className="p-3 border rounded-md hover:bg-gray-50 text-left">
            Tickets
          </Link>
          <Link href="/releases" className="p-3 border rounded-md hover:bg-gray-50 text-left">
            Releases
          </Link>
          <Link href="/change-requests" className="p-3 border rounded-md hover:bg-gray-50 text-left">
            Change Requests
          </Link>
          <Link href="/assets" className="p-3 border rounded-md hover:bg-gray-50 text-left">
            Assets
          </Link>
          <Link href="/knowledge-base" className="p-3 border rounded-md hover:bg-gray-50 text-left">
            Knowledge Base
          </Link>
          <Link href="/settings" className="p-3 border rounded-md hover:bg-gray-50 text-left">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
