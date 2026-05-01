const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Task request failed');
  }

  return data;
}

export async function getTasks() {
  const data = await request('/api/tasks');
  return data.tasks;
}

export async function createTask(taskData) {
  const data = await request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData)
  });

  return data.task;
}

export async function updateTask(id, updates) {
  const data = await request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  });

  return data.task;
}

export async function deleteTask(id) {
  return request(`/api/tasks/${id}`, {
    method: 'DELETE'
  });
}
