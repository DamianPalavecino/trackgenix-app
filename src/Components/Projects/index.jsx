import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import styles from './projects.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/Modal';
import { useHistory, useParams } from 'react-router-dom';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [showModal, setShowModal] = useState({ confirm: false, success: false });
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    saveProjects([...projects.filter((project) => project._id !== id)]);
    toggleModal('confirm', 'success');
    history.push('/projects');
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
    history.push(`projects/delete/${id}`);
    toggleModal('confirm');
  };

  const editRow = (id) => {
    history.push(`projects/form/${id}`);
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => toggleModal('confirm')}
        title="Are you sure"
        text="You are going to delete this project"
      >
        <Button
          onClick={() => {
            handleDelete(params.id);
          }}
          text="Yes"
        />
        <Button onClick={() => toggleModal('confirm')} text="No" />
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Project Deleted"
      >
        <Button onClick={() => toggleModal('success')} text="OK" />
      </Modal>
      <h2>Projects</h2>
      <Button text="Add Admin +" onClick={() => history.push('/projects/form')} />
      <Table
        headers={[
          'name',
          'startDate',
          'endDate',
          'description',
          'clientName',
          'employees',
          'status',
          'actions'
        ]}
        data={projects}
        handleDelete={openDeleteModal}
        editItem={editRow}
      />
    </div>
  );
};

export default Projects;
