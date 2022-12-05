import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Modal, Table, Spinner } from 'Components/Shared';
import styles from './super-admins.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAdmins, getAdmins } from 'redux/super-admins/thunks';

const SuperAdmins = () => {
  const [showModal, setShowModal] = useState({ confirm: false, success: false });
  const { list: adminsList, isPending, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  if (error) {
    return (
      <div className={styles.container}>
        <h3>{error}</h3>
      </div>
    );
  }

  const editAdmin = (id) => {
    history.push(`super-admins/form/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteAdmins(id));
    toggleModal('confirm', 'success');
    history.push('/super-admins');
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

  const openDeleteModal = (id) => {
    history.push(`super-admins/delete/${id}`);
    toggleModal('confirm');
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => {
          toggleModal('confirm');
          history.goBack();
        }}
        title="Are you sure?"
        text="You are going to delete one admin"
      >
        <span>
          <Button
            onClick={() => {
              handleDelete(params.id);
            }}
            text="Yes"
            variant="deleteButton"
          />
          <Button
            onClick={() => {
              toggleModal('confirm');
              history.goBack();
            }}
            text="No"
          />
        </span>
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Admin deleted successfully"
        variant={'successModal'}
      />
      <h2>Admins</h2>
      <Button
        text="Add Admins +"
        variant="addButton"
        onClick={() => history.push('super-admins/form')}
      />
      {isPending ? (
        <Spinner entity="Admins" />
      ) : (
        <Table
          headers={['name', 'lastName', 'email', 'status', 'actions']}
          data={adminsList}
          editItem={editAdmin}
          handleDelete={openDeleteModal}
        />
      )}
    </div>
  );
};

export default SuperAdmins;
