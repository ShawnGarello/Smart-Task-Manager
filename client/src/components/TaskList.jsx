import TaskItem from './TaskItem.jsx';

function TaskList({ onDeleteTask, onUpdateTask, tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Add your first task to start shaping the day.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
          task={task}
        />
      ))}
    </div>
  );
}

export default TaskList;