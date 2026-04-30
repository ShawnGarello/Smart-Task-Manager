import db from './database.js';

function mapTask(row) {
  return {
    ...row,
    completed: Boolean(row.completed)
  };
}

export function getAllTasks() {
  const rows = db
    .prepare(
      `SELECT id, title, description, completed, priority, dueDate, createdAt, updatedAt
       FROM tasks
       ORDER BY createdAt DESC`
    )
    .all();

  return rows.map(mapTask);
}

export function createTask({ title, description = '', completed = false, priority = 'medium', dueDate = null }) {
  const now = new Date().toISOString();

  const result = db
    .prepare(
      `INSERT INTO tasks (title, description, completed, priority, dueDate, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(title, description, completed ? 1 : 0, priority, dueDate, now, now);

  const task = db
    .prepare(
      `SELECT id, title, description, completed, priority, dueDate, createdAt, updatedAt
       FROM tasks
       WHERE id = ?`
    )
    .get(result.lastInsertRowid);

  return mapTask(task);
}