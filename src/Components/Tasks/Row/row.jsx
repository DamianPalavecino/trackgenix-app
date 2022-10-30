import React from 'react';
import styles from './row.module.css';

const Row = ({ task }) => {
  return (
    <tr className={styles.row}>
      <td>{task.description}</td>
      <td>{task.updatedAt}</td>
    </tr>
  );
};

export default Row;
