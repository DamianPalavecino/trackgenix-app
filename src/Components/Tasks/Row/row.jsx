import React from 'react';
import DeleteButton from '../DeleteButton/deleteButton';
import styles from './row.module.css';

const Row = ({ task, deleteTask }) => {
  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    deleteTask(id);
  };
  return (
    <tr className={styles.row}>
      <td>{task.description}</td>
      <td>{task.updatedAt}</td>
      <td>
        <DeleteButton task={task} handleDelete={handleDelete} />
      </td>
    </tr>
  );
};

export default Row;
