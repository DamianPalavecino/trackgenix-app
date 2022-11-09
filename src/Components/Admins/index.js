import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../Shared/Table';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Admins = () => {
  const history = useHistory();
  const [admins, saveAdmins] = useState([]);
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });
  const [entity, setEntity] = useState('projects');
  // const params = useParams();

  useEffect(async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  const handleEntity = async (entityToSet) => {
    setEntity(entityToSet);
    await fetch(`${process.env.REACT_APP_API_URL}/${entityToSet}`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  };

  // const deleteAdmin = async (id) => {
  //   await fetch(`${process.env.REACT_APP_API_URL}/${entity}/${id}`, {
  //     method: 'DELETE'
  //   });
  //   saveAdmins([...admins.filter((newListItem) => newListItem._id !== id)]);
  //   toggleModal('confirm', 'success');
  //   history.push('/admins');
  // };

  const editAdmin = (id) => {
    history.push(`admins/form/${id}`);
  };

  const openDeleteModal = (id) => {
    history.push(`admins/delete/${id}`);
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
        <Button
          // onClick={() => {
          //   deleteAdmin(params.id);
          // }}
          text="Yes"
          variant="confirmButton"
        />
        <Button
          onClick={() => {
            toggleModal('confirm');
            history.goBack();
          }}
          text="No"
        />
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Project Deleted"
      >
        <Button onClick={() => toggleModal('success')} text="OK" />
      </Modal>
      <div className={styles.selectEntity}>
        <Button text="Employees" onClick={() => handleEntity('employees')} variant="saveButton" />
        <Button text="Projects" onClick={() => handleEntity('projects')} variant="saveButton" />
      </div>
      <h2>{entity}</h2>
      <Table
        data={admins}
        // deleteAdmin={deleteAdmin}
        headers={
          entity === 'projects'
            ? ['name', 'description', 'clientName', 'status', 'employees', 'actions']
            : ['name', 'lastName', 'email', 'projects', 'actions']
        }
        editItem={editAdmin}
        handleDelete={openDeleteModal}
      />
      <div>
        <Button
          text={`Add ${entity}`}
          onClick={() => {
            history.push('/employees/form');
          }}
          variant="addButton"
        />
      </div>
    </section>
  );
};

export default Admins;
