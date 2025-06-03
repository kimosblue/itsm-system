/**
 * Jira Integration Module
 * 
 * This module provides functionality to integrate with Jira for:
 * - Creating issues in Jira from ITSM tickets
 * - Updating ITSM tickets based on Jira issue changes
 * - Linking ITSM tickets to Jira issues
 */

import axios from 'axios';

// Jira API client
const getClient = (domain: string, email: string, apiToken: string) => {
  const token = Buffer.from(`${email}:${apiToken}`).toString('base64');
  return axios.create({
    baseURL: `https://${domain}.atlassian.net/rest/api/3`,
    headers: {
      'Authorization': `Basic ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

// Get issue types from Jira
export const getIssueTypes = async (domain: string, email: string, apiToken: string) => {
  const client = getClient(domain, email, apiToken);
  try {
    const response = await client.get('/issuetype');
    return response.data;
  } catch (error) {
    console.error('Error fetching Jira issue types:', error);
    throw error;
  }
};

// Create an issue in Jira
export const createIssue = async (
  domain: string,
  email: string,
  apiToken: string,
  projectKey: string,
  issueTypeId: string,
  summary: string,
  description: string,
  fields: Record<string, any> = {}
) => {
  const client = getClient(domain, email, apiToken);
  
  // Format the description for Jira's Atlassian Document Format
  const formattedDescription = {
    type: 'doc',
    version: 1,
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: description,
          },
        ],
      },
    ],
  };
  
  try {
    const response = await client.post('/issue', {
      fields: {
        project: {
          key: projectKey,
        },
        issuetype: {
          id: issueTypeId,
        },
        summary,
        description: formattedDescription,
        ...fields,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Jira issue:', error);
    throw error;
  }
};

// Get an issue from Jira
export const getIssue = async (domain: string, email: string, apiToken: string, issueKey: string) => {
  const client = getClient(domain, email, apiToken);
  try {
    const response = await client.get(`/issue/${issueKey}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Jira issue ${issueKey}:`, error);
    throw error;
  }
};

// Update an issue in Jira
export const updateIssue = async (
  domain: string,
  email: string,
  apiToken: string,
  issueKey: string,
  fields: Record<string, any>
) => {
  const client = getClient(domain, email, apiToken);
  try {
    const response = await client.put(`/issue/${issueKey}`, {
      fields,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating Jira issue ${issueKey}:`, error);
    throw error;
  }
};

// Add a comment to a Jira issue
export const addComment = async (
  domain: string,
  email: string,
  apiToken: string,
  issueKey: string,
  body: string
) => {
  const client = getClient(domain, email, apiToken);
  
  // Format the comment for Jira's Atlassian Document Format
  const formattedBody = {
    type: 'doc',
    version: 1,
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: body,
          },
        ],
      },
    ],
  };
  
  try {
    const response = await client.post(`/issue/${issueKey}/comment`, {
      body: formattedBody,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to Jira issue ${issueKey}:`, error);
    throw error;
  }
};

// Get comments from a Jira issue
export const getComments = async (domain: string, email: string, apiToken: string, issueKey: string) => {
  const client = getClient(domain, email, apiToken);
  try {
    const response = await client.get(`/issue/${issueKey}/comment`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for Jira issue ${issueKey}:`, error);
    throw error;
  }
};

// Map ITSM ticket to Jira issue
export const mapTicketToJiraIssue = (ticket: any, projectKey: string, issueTypeId: string) => {
  return {
    projectKey,
    issueTypeId,
    summary: ticket.title,
    description: ticket.description,
    fields: {
      priority: {
        name: mapTicketPriorityToJiraPriority(ticket.priority),
      },
    },
  };
};

// Map Jira issue to ITSM ticket
export const mapJiraIssueToTicket = (issue: any) => {
  return {
    title: issue.fields.summary,
    description: extractTextFromJiraDescription(issue.fields.description),
    status: mapJiraStatusToTicketStatus(issue.fields.status.name),
    priority: mapJiraPriorityToTicketPriority(issue.fields.priority?.name),
  };
};

// Helper functions for status/priority mapping
const mapTicketPriorityToJiraPriority = (priority: string) => {
  const mapping: Record<string, string> = {
    'LOW': 'Low',
    'MEDIUM': 'Medium',
    'HIGH': 'High',
    'CRITICAL': 'Highest',
  };
  return mapping[priority] || 'Medium';
};

const mapJiraPriorityToTicketPriority = (priority: string) => {
  const mapping: Record<string, string> = {
    'Lowest': 'LOW',
    'Low': 'LOW',
    'Medium': 'MEDIUM',
    'High': 'HIGH',
    'Highest': 'CRITICAL',
  };
  return mapping[priority] || 'MEDIUM';
};

const mapJiraStatusToTicketStatus = (status: string) => {
  // This is a simplified mapping - actual Jira workflows may have different statuses
  if (status === 'To Do') {
    return 'OPEN';
  } else if (status === 'In Progress') {
    return 'IN_PROGRESS';
  } else if (status === 'Done') {
    return 'RESOLVED';
  } else if (status === 'Closed') {
    return 'CLOSED';
  }
  return 'OPEN';
};

// Helper function to extract plain text from Jira's Atlassian Document Format
const extractTextFromJiraDescription = (description: any): string => {
  if (!description) return '';
  
  // If it's already a string, return it
  if (typeof description === 'string') return description;
  
  // Try to extract text from Atlassian Document Format
  try {
    let text = '';
    const extractTextFromContent = (content: any[]) => {
      if (!content || !Array.isArray(content)) return;
      
      content.forEach(item => {
        if (item.text) {
          text += item.text + ' ';
        }
        if (item.content) {
          extractTextFromContent(item.content);
        }
      });
    };
    
    if (description.content) {
      extractTextFromContent(description.content);
    }
    
    return text.trim();
  } catch (error) {
    console.error('Error extracting text from Jira description:', error);
    return JSON.stringify(description);
  }
};
