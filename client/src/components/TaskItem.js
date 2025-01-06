import React from 'react';
import { updateTask } from '../api/tasks';
import ImageCarousel from './ImageCarousel';

const TaskItem = ({ task, fetchTasks }) => {
  const handleToggleComplete = async () => {
    await updateTask(task._id, { completed: !task.completed });
    fetchTasks();
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <ImageCarousel images={task.images} />
      <div className="checkbox-container">
        <input
          type="checkbox"
          className="styled-checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          id={`checkbox-${task._id}`}
        />
        <label htmlFor={`checkbox-${task._id}`} className="checkbox-label">
          {task.completed ? 'Completo' : 'Incompleto'}
        </label>
      </div>
    </div>
  );
};

export default TaskItem;
