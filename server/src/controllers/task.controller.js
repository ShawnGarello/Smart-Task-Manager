import { createTask, getAllTasks } from '../db/taskQueries.js';

const VALID_PRIORITIES = new Set(['low', 'medium', 'high']);

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
