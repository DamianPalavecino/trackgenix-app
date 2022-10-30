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

  return (
    <div>
      <Table tasks={tasks} saveTasks={saveTasks} />
    </div>
  );
}

export default Tasks;
