import React from 'react';
import { useEffect, useState } from 'react';
import Table from './Table/table';
import styles from './tasks.module.css';

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

  // if (tasks === undefined) {
  //   return <h3 className={styles.container}>There are no tasks yet!</h3>;
  // }

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <Table tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
}

export default Tasks;
