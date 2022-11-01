import React from 'react';
import styles from './table.module.css';

const DeleteButton = ({ openModal }) => {
  return (
    <button className={styles.DeleteButton} onClick={openModal}>
      X
    </button>
  );
};

export default DeleteButton;
