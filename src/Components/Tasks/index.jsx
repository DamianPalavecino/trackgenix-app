import { useEffect, useState } from 'react';
import { Table, Button, Modal, Spinner } from 'Components/Shared';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteTasks, getTasks } from 'redux/tasks/thunks';
import styles from './tasks.module.css';

const Tasks = () => {
  const [showModal, setShowModal] = useState({ confirm: false, success: false });
  const { list: tasksList, error, isPending } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  useEffect(async () => {
    dispatch(getTasks());
  }, []);

  if (error) {
    return (
      <div className={styles.container}>
        <h3>{error}</h3>
      </div>
    );
  }

  const editTask = (id) => {
    history.push(`/employee/tasks/form/${id}`);
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
    history.push(`/employee/tasks/delete/${id}`);
    toggleModal('confirm');
  };

  const handleDelete = async (id) => {
    dispatch(deleteTasks(id));
    toggleModal('confirm', 'success');
    history.goBack();
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
      <Button
        text="Add Task +"
        variant="addButton"
        onClick={() => history.push('/employee/tasks/form')}
      />
      {isPending ? (
        <Spinner entity="Tasks" />
      ) : (
        <Table
          data={tasksList}
          handleDelete={openDeleteModal}
          headers={['description', 'updatedAt', 'actions']}
          editItem={editTask}
        />
      )}
    </div>
  );
};

export default Tasks;
