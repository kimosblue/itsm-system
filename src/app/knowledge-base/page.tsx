import Link from 'next/link';
import { FiPlus, FiSearch, FiBookOpen, FiTag } from 'react-icons/fi';

export const metadata = {
  title: 'Knowledge Base | ITSM System',
};

export default function KnowledgeBasePage() {
  // Mock data for knowledge articles
  const articles = [
    {
      id: 'KB-1001',
      title: 'How to Reset Your Password',
      excerpt: 'Step-by-step guide to reset your password through the self-service portal.',
      tags: ['password', 'self-service', 'account'],
      author: 'John Doe',
      createdAt: '2023-04-15T10:30:00Z',
      views: 1245,
    },
    {
      id: 'KB-1002',
      title: 'Connecting to the VPN',
      excerpt: 'Instructions for setting up and connecting to the company VPN from different devices.',
      tags: ['vpn', 'remote-access', 'security'],
      author: 'Jane Smith',
      createdAt: '2023-04-10T14:20:00Z',
      views: 987,
    },
    {
      id: 'KB-1003',
      title: 'Troubleshooting Network Connectivity Issues',
      excerpt: 'Common network connectivity problems and their solutions.',
      tags: ['network', 'troubleshooting', 'connectivity'],
      author: 'Mike Johnson',
      createdAt: '2023-04-05T09:45:00Z',
      views: 1532,
    },
    {
      id: 'KB-1004',
      title: 'Setting Up Email on Mobile Devices',
      excerpt: 'How to configure your work email on iOS and Android devices.',
      tags: ['email', 'mobile', 'setup'],
      author: 'Sarah Williams',
      createdAt: '2023-04-01T11:15:00Z',
      views: 876,
    },
    {
      id: 'KB-1005',
      title: 'Using the Company Intranet',
      excerpt: 'Guide to navigating and using resources on the company intranet.',
      tags: ['intranet', 'resources', 'internal'],
      author: 'John Doe',
      createdAt: '2023-03-28T13:40:00Z',
      views: 654,
    },
    {
      id: 'KB-1006',
      title: 'Printer Setup and Troubleshooting',
      excerpt: 'How to set up printers and resolve common printing issues.',
      tags: ['printer', 'setup', 'troubleshooting'],
      author: 'Jane Smith',
      createdAt: '2023-03-25T15:30:00Z',
      views: 1098,
    },
  ];

  // Mock data for categories
  const categories = [
    { name: 'Getting Started', count: 12 },
    { name: 'Hardware', count: 24 },
    { name: 'Software', count: 36 },
    { name: 'Network', count: 18 },
    { name: 'Security', count: 15 },
    { name: 'Policies', count: 9 },
    { name: 'Troubleshooting', count: 27 },
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <Link 
          href="/knowledge-base/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" />
          New Article
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-4">Find answers to your questions</h2>
          <div className="relative">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search the knowledge base..."
              className="pl-12 pr-4 py-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link 
                      href={`/knowledge-base/category/${category.name.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50"
                    >
                      <span className="flex items-center">
                        <FiBookOpen className="mr-2 text-blue-500" />
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Popular Articles</h2>
              <select className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="a-z">A-Z</option>
              </select>
            </div>
            <div className="divide-y divide-gray-100">
              {articles.map((article) => (
                <div key={article.id} className="p-4 hover:bg-gray-50">
                  <Link href={`/knowledge-base/${article.id}`} className="block">
                    <h3 className="text-lg font-medium text-blue-600 hover:underline mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <span key={tag} className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          <FiTag className="mr-1" size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>By {article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(article.createdAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{article.views} views</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 text-center">
              <Link href="/knowledge-base/all" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
