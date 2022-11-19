import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import Modal from '../../Shared/Modal/Modal';
import Button from '../../Shared/Button';
import Spinner from '../../Shared/Spinner';
import { getProjects } from '../../../redux/projects/thunks';
import { getTasks } from '../../../redux/tasks/thunks';
import { postTimesheets, putTimesheets, getTimesheetsById } from '../../../redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';

const Form = () => {
  const [inputValue, setInputValue] = useState({
    description: '',
    date: '',
    hours: 0,
    project: '',
    task: ''
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
    if (!Array.isArray(timesheet)) {
      setInputValue({
        description: timesheet.description,
        date: fixDate(timesheet.date),
        hours: timesheet.hours,
        project: timesheet.project?._id || '',
        task: timesheet.task?._id || ''
      });
    }
  }, [timesheet]);

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.goBack();
  };

  const fixDate = (date) => {
    return date.slice(0, 10);
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = async () => {
    if (id) {
      const response = await dispatch(putTimesheets(id, inputValue));
      if (response.type === 'PUT_TIMESHEETS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_TIMESHEETS_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postTimesheets(inputValue));
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
        <form className={styles.form}>
          <Input
            label="Description"
            name="description"
            placeholder="Description"
            onChange={onChangeInput}
            type="text"
            value={inputValue.description}
          />
          <Input
            label="Hours"
            name="hours"
            placeholder="Hours"
            onChange={onChangeInput}
            type="number"
            value={inputValue.hours}
          />
          <Input
            label="Date"
            name="date"
            placeholder="Date"
            onChange={onChangeInput}
            type="date"
            value={inputValue.date}
          />
          <Select
            label="Project"
            onChange={onChangeInput}
            optionsData={projects}
            item="name"
            optionValue="Project"
            selectName="project"
            selectValue={inputValue.project}
          />
          <Select
            label="Task"
            onChange={onChangeInput}
            optionsData={tasks}
            item="description"
            optionValue="Task"
            selectName="task"
            selectValue={inputValue.task}
          />
          <div>
            <Button onClick={redirect} variant={'cancelButton'} text="Back" />
            <Button
              variant={id ? 'editButton' : 'addButton'}
              text={id ? 'Edit' : 'Create'}
              onClick={onSubmit}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
