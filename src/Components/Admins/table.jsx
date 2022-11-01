import React from 'react';
import Row from './Row';
import styles from './table.module.css';

const Table = ({ admins, deleteAdmin }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th id="name">Name</th>
          <th id="last-name">Last Name</th>
          <th id="email">Email</th>
          <th id="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {admins === undefined || admins.length === 0 ? (
          <td>No admins added</td>
        ) : (
          admins.map((admin) => {
            return <Row key={admin._id} admin={admin} deleteAdmin={deleteAdmin} />;
          })
        )}
      </tbody>
    </table>
  );
};

export default Table;
