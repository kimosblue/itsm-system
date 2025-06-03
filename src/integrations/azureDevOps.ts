/**
 * Azure DevOps Integration Module
 * 
 * This module provides functionality to integrate with Azure DevOps for:
 * - Creating work items in Azure DevOps from ITSM tickets
 * - Updating ITSM tickets based on Azure DevOps work item changes
 * - Linking ITSM tickets to Azure DevOps work items
 */

import axios from 'axios';

// Azure DevOps API base URL
const baseUrl = (org: string) => `https://dev.azure.com/${org}`;

// Azure DevOps API client
const getClient = (org: string, pat: string) => {
  const token = Buffer.from(`:${pat}`).toString('base64');
  return axios.create({
    baseURL: baseUrl(org),
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

// Get work item types
export const getWorkItemTypes = async (org: string, project: string, pat: string) => {
  const client = getClient(org, pat);
  try {
    const response = await client.get(`/${project}/_apis/wit/workitemtypes?api-version=7.0`);
    return response.data.value;
  } catch (error) {
    console.error('Error fetching work item types:', error);
    throw error;
  }
};

// Create a work item in Azure DevOps
export const createWorkItem = async (
  org: string,
  project: string,
  pat: string,
  workItemType: string,
  fields: Record<string, any>
) => {
  const client = getClient(org, pat);
  
  // Format the fields as Azure DevOps API expects
  const operations = Object.entries(fields).map(([key, value]) => ({
    op: 'add',
    path: `/fields/${key}`,
    value,
  }));

  try {
    const response = await client.post(
      `/${project}/_apis/wit/workitems/$${workItemType}?api-version=7.0`,
      operations
    );
    return response.data;
  } catch (error) {
    console.error('Error creating work item:', error);
    throw error;
  }
};

// Get a work item from Azure DevOps
export const getWorkItem = async (org: string, project: string, pat: string, id: number) => {
  const client = getClient(org, pat);
  try {
    const response = await client.get(`/${project}/_apis/wit/workitems/${id}?api-version=7.0`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching work item ${id}:`, error);
    throw error;
  }
};

// Update a work item in Azure DevOps
export const updateWorkItem = async (
  org: string,
  project: string,
  pat: string,
  id: number,
  fields: Record<string, any>
) => {
  const client = getClient(org, pat);
  
  // Format the fields as Azure DevOps API expects
  const operations = Object.entries(fields).map(([key, value]) => ({
    op: 'replace',
    path: `/fields/${key}`,
    value,
  }));

  try {
    const response = await client.patch(
      `/${project}/_apis/wit/workitems/${id}?api-version=7.0`,
      operations
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating work item ${id}:`, error);
    throw error;
  }
};

// Map ITSM ticket to Azure DevOps work item
export const mapTicketToWorkItem = (ticket: any) => {
  return {
    'System.Title': ticket.title,
    'System.Description': ticket.description,
    'System.State': mapTicketStatusToWorkItemState(ticket.status),
    'Microsoft.VSTS.Common.Priority': mapTicketPriorityToWorkItemPriority(ticket.priority),
  };
};

// Map Azure DevOps work item to ITSM ticket
export const mapWorkItemToTicket = (workItem: any) => {
  return {
    title: workItem.fields['System.Title'],
    description: workItem.fields['System.Description'],
    status: mapWorkItemStateToTicketStatus(workItem.fields['System.State']),
    priority: mapWorkItemPriorityToTicketPriority(workItem.fields['Microsoft.VSTS.Common.Priority']),
  };
};

// Helper functions for status/priority mapping
const mapTicketStatusToWorkItemState = (status: string) => {
  const mapping: Record<string, string> = {
    'OPEN': 'New',
    'IN_PROGRESS': 'Active',
    'PENDING': 'Resolved',
    'RESOLVED': 'Resolved',
    'CLOSED': 'Closed',
  };
  return mapping[status] || 'New';
};

const mapWorkItemStateToTicketStatus = (state: string) => {
  const mapping: Record<string, string> = {
    'New': 'OPEN',
    'Active': 'IN_PROGRESS',
    'Resolved': 'RESOLVED',
    'Closed': 'CLOSED',
  };
  return mapping[state] || 'OPEN';
};

const mapTicketPriorityToWorkItemPriority = (priority: string) => {
  const mapping: Record<string, number> = {
    'LOW': 4,
    'MEDIUM': 3,
    'HIGH': 2,
    'CRITICAL': 1,
  };
  return mapping[priority] || 3;
};

const mapWorkItemPriorityToTicketPriority = (priority: number) => {
  const mapping: Record<number, string> = {
    1: 'CRITICAL',
    2: 'HIGH',
    3: 'MEDIUM',
    4: 'LOW',
  };
  return mapping[priority] || 'MEDIUM';
};
