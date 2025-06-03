import Link from 'next/link';
import { 
  FiPlus, 
  FiFilter, 
  FiSearch, 
  FiPackage, 
  FiCalendar, 
  FiEdit2, 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle,
  FiTrello,
  FiGithub,
  FiCloud
} from 'react-icons/fi';

export const metadata = {
  title: 'Change Requests | ITSM System',
};

export default function ChangeRequestsPage() {
  // Mock data for change requests
  const changeRequests = [
    {
      id: 'CR-1001',
      title: 'Implement new dashboard widgets',
      status: 'APPROVED',
      priority: 'HIGH',
      impact: 'MEDIUM',
      releaseId: 'R-1001',
      releaseName: 'Q2 Major Release',
      releaseVersion: '2.5.0',
      createdBy: 'Jane Smith',
      createdAt: '2023-04-12T10:15:00Z',
      jiraIssueKey: 'PROJ-123',
      hasGitCommits: true,
      hasDevOpsChanges: false,
    },
    {
      id: 'CR-1002',
      title: 'Fix authentication bug',
      status: 'IMPLEMENTED',
      priority: 'CRITICAL',
      impact: 'HIGH',
      releaseId: 'R-1001',
      releaseName: 'Q2 Major Release',
      releaseVersion: '2.5.0',
      createdBy: 'Mike Johnson',
      createdAt: '2023-04-15T09:30:00Z',
      jiraIssueKey: 'PROJ-124',
      hasGitCommits: true,
      hasDevOpsChanges: true,
    },
    {
      id: 'CR-1003',
      title: 'Update user profile UI',
      status: 'UNDER_REVIEW',
      priority: 'MEDIUM',
      impact: 'LOW',
      releaseId: 'R-1001',
      releaseName: 'Q2 Major Release',
      releaseVersion: '2.5.0',
      createdBy: 'Sarah Williams',
      createdAt: '2023-04-18T14:20:00Z',
      jiraIssueKey: 'PROJ-125',
      hasGitCommits: false,
      hasDevOpsChanges: true,
    },
    {
      id: 'CR-1004',
      title: 'Add export to PDF functionality',
      status: 'DRAFT',
      priority: 'MEDIUM',
      impact: 'LOW',
      releaseId: 'R-1002',
      releaseName: 'Security Patch',
      releaseVersion: '2.4.5',
      createdBy: 'John Doe',
      createdAt: '2023-04-20T11:30:00Z',
      jiraIssueKey: 'PROJ-126',
      hasGitCommits: false,
      hasDevOpsChanges: false,
    },
    {
      id: 'CR-1005',
      title: 'Fix cross-site scripting vulnerability',
      status: 'SUBMITTED',
      priority: 'CRITICAL',
      impact: 'HIGH',
      releaseId: 'R-1002',
      releaseName: 'Security Patch',
      releaseVersion: '2.4.5',
      createdBy: 'Emily Chen',
      createdAt: '2023-04-22T09:15:00Z',
      jiraIssueKey: 'PROJ-127',
      hasGitCommits: false,
      hasDevOpsChanges: false,
    },
    {
      id: 'CR-1006',
      title: 'Optimize database queries',
      status: 'REJECTED',
      priority: 'HIGH',
      impact: 'MEDIUM',
      releaseId: 'R-1003',
      releaseName: 'Bug Fix Release',
      releaseVersion: '2.4.4',
      createdBy: 'David Brown',
      createdAt: '2023-04-05T13:45:00Z',
      jiraIssueKey: 'PROJ-128',
      hasGitCommits: true,
      hasDevOpsChanges: false,
    },
    {
      id: 'CR-1007',
      title: 'Update third-party libraries',
      status: 'CLOSED',
      priority: 'MEDIUM',
      impact: 'LOW',
      releaseId: 'R-1003',
      releaseName: 'Bug Fix Release',
      releaseVersion: '2.4.4',
      createdBy: 'Michael Wong',
      createdAt: '2023-04-08T10:30:00Z',
      jiraIssueKey: 'PROJ-129',
      hasGitCommits: true,
      hasDevOpsChanges: true,
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

  // Helper function to get CR status color and icon
  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { color: string; icon: React.ElementType }> = {
      'DRAFT': { color: 'bg-gray-100 text-gray-800', icon: FiEdit2 },
      'SUBMITTED': { color: 'bg-blue-100 text-blue-800', icon: FiCalendar },
      'UNDER_REVIEW': { color: 'bg-yellow-100 text-yellow-800', icon: FiAlertCircle },
      'APPROVED': { color: 'bg-green-100 text-green-800', icon: FiCheckCircle },
      'REJECTED': { color: 'bg-red-100 text-red-800', icon: FiXCircle },
      'IMPLEMENTED': { color: 'bg-purple-100 text-purple-800', icon: FiPackage },
      'CLOSED': { color: 'bg-gray-100 text-gray-800', icon: FiCheckCircle },
    };
    
    return statusMap[status] || { color: 'bg-gray-100 text-gray-800', icon: FiEdit2 };
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'LOW': 'bg-green-100 text-green-800',
      'MEDIUM': 'bg-blue-100 text-blue-800',
      'HIGH': 'bg-orange-100 text-orange-800',
      'CRITICAL': 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to get impact color
  const getImpactColor = (impact: string) => {
    const colors: Record<string, string> = {
      'LOW': 'bg-green-100 text-green-800',
      'MEDIUM': 'bg-yellow-100 text-yellow-800',
      'HIGH': 'bg-orange-100 text-orange-800',
      'CRITICAL': 'bg-red-100 text-red-800',
    };
    return colors[impact] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to format status display
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Change Requests</h1>
        <Link 
          href="/change-requests/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" />
          New Change Request
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center relative">
          <FiSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search change requests..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="IMPLEMENTED">Implemented</option>
            <option value="CLOSED">Closed</option>
          </select>
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Releases</option>
            <option value="R-1001">Q2 Major Release (2.5.0)</option>
            <option value="R-1002">Security Patch (2.4.5)</option>
            <option value="R-1003">Bug Fix Release (2.4.4)</option>
          </select>
          <button className="border rounded-md px-3 py-2 bg-white hover:bg-gray-50 flex items-center">
            <FiFilter className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Change Requests Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority / Impact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Release
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Links
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {changeRequests.map((cr) => {
                const statusInfo = getStatusInfo(cr.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <tr key={cr.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                      <Link href={`/change-requests/${cr.id}`}>
                        {cr.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <Link href={`/change-requests/${cr.id}`} className="hover:underline">
                        {cr.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${statusInfo.color}`}>
                        <StatusIcon className="mr-1" size={12} />
                        {formatStatus(cr.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-1 rounded-full text-xs w-fit ${getPriorityColor(cr.priority)}`}>
                          {cr.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs w-fit ${getImpactColor(cr.impact)}`}>
                          {cr.impact} Impact
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <Link href={`/releases/${cr.releaseId}`} className="text-blue-600 hover:underline flex items-center">
                        <FiPackage className="mr-1" size={14} />
                        <div>
                          <div>{cr.releaseName}</div>
                          <div className="text-xs text-gray-500">v{cr.releaseVersion}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {cr.jiraIssueKey && (
                          <Link 
                            href={`https://jira.example.com/browse/${cr.jiraIssueKey}`} 
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800"
                            title={`Jira: ${cr.jiraIssueKey}`}
                          >
                            <FiTrello size={16} />
                          </Link>
                        )}
                        {cr.hasGitCommits && (
                          <Link 
                            href={`/change-requests/${cr.id}#commits`}
                            className="text-gray-600 hover:text-gray-800"
                            title="Has Git Commits"
                          >
                            <FiGithub size={16} />
                          </Link>
                        )}
                        {cr.hasDevOpsChanges && (
                          <Link 
                            href={`/change-requests/${cr.id}#devops`}
                            className="text-gray-600 hover:text-gray-800"
                            title="Has DevOps Changes"
                          >
                            <FiCloud size={16} />
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(cr.createdAt)}</div>
                      <div className="text-xs">{cr.createdBy}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1-7 of 32 change requests
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
