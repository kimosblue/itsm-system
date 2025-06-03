'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiX, FiCloud } from 'react-icons/fi';

export default function AddDevOpsChangePage({ params }: { params: { id: string } }) {
  const crId = params.id; // In client components, params is not a Promise
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    changesetId: '',
    title: '',
    description: '',
    authorName: '',
    changeDate: '',
    project: '',
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
      console.log('Adding DevOps change to change request:', { crId, ...formData });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to the change request page
      router.push(`/change-requests/${crId}`);
    } catch (error) {
      console.error('Error adding DevOps change:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/change-requests/${crId}`} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Add DevOps Change</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <FiCloud className="text-gray-500 mr-2" size={18} />
            <h2 className="text-lg font-semibold">
              Adding DevOps change to: {changeRequest.id} - {changeRequest.title}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="changesetId" className="block text-sm font-medium text-gray-700 mb-1">
                Changeset ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="changesetId"
                name="changesetId"
                value={formData.changesetId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                required
                placeholder="e.g. 12345"
              />
            </div>
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                Project <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Main App"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Dashboard widgets pipeline update"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Updated build pipeline for dashboard widgets"
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
              <label htmlFor="changeDate" className="block text-sm font-medium text-gray-700 mb-1">
                Change Date <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="changeDate"
                name="changeDate"
                value={formData.changeDate}
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
              {isSubmitting ? 'Adding...' : 'Add DevOps Change'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
        <h2 className="font-medium mb-2">Tip: Automating DevOps Change Tracking</h2>
        <p className="text-sm">
          While you can manually add DevOps changes here, consider setting up automated tracking by:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mt-2">
          <li>Using Azure DevOps webhooks to automatically track changes</li>
          <li>Including the change request ID in your work item links</li>
          <li>Setting up a service connection between your ITSM system and Azure DevOps</li>
        </ul>
      </div>
    </div>
  );
}
