import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './listItem.module.css';

const ListItem = ({ admin, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const modalClose = () => {
    setShowModal(false);
  };

  const modalOpen = () => {
    setShowModal(true);
  };

  const status = admin.status ? 'true' : 'false';
  return (
    <tr className={styles.listItem}>
      <td className={styles.td}>{admin.name}</td>
      <td className={styles.td}>{admin.lastName}</td>
      <td className={styles.td}>{admin.email}</td>
      <td className={styles.td}>{status}</td>
      <td>
        <Button modalOpen={modalOpen} />
        <Modal
          admin={admin}
          modalClose={modalClose}
          showModal={showModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

export default ListItem;
