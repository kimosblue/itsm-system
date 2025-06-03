import Link from 'next/link';
import { FiPlus, FiFilter, FiSearch } from 'react-icons/fi';

export const metadata = {
  title: 'Tickets | ITSM System',
};

export default function TicketsPage() {
  // Mock data for tickets
  const tickets = [
    { id: 'T-1001', title: 'Network connectivity issue', status: 'OPEN', priority: 'HIGH', assignee: 'John Doe', createdAt: '2023-05-08T10:30:00Z' },
    { id: 'T-1002', title: 'Email not working', status: 'IN_PROGRESS', priority: 'MEDIUM', assignee: 'Jane Smith', createdAt: '2023-05-08T09:15:00Z' },
    { id: 'T-1003', title: 'Printer not responding', status: 'RESOLVED', priority: 'LOW', assignee: 'Mike Johnson', createdAt: '2023-05-07T14:45:00Z' },
    { id: 'T-1004', title: 'Software installation request', status: 'PENDING', priority: 'MEDIUM', assignee: 'Unassigned', createdAt: '2023-05-07T11:20:00Z' },
    { id: 'T-1005', title: 'VPN access request', status: 'CLOSED', priority: 'HIGH', assignee: 'Sarah Williams', createdAt: '2023-05-06T16:30:00Z' },
    { id: 'T-1006', title: 'New laptop setup', status: 'OPEN', priority: 'MEDIUM', assignee: 'Unassigned', createdAt: '2023-05-06T14:20:00Z' },
    { id: 'T-1007', title: 'Password reset', status: 'RESOLVED', priority: 'LOW', assignee: 'John Doe', createdAt: '2023-05-05T11:10:00Z' },
    { id: 'T-1008', title: 'Microsoft Office not activating', status: 'IN_PROGRESS', priority: 'MEDIUM', assignee: 'Jane Smith', createdAt: '2023-05-05T09:45:00Z' },
    { id: 'T-1009', title: 'Server maintenance notification', status: 'CLOSED', priority: 'HIGH', assignee: 'Mike Johnson', createdAt: '2023-05-04T16:30:00Z' },
    { id: 'T-1010', title: 'Monitor flickering issue', status: 'OPEN', priority: 'MEDIUM', assignee: 'Sarah Williams', createdAt: '2023-05-04T14:15:00Z' },
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
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Link 
          href="/tickets/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" />
          New Ticket
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center relative">
          <FiSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PENDING">Pending</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
          <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <button className="border rounded-md px-3 py-2 bg-white hover:bg-gray-50 flex items-center">
            <FiFilter className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Tickets Table */}
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
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link href={`/tickets/${ticket.id}`}>
                      {ticket.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    <Link href={`/tickets/${ticket.id}`} className="hover:underline">
                      {ticket.title}
                    </Link>
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
                    {ticket.assignee}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(ticket.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1-10 of 42 tickets
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
