'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiX } from 'react-icons/fi';

export default function EditReleasePage({ params }: { params: { id: string } }) {
  const releaseId = params.id; // In client components, params is not a Promise
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    description: '',
    releaseDate: '',
    status: '',
  });

  // Fetch release data
  useEffect(() => {
    // In a real application, you would fetch the release data from your API
    // Simulating API call with mock data
    const fetchReleaseData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock release data
        const releaseData = {
          id: releaseId,
          name: 'Q2 Major Release',
          version: '2.5.0',
          description: 'This release includes major feature enhancements and bug fixes for the Q2 roadmap.',
          releaseDate: '2023-06-15',
          status: 'IN_DEVELOPMENT',
        };
        
        setFormData({
          name: releaseData.name,
          version: releaseData.version,
          description: releaseData.description || '',
          releaseDate: releaseData.releaseDate,
          status: releaseData.status,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching release data:', error);
        setIsLoading(false);
      }
    };
    
    fetchReleaseData();
  }, [releaseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      console.log('Updating release:', { releaseId, ...formData });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to the release detail page after successful update
      router.push(`/releases/${releaseId}`);
    } catch (error) {
      console.error('Error updating release:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/releases/${releaseId}`} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Edit Release</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Release Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Q2 Major Release"
              />
            </div>
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">
                Version <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="version"
                name="version"
                value={formData.version}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. 2.5.0"
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
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the purpose and scope of this release"
              />
            </div>
            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                Release Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                <option value="PLANNED">Planned</option>
                <option value="IN_DEVELOPMENT">In Development</option>
                <option value="READY_FOR_TESTING">Ready for Testing</option>
                <option value="TESTING">Testing</option>
                <option value="READY_FOR_DEPLOYMENT">Ready for Deployment</option>
                <option value="DEPLOYING">Deploying</option>
                <option value="DEPLOYED">Deployed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
        <h2 className="font-medium mb-2">Important Notes</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Changing the status of a release may trigger notifications to stakeholders</li>
          <li>If you change the release date, make sure to communicate this to all affected teams</li>
          <li>Updating a release that has approved change requests may require re-approval</li>
        </ul>
      </div>
    </div>
  );
}
