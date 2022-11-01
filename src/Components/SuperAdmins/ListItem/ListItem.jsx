import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './listItem.module.css';

const ListItem = ({ admins, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const modalClose = () => {
    setShowModal(false);
  };

  const modalOpen = () => {
    setShowModal(true);
  };

  const status = admins.status ? 'true' : 'false';
  return (
    <tr className={styles.listItem}>
      <td className={styles.td}>{admins.name}</td>
      <td className={styles.td}>{admins.lastName}</td>
      <td className={styles.td}>{admins.email}</td>
      <td className={styles.td}>{status}</td>
      <td>
        <Button modalOpen={modalOpen} />
        <Modal
          admins={admins}
          modalClose={modalClose}
          showModal={showModal}
          handleDelete={handleDelete}
        />
      </td>
      <td>
        <a href={`super-admins/form`}>
          <button className={styles.addBtn}>Edit</button>
        </a>
      </td>
    </tr>
  );
};

export default ListItem;
