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

const Form = () => {
  const [inputValue, setInputValue] = useState({
    description: '',
    date: '',
    hours: 0
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
        description: timesheet.description
      });
    }
  }, [timesheet]);

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
                placeholder="Description"
              />
            </div>
          </div>
          <div>
            <div>
              <label>Hours</label>
            </div>
            <div>
              <input
                type="number"
                name="hours"
                value={inputValue.hours}
                onChange={onChangeInput}
                placeholder="Hours"
              />
            </div>
          </div>
          <div>
            <div>
              <label>Project</label>
            </div>
            <div>
              <select>
                {projects?.map((project) => {
                  return <option key={project._id}>{project.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div>
            <div>
              <label>Task</label>
            </div>
            <div>
              <select>
                {tasks?.map((task) => {
                  return <option key={task._id}>{task.description}</option>;
                })}
              </select>
            </div>
          </div>
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
