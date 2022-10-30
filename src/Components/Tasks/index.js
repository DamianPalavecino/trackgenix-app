import React from 'react';
import { useEffect, useState } from 'react';
import Table from './Table/table';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        saveTasks(response.data);
      });
  }, []);

  const deleteTask = (id) => {
    saveTasks([...tasks.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div>
      <Table tasks={tasks} saveTasks={saveTasks} deleteTask={deleteTask} />
    </div>
  );
}

export default Tasks;
