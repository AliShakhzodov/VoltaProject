# AI-Powered Search Application

This application demonstrates an intelligent search interface that uses AI to interpret natural language queries and retrieve relevant information from a database. It features a beautiful React frontend with shadcn/ui components and a Node.js backend with PostgreSQL database integration.

## Features

- Natural language search interface
- AI query interpretation (converts natural language to SQL)
- PostgreSQL database with sample product data
- Responsive card layout for search results
- Light/dark mode support
- Elegant animations and transitions

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (simulated for demo)
- **AI**: OpenAI API integration (configured but not active in demo)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev:all
```

This will start both the frontend Vite server and the backend Express server.

## Environment Variables

In a production environment, you would need to set the following environment variables:

```
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=search_app
DB_PASSWORD=your_password
DB_PORT=5432
OPENAI_API_KEY=your_openai_api_key
```

## Database Setup

For a real PostgreSQL database, you can use the SQL script in `server/database-setup.sql` to create the necessary tables and sample data.

## Project Structure

- `/src`: Frontend React application
  - `/components`: React components
  - `/types`: TypeScript type definitions
- `/server`: Backend Node.js application
  - `index.js`: Express server setup
  - `ai-service.js`: AI query processing
  - `db-service.js`: Database interaction# VoltaProject
