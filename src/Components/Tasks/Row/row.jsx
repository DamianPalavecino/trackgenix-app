import React from 'react';
import DeleteButton from '../DeleteButton/deleteButton';
import styles from './row.module.css';

const Row = ({ task, openModal }) => {
  return (
    <tr className={styles.row}>
      <td>{task.description}</td>
      <td>{task.updatedAt}</td>
      <td>
        <DeleteButton task={task} openModal={openModal} />
      </td>
    </tr>
  );
};

export default Row;
