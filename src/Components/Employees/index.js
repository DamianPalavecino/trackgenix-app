import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });
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

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.confirm}
        closeModal={() => toggleModal('confirm')}
        title="Are you sure?"
        text="You are going to delete this employee"
      >
        <Button text="yes" onClick={() => deleteEmployee(params.id)} />
        <Button
          text="no"
          onClick={() => {
            toggleModal('confirm');
            history.goBack();
          }}
        />
      </Modal>

      <h2>Employees</h2>

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
      />

      <Button
        text="Add Employee"
        variant="addButton"
        onClick={() => history.push('employees/form')}
      >
        Add Employee
      </Button>
    </section>
  );
};
export default Employees;
