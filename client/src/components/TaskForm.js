import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api/tasks';
import '../index.css';

const TaskForm = ({ fetchTasks, currentTask = null }) => {
  const [title, setTitle] = useState(currentTask ? currentTask.title : '');
  const [images, setImages] = useState(currentTask ? currentTask.images.join(', ') : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      images: images.split(',').map(url => url.trim())
    };

    if (currentTask) {
      await updateTask(currentTask._id, newTask);
    } else {
      await createTask(newTask);
    }

    fetchTasks();
    setTitle('');
    setImages('');
  };

  useEffect(() => {
    if(currentTask) {
      setTitle(currentTask.title);
      setImages(currentTask.images.join(', '));
    }
  }, [currentTask]);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulo"
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="URLs das imagens (Separado por vírgula)"
        />
      </div>
      <button type="submit" className="btn btn-success">
        {currentTask ? 'Update' : 'Adicionar'} Tarefa
      </button>
    </form>
  );
};

export default TaskForm;
