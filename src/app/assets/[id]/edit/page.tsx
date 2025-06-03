'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiSave, FiX, FiServer, FiPackage, FiMonitor, FiHardDrive } from 'react-icons/fi';

export default function EditAssetPage({ params }: { params: { id: string } }) {
  const assetId = params.id; // In client components, params is not a Promise
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyEnd: '',
    owner: '',
    notes: '',
  });

  // Mock users data for the dropdown
  const users = [
    { id: 'U-1001', name: 'John Doe' },
    { id: 'U-1002', name: 'Jane Smith' },
    { id: 'U-1003', name: 'Mike Johnson' },
    { id: 'U-1004', name: 'Sarah Williams' },
    { id: 'U-1005', name: 'Company Wide' },
    { id: 'U-1006', name: 'IT Department' },
    { id: 'U-1007', name: 'Marketing Dept' },
    { id: 'U-1008', name: 'Design Team' },
    { id: 'U-1009', name: 'Sales Department' },
  ];

  // Fetch asset data
  useEffect(() => {
    // In a real application, you would fetch the asset data from your API
    // Simulating API call with mock data
    const fetchAssetData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock asset data
        const assetData = {
          id: assetId,
          name: 'Dell XPS 15',
          type: 'HARDWARE',
          status: 'ACTIVE',
          serialNumber: 'XPS15-123456',
          purchaseDate: '2023-01-15',
          warrantyEnd: '2026-01-15',
          owner: 'John Doe',
          notes: 'Assigned to development team lead. Includes docking station and dual monitors.',
        };
        
        setFormData({
          name: assetData.name,
          type: assetData.type,
          status: assetData.status,
          serialNumber: assetData.serialNumber || '',
          purchaseDate: assetData.purchaseDate || '',
          warrantyEnd: assetData.warrantyEnd || '',
          owner: assetData.owner || '',
          notes: assetData.notes || '',
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching asset data:', error);
        setIsLoading(false);
      }
    };
    
    fetchAssetData();
  }, [assetId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your API
      console.log('Updating asset:', { assetId, ...formData });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to the asset detail page after successful update
      router.push(`/assets/${assetId}`);
    } catch (error) {
      console.error('Error updating asset:', error);
      setIsSubmitting(false);
    }
  };

  // Helper function to get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'HARDWARE':
        return <FiMonitor className="mr-2" />;
      case 'SOFTWARE':
        return <FiPackage className="mr-2" />;
      case 'SERVICE':
        return <FiServer className="mr-2" />;
      default:
        return <FiHardDrive className="mr-2" />;
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
        <Link href={`/assets/${assetId}`} className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Edit Asset</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            {getTypeIcon(formData.type)}
            <h2 className="text-lg font-semibold">
              {assetId}: {formData.name}
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Asset Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="e.g. Dell XPS 15"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Asset Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="HARDWARE">Hardware</option>
                <option value="SOFTWARE">Software</option>
                <option value="SERVICE">Service</option>
                <option value="OTHER">Other</option>
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
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="RETIRED">Retired</option>
              </select>
            </div>
            <div>
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Serial Number
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. XPS15-123456"
              />
            </div>
            <div>
              <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="warrantyEnd" className="block text-sm font-medium text-gray-700 mb-1">
                Warranty End Date
              </label>
              <input
                type="date"
                id="warrantyEnd"
                name="warrantyEnd"
                value={formData.warrantyEnd}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
                Owner
              </label>
              <select
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an owner</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional information about this asset"
              />
            </div>
          </div>

          <div className="border-t pt-6 flex justify-end gap-3">
            <Link
              href={`/assets/${assetId}`}
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
          <li>Changing the status to "Retired" will mark this asset as no longer in use</li>
          <li>If you change the owner, make sure to update any related documentation</li>
          <li>For hardware assets, keep the serial number up to date for warranty claims</li>
        </ul>
      </div>
    </div>
  );
}
