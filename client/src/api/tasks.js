import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export const getTasks = () => api.get('/tasks');
export const createTask = (task) => api.post('/tasks', task);
export const updateTask = (id, updatedTask) => api.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);