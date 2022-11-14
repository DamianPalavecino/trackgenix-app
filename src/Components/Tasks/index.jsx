import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getTasks } from '../../redux/tasks/thunks';
import styles from './tasks.module.css';

const Tasks = () => {
  const [showModal, setShowModal] = useState({ confirm: false, success: false });
  const listTasks = useSelector((state) => state.tasks.list);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  useEffect(async () => {
    dispatch(getTasks());
  }, []);

  const editTask = (id) => {
    history.push(`tasks/form/${id}`);
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
    history.push(`tasks/delete/${id}`);
    toggleModal('confirm');
  };

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    dispatch(getTasks());
    toggleModal('confirm', 'success');
    history.push('/tasks');
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
        text="You are going to delete this task"
      >
        <span>
          <Button
            onClick={() => {
              handleDelete(params.id);
            }}
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
        </span>
      </Modal>
      <Modal
        showModal={showModal.success}
        closeModal={() => toggleModal('success')}
        text="Task Deleted"
        variant={'successModal'}
      ></Modal>
      <h2>Tasks</h2>
      <Button text="Add Task +" variant="addButton" onClick={() => history.push('tasks/form')} />
      <Table
        data={listTasks}
        handleDelete={openDeleteModal}
        headers={['description', 'updatedAt', 'actions']}
        editItem={editTask}
      />
    </div>
  );
};

export default Tasks;
