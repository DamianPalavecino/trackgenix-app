import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from '../timeSheets.module.css';
import { Modal, Button, Spinner, Input, Select } from 'Components/Shared';
import { getTasks } from 'redux/tasks/thunks';
import { getByIdEmployees } from 'redux/employees/thunks';
import { postTimesheets } from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { timeSheetSchema } from './validations';

const AddTimesheet = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timeSheetSchema)
  });

  const [showModal, setShowModal] = useState({
    success: false,
    error: false
  });

  const { message, isPending } = useSelector((state) => state.timeSheets);
  const tasks = useSelector((state) => state.tasks.list);
  const employee = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const id = params.id;

  useEffect(() => {
    dispatch(getByIdEmployees(id));
    dispatch(getTasks());
  }, []);

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
    const response = await dispatch(postTimesheets(data));
    if (response.type === 'POST_TIMESHEETS_FULFILLED') {
      toggleModal('success');
    } else if (response.type === 'POST_TIMESHEETS_REJECTED') {
      toggleModal('error');
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
        text="Timesheet created successfully"
        variant={'successModal'}
      />
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={message}
        variant={'errorModal'}
      />
      <h3>Create new Timesheets</h3>
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
            label="Hours"
            type="text"
            name="hours"
            placeholder="Hours"
            register={register}
            error={errors.hours?.message}
          />
          <Input
            label="Date"
            type="date"
            name="date"
            placeholder="Date"
            register={register}
            error={errors.date?.message}
          />
          <Select
            label="Project"
            name="project"
            optionValue="Project"
            optionsData={employee?.projects}
            item="name"
            register={register}
            error={errors.project?.message}
          />
          <Select
            label="Task"
            name="task"
            optionValue="Task"
            optionsData={tasks}
            item="description"
            register={register}
            error={errors.task?.message}
          />
          <div>
            <Button onClick={redirect} variant={'cancelButton'} text="Back" />
            <Button variant="addButton" text="Create" type="submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTimesheet;
