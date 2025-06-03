'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiPackage } from 'react-icons/fi';

export default function ApproveReleasePage({ params }: { params: { id: string } }) {
  const releaseId = params.id; // In client components, params is not a Promise
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    approvalType: 'BUSINESS',
    status: 'APPROVED',
    comments: '',
  });

  // Mock release data
  const release = {
    id: releaseId,
    name: 'Q2 Major Release',
    version: '2.5.0',
    status: 'READY_FOR_TESTING',
  };

  // Mock approvals data
  const approvals = [
    { type: 'BUSINESS', status: 'PENDING', label: 'Business Approval', description: 'Approval from business stakeholders' },
    { type: 'TECHNICAL', status: 'PENDING', label: 'Technical Approval', description: 'Approval from technical team' },
    { type: 'SECURITY', status: 'PENDING', label: 'Security Approval', description: 'Approval from security team' },
    { type: 'FINAL', status: 'PENDING', label: 'Final Approval', description: 'Final approval from release manager' },
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
      console.log('Submitting approval for release:', { releaseId, ...formData });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to the release page
      router.push(`/releases/${releaseId}`);
    } catch (error) {
      console.error('Error submitting approval:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/releases/${releaseId}`} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Approve Release</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <FiPackage className="text-gray-500 mr-2" size={18} />
            <h2 className="text-lg font-semibold">
              {release.name} (v{release.version})
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Current Status: {release.status.replace(/_/g, ' ')}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="approvalType" className="block text-sm font-medium text-gray-700 mb-1">
                Approval Type <span className="text-red-500">*</span>
              </label>
              <select
                id="approvalType"
                name="approvalType"
                value={formData.approvalType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {approvals.map((approval) => (
                  <option key={approval.type} value={approval.type}>
                    {approval.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">
                {approvals.find(a => a.type === formData.approvalType)?.description}
              </p>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Decision <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="APPROVED"
                    checked={formData.status === 'APPROVED'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-1" />
                    Approve
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="REJECTED"
                    checked={formData.status === 'REJECTED'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="flex items-center">
                    <FiXCircle className="text-red-500 mr-1" />
                    Reject
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                Comments {formData.status === 'REJECTED' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={formData.status === 'APPROVED' ? 'Optional comments about your approval' : 'Please provide a reason for rejection'}
                required={formData.status === 'REJECTED'}
              />
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end gap-3 mt-6">
            <Link
              href={`/releases/${releaseId}`}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FiXCircle className="mr-2" />
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed ${
                formData.status === 'APPROVED' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {formData.status === 'APPROVED' ? (
                <>
                  <FiCheckCircle className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Approval'}
                </>
              ) : (
                <>
                  <FiXCircle className="mr-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Rejection'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
        <h2 className="font-medium mb-2">Approval Process Information</h2>
        <p className="text-sm">
          The release approval process requires the following approvals before a release can proceed:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mt-2">
          <li><strong>Business Approval:</strong> Confirms that the release meets business requirements</li>
          <li><strong>Technical Approval:</strong> Confirms that the release meets technical standards</li>
          <li><strong>Security Approval:</strong> Confirms that the release meets security requirements</li>
          <li><strong>Final Approval:</strong> Final sign-off from the release manager</li>
        </ul>
        <p className="text-sm mt-2">
          All approvals must be completed before the release can move to the next stage.
        </p>
      </div>
    </div>
  );
}
