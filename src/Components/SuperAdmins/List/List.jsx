import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './list.module.css';

const List = ({ admin, handleDelete }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {admin.map((admin) => {
          return <ListItem key={admin._id} admin={admin} handleDelete={handleDelete} />;
        })}
      </tbody>
    </table>
  );
};

export default List;
