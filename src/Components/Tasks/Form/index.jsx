import { useState, useEffect } from 'react';
import styles from '../tasks.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Modal, Spinner, Input } from 'Components/Shared';
import { postTasks, putTasks, getTasksById } from 'redux/tasks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { taskSchema } from './validations';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({ mode: 'onBlur', resolver: joiResolver(taskSchema) });

  const [showModal, setShowModal] = useState({
    success: false,
    error: false
  });

  const { message, isPending, list: task } = useSelector((state) => state.tasks);
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
    reset({
      description: task?.description
    });
  }, [task]);

  const redirect = () => {
    history.goBack();
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = async (data) => {
    if (taskId) {
      const response = await dispatch(putTasks(taskId, data));
      if (response.type === 'PUT_TASKS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_TASKS_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postTasks(data));
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
      <h2>Tasks</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Description"
            type="text"
            name="description"
            placeholder="Task name"
            register={register}
            error={errors.description?.message}
          />
          <div>
            <Button onClick={redirect} variant={'cancelButton'} text="Back" />
            <Button
              variant={taskId ? 'editButton' : 'addButton'}
              text={taskId ? 'Edit' : 'Create'}
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
