import Link from 'next/link';
import { use } from 'react';
import { 
  FiArrowLeft, 
  FiEdit2, 
  FiTrash2, 
  FiUser, 
  FiCalendar, 
  FiClock,
  FiTag,
  FiMonitor,
  FiPackage,
  FiServer,
  FiHardDrive,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';

export const metadata = {
  title: 'Asset Details | ITSM System',
};

export default function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const assetId = resolvedParams.id;

  // Mock asset data
  const asset = {
    id: assetId,
    name: 'Dell XPS 15',
    type: 'HARDWARE',
    status: 'ACTIVE',
    serialNumber: 'XPS15-123456',
    purchaseDate: '2023-01-15T00:00:00Z',
    warrantyEnd: '2026-01-15T00:00:00Z',
    owner: 'John Doe',
    manager: 'IT Department',
    notes: 'Assigned to development team lead. Includes docking station and dual monitors.',
    createdAt: '2023-01-10T09:30:00Z',
    updatedAt: '2023-04-05T14:20:00Z',
  };

  // Mock related tickets
  const relatedTickets = [
    { id: 'T-1001', title: 'Setup new laptop for developer', status: 'CLOSED', createdAt: '2023-01-12T10:30:00Z' },
    { id: 'T-1045', title: 'Screen flickering issue', status: 'RESOLVED', createdAt: '2023-03-15T09:15:00Z' },
    { id: 'T-1078', title: 'Battery replacement request', status: 'IN_PROGRESS', createdAt: '2023-04-05T14:20:00Z' },
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

  // Helper function to get ticket status color
  const getTicketStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'OPEN': 'bg-yellow-100 text-yellow-800',
      'IN_PROGRESS': 'bg-blue-100 text-blue-800',
      'PENDING': 'bg-purple-100 text-purple-800',
      'RESOLVED': 'bg-green-100 text-green-800',
      'CLOSED': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Helper function to get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'HARDWARE':
        return <FiMonitor className="mr-2" size={18} />;
      case 'SOFTWARE':
        return <FiPackage className="mr-2" size={18} />;
      case 'SERVICE':
        return <FiServer className="mr-2" size={18} />;
      default:
        return <FiHardDrive className="mr-2" size={18} />;
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <FiCheckCircle className="mr-2" size={16} />;
      case 'MAINTENANCE':
        return <FiClock className="mr-2" size={16} />;
      case 'RETIRED':
        return <FiAlertCircle className="mr-2" size={16} />;
      default:
        return <FiTag className="mr-2" size={16} />;
    }
  };

  const TypeIcon = getTypeIcon(asset.type);
  const StatusIcon = getStatusIcon(asset.status);

  // Calculate days until warranty expiration
  const today = new Date();
  const warrantyEnd = new Date(asset.warrantyEnd);
  const daysUntilWarrantyExpiration = Math.ceil((warrantyEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isWarrantyExpired = daysUntilWarrantyExpiration < 0;
  const warrantyStatus = isWarrantyExpired 
    ? { text: 'Expired', color: 'bg-red-100 text-red-800' }
    : daysUntilWarrantyExpiration < 30 
      ? { text: `Expires in ${daysUntilWarrantyExpiration} days`, color: 'bg-yellow-100 text-yellow-800' }
      : { text: `${daysUntilWarrantyExpiration} days remaining`, color: 'bg-green-100 text-green-800' };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/assets" className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Asset Details</h1>
      </div>

      {/* Asset Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              {TypeIcon}
              <div>
                <h2 className="text-xl font-bold">{asset.name}</h2>
                <div className="text-sm text-gray-500">ID: {asset.id}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-sm flex items-center ${getStatusColor(asset.status)}`}>
                {StatusIcon}
                {asset.status}
              </span>
              <Link 
                href={`/assets/${assetId}/edit`}
                className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <FiEdit2 className="mr-2" size={16} />
                Edit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Serial Number</h3>
                <p className="text-gray-900">{asset.serialNumber || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                <p className="text-gray-900">{asset.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Purchase Date</h3>
                <p className="text-gray-900 flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" size={16} />
                  {formatDate(asset.purchaseDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Warranty</h3>
                <p className={`text-sm px-2 py-1 rounded-full inline-flex ${warrantyStatus.color}`}>
                  {warrantyStatus.text}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Owner</h3>
                <p className="text-gray-900 flex items-center">
                  <FiUser className="mr-2 text-gray-400" size={16} />
                  {asset.owner || 'Unassigned'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Manager</h3>
                <p className="text-gray-900">{asset.manager || 'N/A'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
              <p className="text-gray-900">{asset.notes || 'No notes available'}</p>
              <div className="mt-4 text-xs text-gray-500">
                <div>Created: {formatDateTime(asset.createdAt)}</div>
                <div>Last Updated: {formatDateTime(asset.updatedAt)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tickets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Related Tickets</h2>
          <Link 
            href={`/tickets/new?assetId=${assetId}`}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center text-sm"
          >
            Create Ticket
          </Link>
        </div>
        {relatedTickets.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {relatedTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <Link href={`/tickets/${ticket.id}`} className="font-medium text-blue-600 hover:underline">
                    {ticket.id}: {ticket.title}
                  </Link>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTicketStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No tickets associated with this asset
          </div>
        )}
      </div>

      {/* Maintenance History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Maintenance History</h2>
        </div>
        <div className="p-6 text-center text-gray-500">
          No maintenance records found
        </div>
      </div>
    </div>
  );
}
