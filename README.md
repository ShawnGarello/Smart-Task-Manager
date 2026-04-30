- React + Vite frontend in `client/`
- Node.js + Express backend in `server/`
- A basic backend health route at `GET /api/health`
- SQLite-backed task endpoints at `GET /api/tasks` and `POST /api/tasks`
- Shared project structure for future cross-app constants

SQLite and task features are intentionally not implemented yet.
Update and delete task features are intentionally not implemented yet.

## Prerequisites

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

## Project Structure

```text
      routes/
      controllers/
      db/
      data/
      middleware/
      app.js
      server.js

## Next Milestone

Design the SQLite database schema for tasks, then add the first task API endpoints.
Connect the React frontend to the task API and display real tasks from SQLite.