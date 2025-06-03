'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiTag,
  FiServer,
  FiBook,
  FiSettings,
  FiMenu,
  FiX,
  FiGithub,
  FiTrello,
  FiCloud,
  FiPackage,
  FiCalendar
} from 'react-icons/fi';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Tickets', href: '/tickets', icon: FiTag },
    { name: 'Releases', href: '/releases', icon: FiPackage },
    { name: 'Change Requests', href: '/change-requests', icon: FiCalendar },
    { name: 'Assets', href: '/assets', icon: FiServer },
    { name: 'Knowledge Base', href: '/knowledge-base', icon: FiBook },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const integrationItems = [
    { name: 'Azure DevOps', href: '/settings/integrations/azure-devops', icon: FiCloud },
    { name: 'GitHub', href: '/settings/integrations/github', icon: FiGithub },
    { name: 'Jira', href: '/settings/integrations/jira', icon: FiTrello },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white w-64 h-full shadow-md fixed md:static z-40 transition-all duration-300 ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        }`}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">ITSM System</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-md hover:bg-blue-50 ${
                    isActive(item.href) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <item.icon className="mr-3" size={18} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-xs uppercase font-semibold text-gray-500 mb-2 px-2">
              Integrations
            </h2>
            <ul className="space-y-2">
              {integrationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-md hover:bg-blue-50 ${
                      isActive(item.href) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <item.icon className="mr-3" size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span>System Status: Online</span>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navigation;
