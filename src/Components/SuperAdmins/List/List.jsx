import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './list.module.css';

const List = ({ admins, handleDelete }) => {
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
        {admins.map((admins) => {
          return <ListItem key={admins._id} admins={admins} handleDelete={handleDelete} />;
        })}
      </tbody>
    </table>
  );
};

export default List;
