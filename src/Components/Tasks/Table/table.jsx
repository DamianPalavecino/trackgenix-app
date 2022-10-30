import React from 'react';
import Row from '../Row/row';
import styles from './table.module.css';

const Table = ({ tasks, handleDelete }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Task</td>
          <td>Last Updated</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          return <Row key={task._id} task={task} handleDelete={handleDelete} />;
        })}
      </tbody>
    </table>
  );
};

export default Table;
