import React from 'react';
import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [admin, adminsList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        adminsList(response.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
    adminsList([...admin.filter((admin) => admin._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <h3>Admins List</h3>
      <List admin={admin} handleDelete={handleDelete} />
    </div>
  );
}

export default SuperAdmins;
