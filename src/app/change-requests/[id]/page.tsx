import Link from 'next/link';
import { use } from 'react';
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiPackage,
  FiGitCommit,
  FiGitBranch,
  FiGithub,
  FiTrello,
  FiCloud,
  FiPlus,
  FiLink,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle
} from 'react-icons/fi';

export const metadata = {
  title: 'Change Request Details | ITSM System',
};

export default function ChangeRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const crId = resolvedParams.id;

  // Mock change request data
  const changeRequest = {
    id: crId,
    title: 'Implement new dashboard widgets',
    description: 'Add new dashboard widgets for weather, system status, and recent activities. This will enhance the user experience by providing more information at a glance.',
    status: 'APPROVED',
    priority: 'HIGH',
    impact: 'MEDIUM',
    releaseId: 'R-1001',
    releaseName: 'Q2 Major Release',
    releaseVersion: '2.5.0',
    createdBy: 'Jane Smith',
    createdAt: '2023-04-12T10:15:00Z',
    updatedAt: '2023-04-18T14:30:00Z',
    jiraIssueId: '12345',
    jiraIssueKey: 'PROJ-123',
  };

  // Mock git commits
  const gitCommits = [
    {
      id: 'GC-1001',
      commitHash: 'a1b2c3d4e5f6g7h8i9j0',
      message: 'Add dashboard widget framework',
      authorName: 'Jane Smith',
      authorEmail: 'jane.smith@example.com',
      commitDate: '2023-04-15T09:30:00Z',
      repository: 'main-app'
    },
    {
      id: 'GC-1002',
      commitHash: 'k1l2m3n4o5p6q7r8s9t0',
      message: 'Implement weather widget',
      authorName: 'Jane Smith',
      authorEmail: 'jane.smith@example.com',
      commitDate: '2023-04-16T11:45:00Z',
      repository: 'main-app'
    },
    {
      id: 'GC-1003',
      commitHash: 'u1v2w3x4y5z6a7b8c9d0',
      message: 'Implement system status widget',
      authorName: 'Jane Smith',
      authorEmail: 'jane.smith@example.com',
      commitDate: '2023-04-17T14:20:00Z',
      repository: 'main-app'
    },
  ];

  // Mock DevOps changes
  const devOpsChanges = [
    {
      id: 'DC-1001',
      changesetId: '12345',
      title: 'Dashboard widgets pipeline update',
      description: 'Updated build pipeline for dashboard widgets',
      authorName: 'Jane Smith',
      changeDate: '2023-04-18T10:30:00Z',
      project: 'Main App'
    },
  ];

  // Mock approvals
  const approvals = [
    { id: 'A-2001', type: 'BUSINESS', status: 'APPROVED', approver: 'David Brown', approvedAt: '2023-04-15T11:30:00Z', comments: 'Meets business requirements' },
    { id: 'A-2002', type: 'TECHNICAL', status: 'APPROVED', approver: 'Emily Chen', approvedAt: '2023-04-16T09:45:00Z', comments: 'Code review passed' },
    { id: 'A-2003', type: 'SECURITY', status: 'APPROVED', approver: 'Michael Wong', approvedAt: '2023-04-17T14:20:00Z', comments: 'No security concerns' },
    { id: 'A-2004', type: 'FINAL', status: 'PENDING', approver: null, approvedAt: null, comments: null },
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

  // Helper function to get CR status color and icon
  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { color: string; bgColor: string; icon: React.ElementType }> = {
      'DRAFT': { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: FiEdit2 },
      'SUBMITTED': { color: 'text-blue-800', bgColor: 'bg-blue-100', icon: FiArrowLeft },
      'UNDER_REVIEW': { color: 'text-yellow-800', bgColor: 'bg-yellow-100', icon: FiAlertCircle },
      'APPROVED': { color: 'text-green-800', bgColor: 'bg-green-100', icon: FiCheckCircle },
      'REJECTED': { color: 'text-red-800', bgColor: 'bg-red-100', icon: FiXCircle },
      'IMPLEMENTED': { color: 'text-purple-800', bgColor: 'bg-purple-100', icon: FiPackage },
      'CLOSED': { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: FiCheckCircle },
    };

    return statusMap[status] || { color: 'text-gray-800', bgColor: 'bg-gray-100', icon: FiEdit2 };
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, { bgColor: string; textColor: string }> = {
      'LOW': { bgColor: 'bg-green-100', textColor: 'text-green-800' },
      'MEDIUM': { bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
      'HIGH': { bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
      'CRITICAL': { bgColor: 'bg-red-100', textColor: 'text-red-800' },
    };
    return colors[priority] || { bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
  };

  // Helper function to get impact color
  const getImpactColor = (impact: string) => {
    const colors: Record<string, { bgColor: string; textColor: string }> = {
      'LOW': { bgColor: 'bg-green-100', textColor: 'text-green-800' },
      'MEDIUM': { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
      'HIGH': { bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
      'CRITICAL': { bgColor: 'bg-red-100', textColor: 'text-red-800' },
    };
    return colors[impact] || { bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
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

  const statusInfo = getStatusInfo(changeRequest.status);
  const StatusIcon = statusInfo.icon;
  const priorityColors = getPriorityColor(changeRequest.priority);
  const impactColors = getImpactColor(changeRequest.impact);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/change-requests" className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Change Request Details</h1>
      </div>

      {/* CR Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">{changeRequest.id}: {changeRequest.title}</h2>
              <Link
                href={`/releases/${changeRequest.releaseId}`}
                className="text-sm text-blue-600 hover:underline flex items-center mt-1"
              >
                <FiPackage className="mr-1" size={14} />
                {changeRequest.releaseName} (v{changeRequest.releaseVersion})
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-sm flex items-center ${statusInfo.bgColor} ${statusInfo.color}`}>
                <StatusIcon className="mr-2" size={16} />
                {formatStatus(changeRequest.status)}
              </span>
              <Link
                href={`/change-requests/${crId}/edit`}
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
              <p className="text-gray-900">{changeRequest.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
                <p className={`inline-flex px-2 py-1 rounded-full text-sm ${priorityColors.bgColor} ${priorityColors.textColor}`}>
                  {changeRequest.priority}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Impact</h3>
                <p className={`inline-flex px-2 py-1 rounded-full text-sm ${impactColors.bgColor} ${impactColors.textColor}`}>
                  {changeRequest.impact}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created By</h3>
                <p className="text-gray-900 flex items-center">
                  <FiUser className="mr-2 text-gray-400" size={16} />
                  {changeRequest.createdBy}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                <p className="text-gray-900 flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" size={16} />
                  {formatDateTime(changeRequest.createdAt)}
                </p>
              </div>
              {changeRequest.jiraIssueKey && (
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Jira Issue</h3>
                  <Link
                    href={`https://jira.example.com/browse/${changeRequest.jiraIssueKey}`}
                    target="_blank"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <FiTrello className="mr-2 text-blue-400" size={16} />
                    {changeRequest.jiraIssueKey}
                  </Link>
                </div>
              )}
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

      {/* Git Commits Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <FiGithub className="mr-2 text-gray-700" size={18} />
            <h2 className="text-lg font-semibold">Git Commits</h2>
          </div>
          <Link
            href={`/change-requests/${crId}/commits/add`}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center text-sm"
          >
            <FiPlus className="mr-2" size={16} />
            Add Commit
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {gitCommits.map((commit) => (
            <div key={commit.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <FiGitCommit className="mt-1 text-gray-400 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div className="font-medium">{commit.message}</div>
                    <div className="text-sm text-gray-500">
                      {formatDateTime(commit.commitDate)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="text-gray-500">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                        {commit.commitHash.substring(0, 8)}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {commit.authorName} &lt;{commit.authorEmail}&gt;
                    </div>
                    <div className="text-gray-500">
                      Repository: {commit.repository}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DevOps Changes Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <FiCloud className="mr-2 text-gray-700" size={18} />
            <h2 className="text-lg font-semibold">DevOps Changes</h2>
          </div>
          <Link
            href={`/change-requests/${crId}/devops/add`}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center text-sm"
          >
            <FiPlus className="mr-2" size={16} />
            Add DevOps Change
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {devOpsChanges.map((change) => (
            <div key={change.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <FiGitBranch className="mt-1 text-gray-400 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div className="font-medium">{change.title}</div>
                    <div className="text-sm text-gray-500">
                      {formatDateTime(change.changeDate)}
                    </div>
                  </div>
                  {change.description && (
                    <div className="text-gray-700 mb-2">{change.description}</div>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="text-gray-500">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                        {change.changesetId}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {change.authorName}
                    </div>
                    <div className="text-gray-500">
                      Project: {change.project}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
