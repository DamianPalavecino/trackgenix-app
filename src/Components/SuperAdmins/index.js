import React from 'react';
import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [admins, adminsList] = useState([]);

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
    adminsList([...admins.filter((admins) => admins._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <h3>Admins List</h3>
      <a href={`super-admins/form`}>
        <button className={styles.addBtn}>Add Admin +</button>
      </a>
      <List admins={admins} handleDelete={handleDelete} />
    </div>
  );
}

export default SuperAdmins;
