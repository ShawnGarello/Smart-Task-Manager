import { useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, updateTask } from './api/tasks.js';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    async function loadTasks() {
      try {
        setIsLoading(true);
        setError('');
        const taskList = await getTasks();
        setTasks(taskList);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleCreateTask(taskData) {
    try {
      setError('');
      const newTask = await createTask(taskData);
      setTasks((currentTasks) => [newTask, ...currentTasks]);
      setFeedback('Task added.');
      return newTask;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  async function handleUpdateTask(id, updates) {
    try {
      setError('');
      const updatedTask = await updateTask(id, updates);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setFeedback('Task updated.');
      return updatedTask;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  async function handleDeleteTask(id) {
    try {
      setError('');
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
      setFeedback('Task deleted.');
    } catch (err) {
      setError(err.message);
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <p className="eyebrow">Smart Task Manager</p>
          <h1>Today&apos;s work, clearly lined up.</h1>
          <p className="header-copy">
            Add, edit, complete, and remove tasks backed by your Express + SQLite API.
          </p>
        </div>

        <div className="task-summary" aria-label="Task summary">
          <span>{tasks.length}</span>
          <p>{completedCount} complete</p>
        </div>
      </section>

      <section className="workspace-grid">
        <TaskForm onSubmit={handleCreateTask} />

        <section className="task-panel">
          <div className="panel-header">
            <div>
              <h2>Tasks</h2>
              <p>Manage the list stored in SQLite.</p>
            </div>
            {feedback && <span className="feedback">{feedback}</span>}
          </div>

          {error && <p className="error-message">{error}</p>}

          {isLoading ? (
            <p className="status-message">Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
