import React from 'react';
import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import { getEmployees, deleteEmployee } from '../../redux/employees/thunks';
import { getProjects, deleteProject } from '../../redux/projects/thunks';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Shared/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../Shared/Modal/Modal';

const Admins = () => {
  const params = useParams();
  const history = useHistory();
  const [entity, setEntity] = useState('projects');
  const dispatch = useDispatch();
  const { list, isPending, error } = useSelector((state) =>
    entity === 'projects' ? state.projects : state.employees
  );
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  if (error) {
    return (
      <div className={styles.container}>
        <h3>{error}</h3>
      </div>
    );
  }

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

  const editEntity = (id) => {
    history.push(`${entity}/form/${id}`);
  };

  const openDeleteModal = (id) => {
    history.push(`admins/delete/${entity}/${id}`);
    toggleModal('confirm');
  };

  const deleteEntity = (id) => {
    entity === 'employees' ? dispatch(deleteEmployee(id)) : dispatch(deleteProject(id));
    toggleModal('confirm', 'success');
    history.goBack();
  };

  const handleEntity = async (entityToSet) => {
    setEntity(entityToSet);
    entityToSet === 'projects' ? dispatch(getProjects()) : dispatch(getEmployees());
  };

  const headers =
    entity === 'projects'
      ? ['name', 'description', 'clientName', 'status', 'startDate', 'endDate', 'actions']
      : ['name', 'lastName', 'email', 'actions'];

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => {
          toggleModal('confirm');
          history.goBack();
        }}
        title="Are you sure?"
        text={`You are going to delete this ${entity}`}
      >
        <span>
          <Button text="Yes" onClick={() => deleteEntity(params.id)} variant="deleteButton" />
          <Button
            text="No"
            onClick={() => {
              toggleModal('confirm');
              history.goBack();
            }}
          />
        </span>
      </Modal>
      <div className={styles.selectEntity}>
        <Button text="Employees" onClick={() => handleEntity('employees')} variant="addButton" />
        <Button text="Projects" onClick={() => handleEntity('projects')} variant="addButton" />
      </div>
      <h1 className={styles.title}>{entity}</h1>
      <div className={styles.selectEntity}>
        <Button
          text={`Add ${entity} +`}
          variant="addButton"
          onClick={() => history.push(`${entity}/form`)}
        ></Button>
      </div>
      {isPending ? (
        <Spinner entity={entity}></Spinner>
      ) : (
        <Table data={list} headers={headers} editItem={editEntity} handleDelete={openDeleteModal} />
      )}
    </section>
  );
};

export default Admins;
