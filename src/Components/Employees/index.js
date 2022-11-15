import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployee } from '../../redux/employees/thunks';
import Spinner from '../Shared/Spinner';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Button';

const Employees = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { list, isPending, error } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState({ info: false, delete: false, success: false });

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

  const openDeleteModal = (id) => {
    history.push(`employees/delete/${id}`);
    toggleModal('confirm');
  };

  if (error) {
    return (
      <div className={styles.container}>
        <h3>{error}</h3>
      </div>
    );
  }

  const onDelete = (id) => {
    dispatch(deleteEmployee(id));
    toggleModal('confirm', 'success');
    history.push('/employees');
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
        <Button text="Yes" onClick={() => onDelete(params.id)} />
        <Button
          text="No"
          onClick={() => {
            toggleModal('confirm');
            history.goBack();
          }}
        />
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Admin deleted successfully"
        variant={'successModal'}
      />
      <h2>Employees</h2>
      {isPending ? (
        <Spinner entity="Employees" />
      ) : (
        <Table
          data={list}
          headers={[
            'name',
            'lastName',
            'phone',
            'email',
            'password',
            'status',
            'projects',
            'actions'
          ]}
          handleDelete={openDeleteModal}
          editItem={editEmployee}
        />
      )}
    </section>
  );
};

export default Employees;
