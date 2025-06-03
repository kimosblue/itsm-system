/**
 * GitHub Integration Module
 * 
 * This module provides functionality to integrate with GitHub for:
 * - Creating issues in GitHub from ITSM tickets
 * - Updating ITSM tickets based on GitHub issue changes
 * - Linking ITSM tickets to GitHub issues
 */

import axios from 'axios';

// GitHub API base URL
const baseUrl = 'https://api.github.com';

// GitHub API client
const getClient = (token: string) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
  });
};

// Create an issue in GitHub
export const createIssue = async (
  token: string,
  owner: string,
  repo: string,
  title: string,
  body: string,
  labels: string[] = [],
  assignees: string[] = []
) => {
  const client = getClient(token);
  try {
    const response = await client.post(`/repos/${owner}/${repo}/issues`, {
      title,
      body,
      labels,
      assignees,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating GitHub issue:', error);
    throw error;
  }
};

// Get an issue from GitHub
export const getIssue = async (token: string, owner: string, repo: string, issueNumber: number) => {
  const client = getClient(token);
  try {
    const response = await client.get(`/repos/${owner}/${repo}/issues/${issueNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching GitHub issue #${issueNumber}:`, error);
    throw error;
  }
};

// Update an issue in GitHub
export const updateIssue = async (
  token: string,
  owner: string,
  repo: string,
  issueNumber: number,
  updates: {
    title?: string;
    body?: string;
    state?: 'open' | 'closed';
    labels?: string[];
    assignees?: string[];
  }
) => {
  const client = getClient(token);
  try {
    const response = await client.patch(`/repos/${owner}/${repo}/issues/${issueNumber}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating GitHub issue #${issueNumber}:`, error);
    throw error;
  }
};

// Add a comment to a GitHub issue
export const addComment = async (
  token: string,
  owner: string,
  repo: string,
  issueNumber: number,
  body: string
) => {
  const client = getClient(token);
  try {
    const response = await client.post(
      `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
      { body }
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to GitHub issue #${issueNumber}:`, error);
    throw error;
  }
};

// Get comments from a GitHub issue
export const getComments = async (token: string, owner: string, repo: string, issueNumber: number) => {
  const client = getClient(token);
  try {
    const response = await client.get(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for GitHub issue #${issueNumber}:`, error);
    throw error;
  }
};

// Map ITSM ticket to GitHub issue
export const mapTicketToIssue = (ticket: any) => {
  return {
    title: ticket.title,
    body: ticket.description,
    labels: [mapTicketPriorityToLabel(ticket.priority), mapTicketStatusToLabel(ticket.status)],
  };
};

// Map GitHub issue to ITSM ticket
export const mapIssueToTicket = (issue: any) => {
  return {
    title: issue.title,
    description: issue.body,
    status: mapIssueStateAndLabelsToTicketStatus(issue.state, issue.labels),
    priority: mapIssueLabelsToTicketPriority(issue.labels),
  };
};

// Helper functions for status/priority mapping
const mapTicketPriorityToLabel = (priority: string) => {
  const mapping: Record<string, string> = {
    'LOW': 'priority:low',
    'MEDIUM': 'priority:medium',
    'HIGH': 'priority:high',
    'CRITICAL': 'priority:critical',
  };
  return mapping[priority] || 'priority:medium';
};

const mapTicketStatusToLabel = (status: string) => {
  const mapping: Record<string, string> = {
    'OPEN': 'status:open',
    'IN_PROGRESS': 'status:in-progress',
    'PENDING': 'status:pending',
    'RESOLVED': 'status:resolved',
    'CLOSED': 'status:closed',
  };
  return mapping[status] || 'status:open';
};

const mapIssueStateAndLabelsToTicketStatus = (state: string, labels: any[]) => {
  if (state === 'closed') {
    return 'CLOSED';
  }
  
  const labelNames = labels.map((label: any) => label.name);
  
  if (labelNames.includes('status:in-progress')) {
    return 'IN_PROGRESS';
  } else if (labelNames.includes('status:pending')) {
    return 'PENDING';
  } else if (labelNames.includes('status:resolved')) {
    return 'RESOLVED';
  }
  
  return 'OPEN';
};

const mapIssueLabelsToTicketPriority = (labels: any[]) => {
  const labelNames = labels.map((label: any) => label.name);
  
  if (labelNames.includes('priority:critical')) {
    return 'CRITICAL';
  } else if (labelNames.includes('priority:high')) {
    return 'HIGH';
  } else if (labelNames.includes('priority:low')) {
    return 'LOW';
  }
  
  return 'MEDIUM';
};
