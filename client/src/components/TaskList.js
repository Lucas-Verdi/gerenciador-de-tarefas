import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask } from '../api/tasks';
import TaskItem from './TaskItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = ({ fetchTasks }) => {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [query, setQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchTasksAndSetState();
  }, [fetchTasks]);

  useEffect(() => {
    const fetchFilteredTasks = async () => {
      const response = await getTasks();
      const allTasks = response.data;
      const filtered = allTasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    };

    if (query) {
      fetchFilteredTasks();
    } else {
      fetchTasksAndSetState();
    }
  }, [query]);

  const fetchTasksAndSetState = async () => {
    const response = await getTasks();
    setTasks(response.data);
    setFilteredTasks(response.data);
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setNewTitle(task.title);
  };

  const handleUpdate = async () => {
    await updateTask(editingId, { title: newTitle });
    fetchTasks();
    setEditingId(null);
    setNewTitle('');
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
  };

  return (
    <div className="container">
      <input
        type="text"
        className="form-control mb-3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filtrar tarefas"
      />
      <div className="row">
        {(query ? filteredTasks : tasks).map((task) => (
          <div key={task._id} className="col-md-6 mb-3">
            <div className="card p-2">
              {editingId === task._id ? (
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleUpdate}>Alterar</button>
                </>
              ) : (
                <>
                  <TaskItem task={task} fetchTasks={fetchTasksAndSetState} />
                  <button className="btn btn-secondary mb-3 mt-3" onClick={() => handleEdit(task)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(task._id)}>Deletar</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
