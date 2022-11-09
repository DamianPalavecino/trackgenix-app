import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Table from '../Shared/Table';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Admins = () => {
  const history = useHistory();
  const [admins, saveAdmins] = useState([]);
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });
  const params = useParams();

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
    toggleModal('confirm', 'success');
    history.push('/admins');
  };

  const editAdmin = (id) => {
    history.push(`admins/form/${id}`);
  };

  const deleteRow = (id) => {
    console.log(id);
    history.push(`admins/${id}`);
    toggleModal('confirm');
  };

  const toggleModal = (modal, secondModal) => {
    if (secondModal) {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal],
        [secondModal]: !secondModal[modal]
      });
    } else {
      setShowModal({
        ...showModal,
        [modal]: !showModal[modal]
      });
    }
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => toggleModal('confirm')}
        title="Are you sure"
        text="You are going to delete this project"
      >
        <Button onClick={() => deleteAdmin(params.id)} text="Yes" />
        <Button onClick={() => toggleModal('confirm')} text="No" />
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Project Deleted"
      >
        <Button onClick={() => toggleModal('success')} text="OK" />
      </Modal>
      <h2>Admins</h2>
      <Table
        data={admins}
        deleteAdmin={deleteAdmin}
        headers={['name', 'lastName', 'email', 'status', 'actions']}
        editItem={editAdmin}
        handleDelete={deleteRow}
      />
      <Button
        text="Add admin"
        onClick={() => {
          history.push('/admins/form');
        }}
        variant="addButton"
      >
        Add admin
      </Button>
    </section>
  );
};

export default Admins;
