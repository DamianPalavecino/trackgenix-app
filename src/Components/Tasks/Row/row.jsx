import React, { useState } from 'react';
import DeleteButton from '../DeleteButton/deleteButton';
import Modal from '../ModalDelete/modalDelete';
import styles from './row.module.css';

const Row = ({ task, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <tr className={styles.row}>
      <td>{task.description}</td>
      <td>{task.updatedAt}</td>
      <td>
        <DeleteButton openModal={openModal} />
        <Modal
          task={task}
          closeModal={closeModal}
          showModal={showModal}
          handleDelete={handleDelete}
        />
        <a href={`tasks/form?id=${task._id}`}>
          <button className={styles.editButton}>Edit</button>
        </a>
      </td>
    </tr>
  );
};

export default Row;
