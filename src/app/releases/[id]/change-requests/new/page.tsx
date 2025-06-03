'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiX, FiPackage, FiLink } from 'react-icons/fi';

export default function NewReleaseChangeRequestPage({ params }: { params: { id: string } }) {
  const releaseId = params.id; // In client components, params is not a Promise
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'DRAFT',
    priority: 'MEDIUM',
    impact: 'MEDIUM',
    jiraIssueKey: '',
  });

  // Mock release data
  const release = {
    id: releaseId,
    name: 'Q2 Major Release',
    version: '2.5.0',
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
      console.log('Creating change request for release:', { releaseId, ...formData });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to the release page
      router.push(`/releases/${releaseId}`);
    } catch (error) {
      console.error('Error creating change request:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/releases/${releaseId}`} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Add Change Request to Release</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <FiPackage className="text-gray-500 mr-2" size={18} />
            <h2 className="text-lg font-semibold">
              Adding to: {release.name} (v{release.version})
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                placeholder="Brief description of the change"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Detailed description of the change, including purpose and impact"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="IMPLEMENTED">Implemented</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div>
              <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
                Impact <span className="text-red-500">*</span>
              </label>
              <select
                id="impact"
                name="impact"
                value={formData.impact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="jiraIssueKey" className="block text-sm font-medium text-gray-700 mb-1">
                Jira Issue Key
              </label>
              <div className="flex">
                <div className="flex items-center bg-gray-100 px-3 py-2 border border-r-0 rounded-l-md text-gray-500">
                  <FiLink size={16} />
                </div>
                <input
                  type="text"
                  id="jiraIssueKey"
                  name="jiraIssueKey"
                  value={formData.jiraIssueKey}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. PROJ-123"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Link this change request to a Jira issue for tracking purposes
              </p>
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end gap-3">
            <Link
              href={`/releases/${releaseId}`}
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
              {isSubmitting ? 'Creating...' : 'Create Change Request'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
        <h2 className="font-medium mb-2">What happens next?</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>After creating a change request, it will need to go through the approval workflow</li>
          <li>You can link Git commits and DevOps changes to this change request</li>
          <li>The change request will be included in this release</li>
          <li>You can track the progress of the change request through its various stages</li>
        </ul>
      </div>
    </div>
  );
}
