'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCloud, FiArrowLeft, FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

export default function AzureDevOpsIntegrationPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    project: '',
    pat: '',
    workItemType: 'Task',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsConnected(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/settings" className="text-gray-500 hover:text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Azure DevOps Integration</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <FiCloud className="text-blue-500 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Connection Settings</h2>
        </div>

        <div className="p-6">
          {isConnected ? (
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-md">
                <FiCheck className="mr-2" size={20} />
                <span>Connected to Azure DevOps</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Organization</h3>
                  <p className="text-gray-900">{formData.organization}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Project</h3>
                  <p className="text-gray-900">{formData.project}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Personal Access Token</h3>
                  <p className="text-gray-900">••••••••••••••••</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Default Work Item Type</h3>
                  <p className="text-gray-900">{formData.workItemType}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 text-blue-700 rounded-md">
                <FiInfo className="mr-2" size={20} />
                <span>Last synchronized: 10 minutes ago</span>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => {}}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sync Now
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
                >
                  {isLoading ? 'Disconnecting...' : (
                    <>
                      <FiX className="mr-2" />
                      Disconnect
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center p-4 bg-yellow-50 text-yellow-700 rounded-md">
                <FiAlertCircle className="mr-2" size={20} />
                <span>Not connected to Azure DevOps</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="your-organization"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                    Project
                  </label>
                  <input
                    type="text"
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder="your-project"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="pat" className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Access Token (PAT)
                  </label>
                  <input
                    type="password"
                    id="pat"
                    name="pat"
                    value={formData.pat}
                    onChange={handleChange}
                    placeholder="••••••••••••••••"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Create a PAT with <code>work_items.read</code> and <code>work_items.write</code> scopes.
                  </p>
                </div>

                <div>
                  <label htmlFor="workItemType" className="block text-sm font-medium text-gray-700 mb-1">
                    Default Work Item Type
                  </label>
                  <select
                    id="workItemType"
                    name="workItemType"
                    value={formData.workItemType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Task">Task</option>
                    <option value="Bug">Bug</option>
                    <option value="User Story">User Story</option>
                    <option value="Issue">Issue</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isLoading ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Mapping Configuration</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 mb-4">
            Configure how tickets in the ITSM system map to work items in Azure DevOps.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
              <div className="font-medium">ITSM Field</div>
              <div className="font-medium">Azure DevOps Field</div>
              <div className="font-medium">Sync Direction</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 border-b">
              <div>Title</div>
              <div>System.Title</div>
              <div>Bidirectional</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 border-b">
              <div>Description</div>
              <div>System.Description</div>
              <div>Bidirectional</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 border-b">
              <div>Status</div>
              <div>System.State</div>
              <div>Bidirectional</div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 border-b">
              <div>Priority</div>
              <div>Microsoft.VSTS.Common.Priority</div>
              <div>Bidirectional</div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isConnected}
            >
              Edit Mapping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
