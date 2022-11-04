import React from 'react';
import Row from './row';
import styles from './table.module.css';

const Table = ({ admins, deleteAdmin }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
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
