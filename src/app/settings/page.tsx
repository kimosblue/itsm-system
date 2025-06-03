import Link from 'next/link';
import { 
  FiCloud, 
  FiGithub, 
  FiTrello, 
  FiUsers, 
  FiSliders, 
  FiServer, 
  FiClock, 
  FiBell, 
  FiShield, 
  FiDatabase 
} from 'react-icons/fi';

export const metadata = {
  title: 'Settings | ITSM System',
};

export default function SettingsPage() {
  // Settings categories
  const settingsCategories = [
    {
      title: 'General',
      items: [
        { name: 'System Settings', icon: FiSliders, href: '/settings/system', description: 'Configure general system settings' },
        { name: 'User Management', icon: FiUsers, href: '/settings/users', description: 'Manage users, roles, and permissions' },
        { name: 'Notifications', icon: FiBell, href: '/settings/notifications', description: 'Configure email and in-app notifications' },
      ],
    },
    {
      title: 'Integrations',
      items: [
        { name: 'Azure DevOps', icon: FiCloud, href: '/settings/integrations/azure-devops', description: 'Connect with Azure DevOps for work item synchronization' },
        { name: 'GitHub', icon: FiGithub, href: '/settings/integrations/github', description: 'Connect with GitHub for issue tracking' },
        { name: 'Jira', icon: FiTrello, href: '/settings/integrations/jira', description: 'Connect with Jira for issue management' },
      ],
    },
    {
      title: 'Advanced',
      items: [
        { name: 'SLA Configuration', icon: FiClock, href: '/settings/sla', description: 'Configure Service Level Agreements' },
        { name: 'Security', icon: FiShield, href: '/settings/security', description: 'Security settings and audit logs' },
        { name: 'Database', icon: FiDatabase, href: '/settings/database', description: 'Database management and backups' },
        { name: 'API Access', icon: FiServer, href: '/settings/api', description: 'API keys and webhook configuration' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Settings Categories */}
      <div className="space-y-8">
        {settingsCategories.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">{category.title}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {category.items.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="flex items-center p-4 hover:bg-gray-50"
                >
                  <div className="p-2 rounded-md bg-blue-50 text-blue-600 mr-4">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
