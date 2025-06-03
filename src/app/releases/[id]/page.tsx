import Link from 'next/link';
import { use } from 'react';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiCheck,
  FiAlertCircle,
  FiPackage,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiGitBranch,
  FiGitCommit,
  FiGithub,
  FiTrello,
  FiCloud
} from 'react-icons/fi';

export const metadata = {
  title: 'Release Details | ITSM System',
};

export default function ReleaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const releaseId = resolvedParams.id;

  // Mock release data
  const release = {
    id: releaseId,
    name: 'Q2 Major Release',
    version: '2.5.0',
    description: 'This release includes major feature enhancements and bug fixes for the Q2 roadmap.',
    status: 'IN_DEVELOPMENT',
    releaseDate: '2023-06-15T00:00:00Z',
    createdBy: 'John Doe',
    createdAt: '2023-04-10T09:30:00Z',
    updatedAt: '2023-04-20T14:45:00Z',
  };

  // Mock change requests data
  const changeRequests = [
    {
      id: 'CR-1001',
      title: 'Implement new dashboard widgets',
      status: 'APPROVED',
      priority: 'HIGH',
      impact: 'MEDIUM',
      createdBy: 'Jane Smith',
      createdAt: '2023-04-12T10:15:00Z',
      jiraIssueKey: 'PROJ-123',
      gitCommits: [
        { id: 'GC-1001', commitHash: 'a1b2c3d4', message: 'Add dashboard widget framework', authorName: 'Jane Smith' },
        { id: 'GC-1002', commitHash: 'e5f6g7h8', message: 'Implement weather widget', authorName: 'Jane Smith' },
      ],
      devOpsChanges: [],
    },
    {
      id: 'CR-1002',
      title: 'Fix authentication bug',
      status: 'IMPLEMENTED',
      priority: 'CRITICAL',
      impact: 'HIGH',
      createdBy: 'Mike Johnson',
      createdAt: '2023-04-15T09:30:00Z',
      jiraIssueKey: 'PROJ-124',
      gitCommits: [
        { id: 'GC-1003', commitHash: 'i9j0k1l2', message: 'Fix auth token validation', authorName: 'Mike Johnson' },
      ],
      devOpsChanges: [
        { id: 'DC-1001', changesetId: '12345', title: 'Auth service update', authorName: 'Mike Johnson' },
      ],
    },
    {
      id: 'CR-1003',
      title: 'Update user profile UI',
      status: 'UNDER_REVIEW',
      priority: 'MEDIUM',
      impact: 'LOW',
      createdBy: 'Sarah Williams',
      createdAt: '2023-04-18T14:20:00Z',
      jiraIssueKey: 'PROJ-125',
      gitCommits: [],
      devOpsChanges: [
        { id: 'DC-1002', changesetId: '23456', title: 'Profile UI redesign', authorName: 'Sarah Williams' },
      ],
    },
  ];

  // Mock approvals data
  const approvals = [
    { id: 'A-1001', type: 'BUSINESS', status: 'APPROVED', approver: 'David Brown', approvedAt: '2023-04-15T11:30:00Z', comments: 'Approved for business requirements' },
    { id: 'A-1002', type: 'TECHNICAL', status: 'APPROVED', approver: 'Emily Chen', approvedAt: '2023-04-16T09:45:00Z', comments: 'Code review passed' },
    { id: 'A-1003', type: 'SECURITY', status: 'PENDING', approver: null, approvedAt: null, comments: null },
    { id: 'A-1004', type: 'FINAL', status: 'PENDING', approver: null, approvedAt: null, comments: null },
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

  // Helper function to format datetime
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Helper function to get status color and icon
  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { color: string; icon: React.ElementType; bgColor: string }> = {
      'PLANNED': { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: FiCalendar },
      'IN_DEVELOPMENT': { color: 'text-blue-800', bgColor: 'bg-blue-100', icon: FiClock },
      'READY_FOR_TESTING': { color: 'text-purple-800', bgColor: 'bg-purple-100', icon: FiAlertCircle },
      'TESTING': { color: 'text-yellow-800', bgColor: 'bg-yellow-100', icon: FiAlertCircle },
      'READY_FOR_DEPLOYMENT': { color: 'text-indigo-800', bgColor: 'bg-indigo-100', icon: FiPackage },
      'DEPLOYING': { color: 'text-orange-800', bgColor: 'bg-orange-100', icon: FiClock },
      'DEPLOYED': { color: 'text-green-800', bgColor: 'bg-green-100', icon: FiCheck },
      'CANCELLED': { color: 'text-red-800', bgColor: 'bg-red-100', icon: FiAlertCircle },
    };

    return statusMap[status] || { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: FiCalendar };
  };

  // Helper function to get CR status color
  const getCRStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'DRAFT': 'bg-gray-100 text-gray-800',
      'SUBMITTED': 'bg-blue-100 text-blue-800',
      'UNDER_REVIEW': 'bg-yellow-100 text-yellow-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800',
      'IMPLEMENTED': 'bg-purple-100 text-purple-800',
      'CLOSED': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  const statusInfo = getStatusInfo(release.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/releases" className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Release Details</h1>
      </div>

      {/* Release Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">{release.name}</h2>
              <div className="text-sm text-gray-500">Version {release.version}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-sm flex items-center ${statusInfo.bgColor} ${statusInfo.color}`}>
                <StatusIcon className="mr-2" size={16} />
                {formatStatus(release.status)}
              </span>
              <Link
                href={`/releases/${releaseId}/edit`}
                className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <FiEdit2 className="mr-2" size={16} />
                Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-gray-900">{release.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Release Date</h3>
                <p className="text-gray-900 flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" size={16} />
                  {formatDate(release.releaseDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created By</h3>
                <p className="text-gray-900 flex items-center">
                  <FiUser className="mr-2 text-gray-400" size={16} />
                  {release.createdBy}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                <p className="text-gray-900">{formatDateTime(release.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                <p className="text-gray-900">{formatDateTime(release.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approvals Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Approvals</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {approvals.map((approval) => (
              <div key={approval.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{approval.type} Approval</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getApprovalStatusColor(approval.status)}`}>
                    {approval.status}
                  </span>
                </div>
                {approval.approver ? (
                  <>
                    <div className="text-sm text-gray-500 mb-1">
                      Approved by: {approval.approver}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {formatDateTime(approval.approvedAt!)}
                    </div>
                    {approval.comments && (
                      <div className="text-sm border-t pt-2 mt-2">
                        "{approval.comments}"
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-gray-500">
                    Waiting for approval
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Change Requests Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Change Requests</h2>
          <Link
            href={`/releases/${releaseId}/change-requests/new`}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center text-sm"
          >
            <FiPlus className="mr-2" size={16} />
            Add Change Request
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {changeRequests.map((cr) => (
            <div key={cr.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <Link href={`/change-requests/${cr.id}`} className="font-medium text-blue-600 hover:underline">
                  {cr.id}: {cr.title}
                </Link>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getCRStatusColor(cr.status)}`}>
                    {formatStatus(cr.status)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(cr.priority)}`}>
                    {cr.priority}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-3 text-sm">
                <div className="flex items-center text-gray-500">
                  <FiUser className="mr-1" size={14} />
                  {cr.createdBy}
                </div>
                <div className="flex items-center text-gray-500">
                  <FiCalendar className="mr-1" size={14} />
                  {formatDate(cr.createdAt)}
                </div>
                {cr.jiraIssueKey && (
                  <Link
                    href={`https://jira.example.com/browse/${cr.jiraIssueKey}`}
                    target="_blank"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <FiTrello className="mr-1" size={14} />
                    {cr.jiraIssueKey}
                  </Link>
                )}
              </div>

              {(cr.gitCommits.length > 0 || cr.devOpsChanges.length > 0) && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  {cr.gitCommits.length > 0 && (
                    <div className="mb-2">
                      <div className="text-xs font-medium text-gray-500 mb-1 flex items-center">
                        <FiGithub className="mr-1" size={12} />
                        Git Commits
                      </div>
                      <div className="space-y-1">
                        {cr.gitCommits.map((commit) => (
                          <div key={commit.id} className="flex items-start text-sm">
                            <FiGitCommit className="mr-1 mt-1 flex-shrink-0 text-gray-400" size={12} />
                            <div>
                              <span className="font-mono text-xs text-gray-500 mr-2">{commit.commitHash.substring(0, 8)}</span>
                              <span>{commit.message}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {cr.devOpsChanges.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1 flex items-center">
                        <FiCloud className="mr-1" size={12} />
                        DevOps Changes
                      </div>
                      <div className="space-y-1">
                        {cr.devOpsChanges.map((change) => (
                          <div key={change.id} className="flex items-start text-sm">
                            <FiGitBranch className="mr-1 mt-1 flex-shrink-0 text-gray-400" size={12} />
                            <div>
                              <span className="font-mono text-xs text-gray-500 mr-2">{change.changesetId.substring(0, 5)}</span>
                              <span>{change.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
