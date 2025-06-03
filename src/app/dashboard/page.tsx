import { FiAlertCircle, FiCheckCircle, FiClock, FiServer, FiUsers, FiCloud, FiGithub, FiTrello } from 'react-icons/fi';

export const metadata = {
  title: 'Dashboard | ITSM System',
};

export default function DashboardPage() {
  // This would normally be fetched from the database
  const stats = [
    { label: 'Open Tickets', value: 24, icon: FiAlertCircle, color: 'text-yellow-500' },
    { label: 'Resolved Today', value: 8, icon: FiCheckCircle, color: 'text-green-500' },
    { label: 'Pending Tickets', value: 12, icon: FiClock, color: 'text-blue-500' },
    { label: 'Total Assets', value: 156, icon: FiServer, color: 'text-purple-500' },
    { label: 'Active Users', value: 42, icon: FiUsers, color: 'text-indigo-500' },
  ];

  // Mock data for recent tickets
  const recentTickets = [
    { id: 'T-1001', title: 'Network connectivity issue', status: 'OPEN', priority: 'HIGH', createdAt: '2023-05-08T10:30:00Z' },
    { id: 'T-1002', title: 'Email not working', status: 'IN_PROGRESS', priority: 'MEDIUM', createdAt: '2023-05-08T09:15:00Z' },
    { id: 'T-1003', title: 'Printer not responding', status: 'RESOLVED', priority: 'LOW', createdAt: '2023-05-07T14:45:00Z' },
    { id: 'T-1004', title: 'Software installation request', status: 'PENDING', priority: 'MEDIUM', createdAt: '2023-05-07T11:20:00Z' },
    { id: 'T-1005', title: 'VPN access request', status: 'CLOSED', priority: 'HIGH', createdAt: '2023-05-06T16:30:00Z' },
  ];

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'OPEN': 'bg-yellow-100 text-yellow-800',
      'IN_PROGRESS': 'bg-blue-100 text-blue-800',
      'PENDING': 'bg-purple-100 text-purple-800',
      'RESOLVED': 'bg-green-100 text-green-800',
      'CLOSED': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'LOW': 'bg-green-100 text-green-800',
      'MEDIUM': 'bg-blue-100 text-blue-800',
      'HIGH': 'bg-red-100 text-red-800',
      'CRITICAL': 'bg-red-100 text-red-800 font-bold',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
          >
            <div className={`p-3 rounded-full ${stat.color.replace('text', 'bg')} bg-opacity-10 mr-4`}>
              <stat.icon className={`${stat.color}`} size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Recent Tickets</h2>
        </div>
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
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                    {ticket.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {ticket.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(ticket.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 text-center">
          <a href="/tickets" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Tickets
          </a>
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Integration Status</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiCloud className="text-blue-500 mr-2" size={20} />
                  <span className="font-medium">Azure DevOps</span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Connected
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Last sync: 10 minutes ago
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiGithub className="text-gray-800 mr-2" size={20} />
                  <span className="font-medium">GitHub</span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Connected
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Last sync: 5 minutes ago
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiTrello className="text-blue-400 mr-2" size={20} />
                  <span className="font-medium">Jira</span>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Setup Required
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <a href="/settings/integrations/jira" className="text-blue-600 hover:underline">
                  Configure integration
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
