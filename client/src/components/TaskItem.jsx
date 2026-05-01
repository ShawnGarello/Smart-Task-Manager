import { useState } from 'react';
import TaskForm from './TaskForm.jsx';

function formatDate(dateText) {
  if (!dateText) {
    return 'No due date';
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric'
  }).format(new Date(`${dateText}T00:00:00`));
}

function TaskItem({ onDeleteTask, onUpdateTask, task }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleToggleCompleted() {
    await onUpdateTask(task.id, {
      completed: !task.completed
    });
  }

  async function handleEditTask(updates) {
    const updatedTask = await onUpdateTask(task.id, updates);

    if (updatedTask) {
      setIsEditing(false);
    }

    return updatedTask;
  }

  if (isEditing) {
    return (
      <article className="task-card editing">
        <TaskForm
          initialTask={task}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleEditTask}
          submitLabel="Save changes"
        />
      </article>
    );
  }

  return (
    <article className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-check">
        <input
          aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          checked={task.completed}
          onChange={handleToggleCompleted}
          type="checkbox"
        />
      </div>

      <div className="task-content">
        <div className="task-topline">
          <h3>{task.title}</h3>
          <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <p className="task-meta">Due {formatDate(task.dueDate)}</p>
      </div>

      <div className="task-actions">
        <button className="text-button" onClick={() => setIsEditing(true)} type="button">
          Edit
        </button>
        <button className="text-button danger" onClick={() => onDeleteTask(task.id)} type="button">
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
