import Link from 'next/link';
import { FiPlus, FiFilter, FiSearch, FiMonitor, FiHardDrive, FiPackage, FiServer } from 'react-icons/fi';

export const metadata = {
  title: 'Assets | ITSM System',
};

export default function AssetsPage() {
  // Mock data for assets
  const assets = [
    { id: 'A-1001', name: 'Dell XPS 15', type: 'HARDWARE', status: 'ACTIVE', owner: 'John Doe', serialNumber: 'XPS15-123456', purchaseDate: '2023-01-15' },
    { id: 'A-1002', name: 'Microsoft Office 365', type: 'SOFTWARE', status: 'ACTIVE', owner: 'Company Wide', serialNumber: 'O365-789012', purchaseDate: '2023-02-10' },
    { id: 'A-1003', name: 'HP LaserJet Pro', type: 'HARDWARE', status: 'MAINTENANCE', owner: 'Marketing Dept', serialNumber: 'HPLJ-345678', purchaseDate: '2022-11-05' },
    { id: 'A-1004', name: 'Adobe Creative Cloud', type: 'SOFTWARE', status: 'ACTIVE', owner: 'Design Team', serialNumber: 'ACC-901234', purchaseDate: '2023-03-20' },
    { id: 'A-1005', name: 'Cisco Router', type: 'HARDWARE', status: 'ACTIVE', owner: 'IT Department', serialNumber: 'CISCO-567890', purchaseDate: '2022-09-15' },
    { id: 'A-1006', name: 'Windows Server 2022', type: 'SOFTWARE', status: 'ACTIVE', owner: 'IT Department', serialNumber: 'WS22-123789', purchaseDate: '2022-08-30' },
    { id: 'A-1007', name: 'Lenovo ThinkPad', type: 'HARDWARE', status: 'INACTIVE', owner: 'Sarah Williams', serialNumber: 'TP-456123', purchaseDate: '2021-07-12' },
    { id: 'A-1008', name: 'Zoom Enterprise', type: 'SERVICE', status: 'ACTIVE', owner: 'Company Wide', serialNumber: 'ZOOM-789456', purchaseDate: '2023-01-01' },
    { id: 'A-1009', name: 'Network Storage Array', type: 'HARDWARE', status: 'ACTIVE', owner: 'IT Department', serialNumber: 'NSA-234567', purchaseDate: '2022-10-10' },
    { id: 'A-1010', name: 'Salesforce CRM', type: 'SERVICE', status: 'ACTIVE', owner: 'Sales Department', serialNumber: 'SF-890123', purchaseDate: '2022-12-15' },
  ];

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'ACTIVE': 'bg-green-100 text-green-800',
      'INACTIVE': 'bg-gray-100 text-gray-800',
      'MAINTENANCE': 'bg-yellow-100 text-yellow-800',
      'RETIRED': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assets</h1>
        <Link 
          href="/assets/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" />
          New Asset
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center relative">
          <FiSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="HARDWARE">Hardware</option>
            <option value="SOFTWARE">Software</option>
            <option value="SERVICE">Service</option>
            <option value="OTHER">Other</option>
          </select>
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="RETIRED">Retired</option>
          </select>
          <button className="border rounded-md px-3 py-2 bg-white hover:bg-gray-50 flex items-center">
            <FiFilter className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link href={`/assets/${asset.id}`}>
                      {asset.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    <Link href={`/assets/${asset.id}`} className="hover:underline flex items-center">
                      {getTypeIcon(asset.type)}
                      {asset.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {asset.type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {asset.owner}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {asset.serialNumber}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(asset.purchaseDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1-10 of 35 assets
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
