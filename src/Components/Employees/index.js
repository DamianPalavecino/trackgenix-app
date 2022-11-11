import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal/Modal';
import Table from '../Shared/Table';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState({ delete: false, success: false, info: false });
  const [projectsData, setProjectsData] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE'
    });
    setEmployees([...employees.filter((newListItem) => newListItem._id !== id)]);
    toggleModal('confirm', 'success');
    history.push('/employees');
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
    history.push(`employees/delete/${id}`);
    toggleModal('confirm');
  };

  const editEmployee = (id) => {
    history.push(`employees/form/${id}`);
  };

  const showProjectsInfo = (id) => {
    history.push(`employees/${id}/projects`);
    toggleModal('info');
    const data = employees.find((employee) => employee._id === id);
    setProjectsData(data.projects);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => {
          toggleModal('confirm');
          history.goBack();
        }}
        title="Are you sure?"
        text="You are going to delete this employee"
      >
        <span>
          <Button
            onClick={() => {
              toggleModal('confirm');
              history.goBack();
            }}
            variant={'cancelButton'}
            text="No"
          />
          <Button
            onClick={() => {
              deleteEmployee(params.id);
            }}
            text="Yes"
            variant={'confirmButton'}
          />
        </span>
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => {
          toggleModal('success');
        }}
        variant="successModal"
        text="Employee deleted successfull"
      />
      <Modal
        showModal={showModal.info}
        title="Projects Assigned"
        closeModal={() => {
          toggleModal('info');
          history.goBack();
        }}
      >
        <div>
          {projectsData && projectsData.length > 0 ? (
            <Table headers={['name', 'description']}></Table>
          ) : (
            <p>This employee has no project assigned yet!</p>
          )}
        </div>
      </Modal>

      <h2>Employees</h2>
      <Button
        text="Add Employee +"
        variant="addButton"
        onClick={() => history.push('employees/form')}
      />
      <Table
        data={employees}
        headers={[
          'name',
          'lastName',
          'phone',
          'email',
          'password',
          'projects',
          'status',
          'actions'
        ]}
        editItem={editEmployee}
        handleDelete={openDeleteModal}
        showInfo={showProjectsInfo}
      />
    </section>
  );
};
export default Employees;
