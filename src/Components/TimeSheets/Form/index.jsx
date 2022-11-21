import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import { Modal, Button, Spinner, Input, Select } from 'Components/Shared';
import { getProjects } from 'redux/projects/thunks';
import { getTasks } from 'redux/tasks/thunks';
import { postTimesheets, putTimesheets, getTimesheetsById } from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { timeSheetSchema } from './validations';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timeSheetSchema)
  });

  const [showModal, setShowModal] = useState({
    success: false,
    error: false
  });

  const { message, list: timesheet, isPending } = useSelector((state) => state.timeSheets);
  const tasks = useSelector((state) => state.tasks.list);
  const projects = useSelector((state) => state.projects.list);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const id = params.id;

  useEffect(async () => {
    if (id) {
      dispatch(getTimesheetsById(id));
    }
    dispatch(getProjects());
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    reset({
      description: timesheet?.description,
      date: timesheet?.date,
      hours: timesheet?.hours,
      project: timesheet.project?._id,
      task: timesheet.task?._id
    });
  }, [timesheet]);

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
    if (id) {
      const response = await dispatch(putTimesheets(id, data));
      if (response.type === 'PUT_TIMESHEETS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_TIMESHEETS_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postTimesheets(data));
      if (response.type === 'POST_TIMESHEETS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'POST_TIMESHEETS_REJECTED') {
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
      <h3>Timesheet</h3>
      {isPending ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Description"
            type="text"
            name="description"
            placeholder="Description"
            register={register}
            error={errors.description?.message}
          />
          <Input
            type="number"
            name="hours"
            placeholder="Hours"
            register={register}
            error={errors.hours?.message}
          />
          <Input
            type="date"
            name="date"
            placeholder="Date"
            register={register}
            error={errors.date?.message}
          />
          <Select
            label="Project"
            name="project"
            registerName="project"
            optionValue="Project"
            optionsData={projects}
            item="name"
            register={register}
            error={errors.project?.message}
          />
          <Select
            label="Task"
            name="task"
            registerName="task"
            optionValue="Task"
            optionsData={tasks}
            item="description"
            register={register}
            error={errors.task?.message}
          />
          <div>
            <Button onClick={redirect} variant={'cancelButton'} text="Back" />
            <Button
              variant={id ? 'editButton' : 'addButton'}
              text={id ? 'Edit' : 'Create'}
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
