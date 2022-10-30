import React from 'react';
import styles from './delete-button.module.css';

const DeleteButton = ({ task, handleDelete }) => {
  return (
    <button onClick={() => handleDelete(task._id)} className={styles.deleteButton}>
      X
    </button>
  );
};

export default DeleteButton;
