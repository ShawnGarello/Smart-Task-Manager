# Smart Task Manager

A starter scaffold for a Smart Task Manager using React, Node.js, Express, and SQLite.

This milestone includes:

- React + Vite frontend in `client/`
- Node.js + Express backend in `server/`
- A basic backend health route at `GET /api/health`
- SQLite-backed task CRUD endpoints
- Shared project structure for future cross-app constants

Authentication, filtering, and search are intentionally not implemented yet.

## Prerequisites

- Node.js 20 or newer
- npm

## Install Dependencies

From the project root:

```bash
npm run install:all
```

Or install each app separately:

```bash
npm --prefix client install
npm --prefix server install
```

## Run The Frontend

```bash
npm run dev:client
```

The Vite app will usually run at:

```text
http://localhost:5173
```

## Run The Backend

```bash
npm run dev:server
```

The Express API runs at:

```text
http://localhost:3000
```

## Test The Health Route

Open this URL in a browser:

```text
http://localhost:3000/api/health
```

Or use curl:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "smart-task-manager-api"
}
```

## Task API Endpoints

### Get All Tasks

```text
GET http://localhost:3000/api/tasks
```

Example curl command:

```bash
curl http://localhost:3000/api/tasks
```

Example response:

```json
{
  "tasks": []
}
```

### Create A Task

```text
POST http://localhost:3000/api/tasks
```

Example curl command:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Plan the database\",\"description\":\"Define the first task schema\",\"priority\":\"high\",\"dueDate\":\"2026-05-01\"}"
```

Example request body:

```json
{
  "title": "Plan the database",
  "description": "Define the first task schema",
  "priority": "high",
  "dueDate": "2026-05-01"
}
```

Example response:

```json
{
  "task": {
    "id": 1,
    "title": "Plan the database",
    "description": "Define the first task schema",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-05-01",
    "createdAt": "2026-04-26T12:00:00.000Z",
    "updatedAt": "2026-04-26T12:00:00.000Z"
  }
}
```

Validation rules:

- `title` is required.
- `priority` defaults to `medium`.
- Allowed priorities are `low`, `medium`, and `high`.

### Update A Task

```text
PATCH http://localhost:3000/api/tasks/:id
PUT http://localhost:3000/api/tasks/:id
```

Example curl command:

```bash
curl -X PATCH http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Update the database plan\",\"completed\":true,\"priority\":\"medium\"}"
```

Example response:

```json
{
  "task": {
    "id": 1,
    "title": "Update the database plan",
    "description": "Define the first task schema",
    "completed": true,
    "priority": "medium",
    "dueDate": "2026-05-01",
    "createdAt": "2026-04-26T12:00:00.000Z",
    "updatedAt": "2026-04-26T12:30:00.000Z"
  }
}
```

### Delete A Task

```text
DELETE http://localhost:3000/api/tasks/:id
```

Example curl command:

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

Example response:

```json
{
  "message": "Task deleted",
  "task": {
    "id": 1,
    "title": "Update the database plan",
    "description": "Define the first task schema",
    "completed": true,
    "priority": "medium",
    "dueDate": "2026-05-01",
    "createdAt": "2026-04-26T12:00:00.000Z",
    "updatedAt": "2026-04-26T12:30:00.000Z"
  }
}
```

Missing task ids return `404 Not Found`.

## Project Structure

```text
smart-task-manager/
  client/
    src/
      components/
      pages/
      api/
      hooks/
      styles/
      App.jsx
      main.jsx

  server/
    src/
      routes/
      controllers/
      db/
      data/
      middleware/
      app.js
      server.js

  shared/
    constants/

  package.json
  README.md
```

## Next Milestone

Connect the React frontend to the task API and display real tasks from SQLite.