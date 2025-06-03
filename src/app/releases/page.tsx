import Link from 'next/link';
import { FiPlus, FiFilter, FiSearch, FiPackage, FiCalendar, FiClock, FiCheck, FiAlertCircle } from 'react-icons/fi';

export const metadata = {
  title: 'Releases | ITSM System',
};

export default function ReleasesPage() {
  // Mock data for releases
  const releases = [
    {
      id: 'R-1001',
      name: 'Q2 Major Release',
      version: '2.5.0',
      status: 'PLANNED',
      releaseDate: '2023-06-15T00:00:00Z',
      changeRequestsCount: 12,
      approvalStatus: 'PENDING',
      createdBy: 'John Doe',
      createdAt: '2023-04-10T09:30:00Z',
    },
    {
      id: 'R-1002',
      name: 'Security Patch',
      version: '2.4.5',
      status: 'IN_DEVELOPMENT',
      releaseDate: '2023-05-20T00:00:00Z',
      changeRequestsCount: 5,
      approvalStatus: 'PENDING',
      createdBy: 'Jane Smith',
      createdAt: '2023-04-15T11:45:00Z',
    },
    {
      id: 'R-1003',
      name: 'Bug Fix Release',
      version: '2.4.4',
      status: 'READY_FOR_TESTING',
      releaseDate: '2023-05-10T00:00:00Z',
      changeRequestsCount: 8,
      approvalStatus: 'APPROVED',
      createdBy: 'Mike Johnson',
      createdAt: '2023-04-05T14:20:00Z',
    },
    {
      id: 'R-1004',
      name: 'Performance Improvements',
      version: '2.4.3',
      status: 'TESTING',
      releaseDate: '2023-05-05T00:00:00Z',
      changeRequestsCount: 6,
      approvalStatus: 'APPROVED',
      createdBy: 'Sarah Williams',
      createdAt: '2023-04-01T10:15:00Z',
    },
    {
      id: 'R-1005',
      name: 'UI Enhancements',
      version: '2.4.2',
      status: 'READY_FOR_DEPLOYMENT',
      releaseDate: '2023-04-28T00:00:00Z',
      changeRequestsCount: 10,
      approvalStatus: 'APPROVED',
      createdBy: 'John Doe',
      createdAt: '2023-03-25T09:10:00Z',
    },
    {
      id: 'R-1006',
      name: 'Hotfix',
      version: '2.4.1',
      status: 'DEPLOYED',
      releaseDate: '2023-04-15T00:00:00Z',
      changeRequestsCount: 3,
      approvalStatus: 'APPROVED',
      createdBy: 'Jane Smith',
      createdAt: '2023-03-20T13:45:00Z',
    },
    {
      id: 'R-1007',
      name: 'Feature Release',
      version: '2.4.0',
      status: 'DEPLOYED',
      releaseDate: '2023-04-01T00:00:00Z',
      changeRequestsCount: 15,
      approvalStatus: 'APPROVED',
      createdBy: 'Mike Johnson',
      createdAt: '2023-03-15T11:30:00Z',
    },
    {
      id: 'R-1008',
      name: 'Maintenance Release',
      version: '2.3.5',
      status: 'DEPLOYED',
      releaseDate: '2023-03-15T00:00:00Z',
      changeRequestsCount: 7,
      approvalStatus: 'APPROVED',
      createdBy: 'Sarah Williams',
      createdAt: '2023-03-01T10:00:00Z',
    },
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

  // Helper function to get status color and icon
  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { color: string; icon: React.ElementType }> = {
      'PLANNED': { color: 'bg-gray-100 text-gray-800', icon: FiCalendar },
      'IN_DEVELOPMENT': { color: 'bg-blue-100 text-blue-800', icon: FiClock },
      'READY_FOR_TESTING': { color: 'bg-purple-100 text-purple-800', icon: FiAlertCircle },
      'TESTING': { color: 'bg-yellow-100 text-yellow-800', icon: FiAlertCircle },
      'READY_FOR_DEPLOYMENT': { color: 'bg-indigo-100 text-indigo-800', icon: FiPackage },
      'DEPLOYING': { color: 'bg-orange-100 text-orange-800', icon: FiClock },
      'DEPLOYED': { color: 'bg-green-100 text-green-800', icon: FiCheck },
      'CANCELLED': { color: 'bg-red-100 text-red-800', icon: FiAlertCircle },
    };
    
    return statusMap[status] || { color: 'bg-gray-100 text-gray-800', icon: FiCalendar };
  };

  // Helper function to get approval status color
  const getApprovalStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to format status display
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Releases</h1>
        <Link 
          href="/releases/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" />
          New Release
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center relative">
          <FiSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search releases..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Statuses</option>
            <option value="PLANNED">Planned</option>
            <option value="IN_DEVELOPMENT">In Development</option>
            <option value="READY_FOR_TESTING">Ready for Testing</option>
            <option value="TESTING">Testing</option>
            <option value="READY_FOR_DEPLOYMENT">Ready for Deployment</option>
            <option value="DEPLOYING">Deploying</option>
            <option value="DEPLOYED">Deployed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button className="border rounded-md px-3 py-2 bg-white hover:bg-gray-50 flex items-center">
            <FiFilter className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Releases Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name / Version
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Release Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CRs
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approval
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {releases.map((release) => {
                const statusInfo = getStatusInfo(release.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <tr key={release.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                      <Link href={`/releases/${release.id}`}>
                        {release.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <Link href={`/releases/${release.id}`} className="hover:underline">
                        <div>{release.name}</div>
                        <div className="text-xs text-gray-500">v{release.version}</div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${statusInfo.color}`}>
                        <StatusIcon className="mr-1" size={12} />
                        {formatStatus(release.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(release.releaseDate)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                      <Link href={`/releases/${release.id}/change-requests`} className="text-blue-600 hover:underline">
                        {release.changeRequestsCount}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getApprovalStatusColor(release.approvalStatus)}`}>
                        {release.approvalStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {release.createdBy}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1-8 of 24 releases
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
