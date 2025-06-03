'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiX, FiGitCommit } from 'react-icons/fi';

export default function AddCommitPage({ params }: { params: { id: string } }) {
  const crId = params.id; // In client components, params is not a Promise
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    commitHash: '',
    message: '',
    authorName: '',
    authorEmail: '',
    commitDate: '',
    repository: '',
  });

  // Mock change request data
  const changeRequest = {
    id: crId,
    title: 'Implement new dashboard widgets',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      console.log('Adding commit to change request:', { crId, ...formData });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to the change request page
      router.push(`/change-requests/${crId}`);
    } catch (error) {
      console.error('Error adding commit:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/change-requests/${crId}`} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Add Git Commit</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <FiGitCommit className="text-gray-500 mr-2" size={18} />
            <h2 className="text-lg font-semibold">
              Adding commit to: {changeRequest.id} - {changeRequest.title}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="commitHash" className="block text-sm font-medium text-gray-700 mb-1">
                Commit Hash <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="commitHash"
                name="commitHash"
                value={formData.commitHash}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                required
                placeholder="e.g. a1b2c3d4e5f6g7h8i9j0"
              />
            </div>
            <div>
              <label htmlFor="repository" className="block text-sm font-medium text-gray-700 mb-1">
                Repository <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="repository"
                name="repository"
                value={formData.repository}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. main-app"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Commit Message <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Add dashboard widget framework"
              />
            </div>
            <div>
              <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Jane Smith"
              />
            </div>
            <div>
              <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Author Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="authorEmail"
                name="authorEmail"
                value={formData.authorEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. jane.smith@example.com"
              />
            </div>
            <div>
              <label htmlFor="commitDate" className="block text-sm font-medium text-gray-700 mb-1">
                Commit Date <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="commitDate"
                name="commitDate"
                value={formData.commitDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end gap-3">
            <Link
              href={`/change-requests/${crId}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FiX className="mr-2" />
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave className="mr-2" />
              {isSubmitting ? 'Adding...' : 'Add Commit'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
        <h2 className="font-medium mb-2">Tip: Automating Commit Tracking</h2>
        <p className="text-sm">
          While you can manually add commits here, consider setting up automated tracking by:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mt-2">
          <li>Using commit hooks to automatically link commits to change requests</li>
          <li>Including the change request ID in your commit messages (e.g., "CR-1001: Add dashboard widget framework")</li>
          <li>Setting up a GitHub or GitLab webhook to automatically track commits</li>
        </ul>
      </div>
    </div>
  );
}
