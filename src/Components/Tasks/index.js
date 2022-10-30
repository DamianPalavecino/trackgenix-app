import React from 'react';
import { useEffect, useState } from 'react';
import Table from './Table/table';
import styles from './tasks.module.css';
import Modal from './Modal/modal-delete';

function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, saveTasks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        saveTasks(response.data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    saveTasks([...tasks.filter((newListItem) => newListItem._id !== id)]);
    closeModal();
  };

  if (tasks === undefined) {
    return <p className={styles.container}>There are no tasks yet!</p>;
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Modal
        showModal={showModal}
        openModal={openModal}
        closeModal={closeModal}
        handleDelete={handleDelete}
        tasks={tasks}
      />
      <Table tasks={tasks} openModal={openModal} />
    </div>
  );
}

export default Tasks;
