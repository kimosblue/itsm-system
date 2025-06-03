/**
 * Integration Modules Index
 * 
 * This file exports all integration modules for easy importing
 */

import * as AzureDevOps from './azureDevOps';
import * as GitHub from './github';
import * as Jira from './jira';

export { AzureDevOps, GitHub, Jira };

// Integration type for external systems
export type IntegrationType = 'AZURE_DEVOPS' | 'GITHUB' | 'JIRA';

// Integration configuration interface
export interface IntegrationConfig {
  type: IntegrationType;
  enabled: boolean;
  settings: Record<string, any>;
}

// Integration service to handle all external integrations
export class IntegrationService {
  private config: Record<IntegrationType, IntegrationConfig>;

  constructor(config: Record<IntegrationType, IntegrationConfig>) {
    this.config = config;
  }

  // Check if an integration is enabled
  isEnabled(type: IntegrationType): boolean {
    return this.config[type]?.enabled || false;
  }

  // Get integration settings
  getSettings(type: IntegrationType): Record<string, any> {
    return this.config[type]?.settings || {};
  }

  // Create an external ticket from an ITSM ticket
  async createExternalTicket(type: IntegrationType, ticket: any): Promise<any> {
    if (!this.isEnabled(type)) {
      throw new Error(`Integration ${type} is not enabled`);
    }

    const settings = this.getSettings(type);

    switch (type) {
      case 'AZURE_DEVOPS':
        const { org, project, pat, workItemType } = settings;
        const workItemFields = AzureDevOps.mapTicketToWorkItem(ticket);
        return AzureDevOps.createWorkItem(org, project, pat, workItemType, workItemFields);

      case 'GITHUB':
        const { token, owner, repo } = settings;
        const { title, body, labels } = GitHub.mapTicketToIssue(ticket);
        return GitHub.createIssue(token, owner, repo, title, body, labels);

      case 'JIRA':
        const { domain, email, apiToken, projectKey, issueTypeId } = settings;
        const jiraIssue = Jira.mapTicketToJiraIssue(ticket, projectKey, issueTypeId);
        return Jira.createIssue(
          domain, 
          email, 
          apiToken, 
          jiraIssue.projectKey, 
          jiraIssue.issueTypeId, 
          jiraIssue.summary, 
          jiraIssue.description, 
          jiraIssue.fields
        );

      default:
        throw new Error(`Unknown integration type: ${type}`);
    }
  }

  // Update an external ticket from an ITSM ticket
  async updateExternalTicket(type: IntegrationType, externalId: string, ticket: any): Promise<any> {
    if (!this.isEnabled(type)) {
      throw new Error(`Integration ${type} is not enabled`);
    }

    const settings = this.getSettings(type);

    switch (type) {
      case 'AZURE_DEVOPS':
        const { org, project, pat } = settings;
        const workItemFields = AzureDevOps.mapTicketToWorkItem(ticket);
        return AzureDevOps.updateWorkItem(org, project, pat, parseInt(externalId), workItemFields);

      case 'GITHUB':
        const { token, owner, repo } = settings;
        const { title, body, labels } = GitHub.mapTicketToIssue(ticket);
        return GitHub.updateIssue(token, owner, repo, parseInt(externalId), { 
          title, 
          body, 
          labels 
        });

      case 'JIRA':
        const { domain, email, apiToken } = settings;
        const fields = {
          summary: ticket.title,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: ticket.description,
                  },
                ],
              },
            ],
          },
          priority: {
            name: Jira.mapTicketToJiraIssue(ticket, '', '').fields.priority.name,
          },
        };
        return Jira.updateIssue(domain, email, apiToken, externalId, fields);

      default:
        throw new Error(`Unknown integration type: ${type}`);
    }
  }

  // Get an external ticket
  async getExternalTicket(type: IntegrationType, externalId: string): Promise<any> {
    if (!this.isEnabled(type)) {
      throw new Error(`Integration ${type} is not enabled`);
    }

    const settings = this.getSettings(type);

    switch (type) {
      case 'AZURE_DEVOPS':
        const { org, project, pat } = settings;
        return AzureDevOps.getWorkItem(org, project, pat, parseInt(externalId));

      case 'GITHUB':
        const { token, owner, repo } = settings;
        return GitHub.getIssue(token, owner, repo, parseInt(externalId));

      case 'JIRA':
        const { domain, email, apiToken } = settings;
        return Jira.getIssue(domain, email, apiToken, externalId);

      default:
        throw new Error(`Unknown integration type: ${type}`);
    }
  }
}
