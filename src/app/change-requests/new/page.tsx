'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiX, FiLink } from 'react-icons/fi';

export default function NewChangeRequestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseId: '',
    status: 'DRAFT',
    priority: 'MEDIUM',
    impact: 'MEDIUM',
    jiraIssueKey: '',
  });

  // Mock releases data for the dropdown
  const releases = [
    { id: 'R-1001', name: 'Q2 Major Release', version: '2.5.0' },
    { id: 'R-1002', name: 'Security Patch', version: '2.4.5' },
    { id: 'R-1003', name: 'Bug Fix Release', version: '2.4.4' },
    { id: 'R-1004', name: 'Performance Improvements', version: '2.4.3' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      console.log('Submitting change request:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to the change requests page after successful submission
      router.push('/change-requests');
    } catch (error) {
      console.error('Error creating change request:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/change-requests" className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Create New Change Request</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
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
              <label htmlFor="releaseId" className="block text-sm font-medium text-gray-700 mb-1">
                Release <span className="text-red-500">*</span>
              </label>
              <select
                id="releaseId"
                name="releaseId"
                value={formData.releaseId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a release</option>
                {releases.map((release) => (
                  <option key={release.id} value={release.id}>
                    {release.name} (v{release.version})
                  </option>
                ))}
              </select>
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
              href="/change-requests"
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
          <li>The change request will be included in the specified release</li>
          <li>You can track the progress of the change request through its various stages</li>
        </ul>
      </div>
    </div>
  );
}
