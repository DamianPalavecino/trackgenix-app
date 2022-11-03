import React from 'react';
import { useEffect, useState } from 'react';
import Table from './table';
import styles from './admins.module.css';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);

  useEffect(async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  const deleteAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
    saveAdmins([...admins.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Table admins={admins} deleteAdmin={deleteAdmin} />
      <a href={'admins/form'}>
        <button className={styles.addButton}>Add admin</button>
      </a>
    </section>
  );
};

export default Admins;
