import { useState } from 'react';

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: ''
};

function TaskForm({ initialTask, onCancel, onSubmit, submitLabel = 'Add task' }) {
  const [formData, setFormData] = useState({
    title: initialTask?.title || EMPTY_FORM.title,
    description: initialTask?.description || EMPTY_FORM.description,
    priority: initialTask?.priority || EMPTY_FORM.priority,
    dueDate: initialTask?.dueDate || EMPTY_FORM.dueDate
  });
  const [formError, setFormError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const title = formData.title.trim();

    if (!title) {
      setFormError('Title is required.');
      return;
    }

    setFormError('');

    const result = await onSubmit({
      title,
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate || null
    });

    if (!initialTask && result !== null) {
      setFormData(EMPTY_FORM);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>{initialTask ? 'Edit task' : 'Add a task'}</h2>
        <p>{initialTask ? 'Update the details below.' : 'Capture the next useful thing.'}</p>
      </div>

      <label>
        Title
        <input
          name="title"
          onChange={handleChange}
          placeholder="Write project README"
          type="text"
          value={formData.title}
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Add context, notes, or next steps"
          rows="3"
          value={formData.description}
        />
      </label>

      <div className="form-row">
        <label>
          Priority
          <select name="priority" onChange={handleChange} value={formData.priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Due date
          <input name="dueDate" onChange={handleChange} type="date" value={formData.dueDate} />
        </label>
      </div>

      {formError && <p className="form-error">{formError}</p>}

      <div className="form-actions">
        {onCancel && (
          <button className="button secondary" onClick={onCancel} type="button">
            Cancel
          </button>
        )}
        <button className="button primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

