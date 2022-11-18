import { useState, useEffect } from 'react';
import styles from './tasks.module.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal/Modal';
import Spinner from '../Shared/Spinner';
import { postTasks, putTasks, getTasksById } from '../../redux/tasks/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const [inputValue, setInputValue] = useState({
    description: ''
  });

  const [showModal, setShowModal] = useState({
    success: false,
    error: false
  });

  const { message, list: task, isPending } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const taskId = params.id;

  useEffect(async () => {
    if (taskId) {
      dispatch(getTasksById(taskId));
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(task)) {
      setInputValue({
        description: task.description
      });
    }
  }, [task]);

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.goBack();
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = async () => {
    if (taskId) {
      const response = await dispatch(putTasks(taskId, inputValue));
      if (response.type === 'PUT_TASKS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_TASKS_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postTasks(inputValue));
      if (response.type === 'POST_TASKS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'POST_TASKS_REJECTED') {
        toggleModal('error');
      }
    }
  };
  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.success}
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={message}
        variant={'successModal'}
      />
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={message}
        variant={'errorModal'}
      />
      <h3>Tasks</h3>
      {isPending ? (
        <Spinner />
      ) : (
        <form className={styles.form}>
          <div>
            <div>
              <label>Description</label>
            </div>
            <div>
              <input
                type="text"
                name="description"
                value={inputValue.description}
                onChange={onChangeInput}
                placeholder="Task name"
              />
            </div>
          </div>
          <div>
            <Button onClick={redirect} variant={'cancelButton'} text="Back" />
            <Button
              variant={taskId ? 'editButton' : 'addButton'}
              text={taskId ? 'Edit' : 'Create'}
              onClick={onSubmit}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
