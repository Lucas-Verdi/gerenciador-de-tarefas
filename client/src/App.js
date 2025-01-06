import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { getTasks } from "./api/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Gerenciamento de Tarefas</h1>
      <div className="row">
        <div className="col-md-6">
          <TaskForm fetchTasks={fetchTasks} />
        </div>
        <div className="col-md-6">
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </div>
      </div>
    </div>
  );
};

export default App;
