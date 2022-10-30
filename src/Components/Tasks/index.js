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

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    saveTasks([...tasks.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div>
      <Table tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
}

export default Tasks;
