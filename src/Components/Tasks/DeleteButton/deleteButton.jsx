import React from 'react';
import styles from './delete-button.module.css';

const DeleteButton = ({ openModal }) => {
  return (
    <button onClick={openModal} className={styles.deleteButton}>
      X
    </button>
  );
};

export default DeleteButton;
