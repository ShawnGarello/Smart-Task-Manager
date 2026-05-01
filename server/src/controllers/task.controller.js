import { createTask, deleteTaskById, getAllTasks, updateTaskById } from '../db/taskQueries.js';

const VALID_PRIORITIES = new Set(['low', 'medium', 'high']);

function parseTaskId(rawId) {
  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

export function listTasks(_req, res) {
  res.json({
    tasks: getAllTasks()
  });
}

export function addTask(req, res) {
  const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';

  if (!title) {
    return res.status(400).json({
      error: 'Title is required'
    });
  }

  const priority = req.body.priority || 'medium';

  if (!VALID_PRIORITIES.has(priority)) {
    return res.status(400).json({
      error: 'Priority must be low, medium, or high'
    });
  }

  const task = createTask({
    title,
    description: req.body.description || '',
    completed: Boolean(req.body.completed),
    priority,
    dueDate: req.body.dueDate || null
  });

  return res.status(201).json({
    task
  });
}

export function editTask(req, res) {
  const id = parseTaskId(req.params.id);

  if (!id) {
    return res.status(400).json({
      error: 'Task id must be a positive integer'
    });
  }

  const updates = {};

  if (Object.hasOwn(req.body, 'title')) {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';

    if (!title) {
      return res.status(400).json({
        error: 'Title cannot be empty'
      });
    }

    updates.title = title;
  }

  if (Object.hasOwn(req.body, 'description')) {
    updates.description = req.body.description || '';
  }

  if (Object.hasOwn(req.body, 'completed')) {
    updates.completed = Boolean(req.body.completed);
  }

  if (Object.hasOwn(req.body, 'priority')) {
    if (!VALID_PRIORITIES.has(req.body.priority)) {
      return res.status(400).json({
        error: 'Priority must be low, medium, or high'
      });
    }

    updates.priority = req.body.priority;
  }

  if (Object.hasOwn(req.body, 'dueDate')) {
    updates.dueDate = req.body.dueDate || null;
  }

  const task = updateTaskById(id, updates);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  return res.json({
    task
  });
}

export function removeTask(req, res) {
  const id = parseTaskId(req.params.id);

  if (!id) {
    return res.status(400).json({
      error: 'Task id must be a positive integer'
    });
  }

  const task = deleteTaskById(id);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  return res.json({
    message: 'Task deleted',
    task
  });
}

