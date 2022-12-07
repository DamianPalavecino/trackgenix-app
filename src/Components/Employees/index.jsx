import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';
import { Modal, Spinner, Table } from 'Components/Shared';

const Employees = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { list, isPending, error } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });
  const [projects, saveProjects] = useState([]);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

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

  if (error) {
    return (
      <div className={styles.container}>
        <h3>{error}</h3>
      </div>
    );
  }

  const openProjectsModal = (id) => {
    history.push(`employees/${id}/projects`);
    toggleModal('info');
    const data = list.find((employee) => employee._id === id);
    saveProjects(data.projects);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.info}
        closeModal={() => {
          toggleModal('info');
          history.goBack();
        }}
        title="Projects List"
      >
        {projects.length > 0 ? (
          <Table
            headers={['name', 'description', 'startDate', 'endDate', 'clientName']}
            data={projects}
          />
        ) : (
          <p>This employee has no projects assigned yet</p>
        )}
      </Modal>
      <h2>Employees</h2>
      {isPending ? (
        <Spinner entity="Employees" />
      ) : (
        <Table
          data={list}
          headers={['name', 'lastName', 'phone', 'email', 'password', 'status', 'projects']}
          showInfo={openProjectsModal}
        />
      )}
    </section>
  );
};

export default Employees;
