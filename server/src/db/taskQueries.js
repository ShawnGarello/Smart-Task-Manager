import db from './database.js';

function mapTask(row) {
  if (!row) {
    return null;
  }

  return {
    ...row,
    completed: Boolean(row.completed)
  };
}

export function getTaskById(id) {
  const task = db
    .prepare(
      `SELECT id, title, description, completed, priority, dueDate, createdAt, updatedAt
       FROM tasks
       WHERE id = ?`
    )
    .get(id);

  return mapTask(task);
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

export function updateTaskById(id, updates) {
  const existingTask = getTaskById(id);

  if (!existingTask) {
    return null;
  }

  const nextTask = {
    title: updates.title ?? existingTask.title,
    description: updates.description ?? existingTask.description,
    completed: updates.completed ?? existingTask.completed,
    priority: updates.priority ?? existingTask.priority,
    dueDate: updates.dueDate ?? existingTask.dueDate,
    updatedAt: new Date().toISOString()
  };

  db.prepare(
    `UPDATE tasks
     SET title = ?, description = ?, completed = ?, priority = ?, dueDate = ?, updatedAt = ?
     WHERE id = ?`
  ).run(
    nextTask.title,
    nextTask.description,
    nextTask.completed ? 1 : 0,
    nextTask.priority,
    nextTask.dueDate,
    nextTask.updatedAt,
    id
  );

  return getTaskById(id);
}

export function deleteTaskById(id) {
  const existingTask = getTaskById(id);

  if (!existingTask) {
    return null;
  }

  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

  return existingTask;
}