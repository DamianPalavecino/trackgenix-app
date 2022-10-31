import React from 'react';
import { useEffect, useState } from 'react';
import Table from './Table/table';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  useEffect(async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        saveTasks(response.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    saveTasks([...tasks.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <a href={`tasks/form`}>
        <button className={styles.addButton}>+</button>
      </a>
      <Table tasks={tasks} handleDelete={handleDelete} />
    </div>
  );
}

export default Tasks;
