# ITSM System

A modern IT Service Management (ITSM) system built with Next.js, featuring integrations with Azure DevOps, GitHub, and Jira.

## Features

- **Ticket Management**: Create, track, and manage IT service tickets
- **Asset Management**: Track hardware, software, and service assets
- **Knowledge Base**: Create and share knowledge articles
- **SLA Management**: Define and track service level agreements
- **Reporting and Analytics**: Generate reports and insights
- **Cross-Platform**: Works on desktop, tablet, and mobile devices
- **External Integrations**:
  - Azure DevOps: Sync tickets with work items
  - GitHub: Sync tickets with issues
  - Jira: Sync tickets with Jira issues

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js, Supabase
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (or use the provided Docker setup)

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/itsm-system.git
cd itsm-system
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Docker Deployment

To run the application using Docker:

```bash
docker-compose up -d
```

This will start the Next.js application and PostgreSQL database in containers.

## Integration Setup

### Azure DevOps Integration

1. Create a Personal Access Token (PAT) in Azure DevOps
2. Update the `.env` file with your Azure DevOps organization and PAT

### GitHub Integration

1. Create a GitHub OAuth App
2. Update the `.env` file with your GitHub Client ID and Secret

### Jira Integration

1. Create an API Token in Jira
2. Update the `.env` file with your Jira domain, email, and API token

## License

This project is licensed under the MIT License - see the LICENSE file for details.
