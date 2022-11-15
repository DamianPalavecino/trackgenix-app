import { useState, useEffect } from 'react';
import styles from './projectForm.module.css';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postProjects, putProjects } from '../../redux/projects/thunks';

const ProjectForm = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { message, status, request } = useSelector((state) => state.projects);
  const id = params.id;
  const url = `${process.env.REACT_APP_API_URL}/projects`;
  const [showModal, setShowModal] = useState({ success: false, error: false });
  const [inputValue, setInputValue] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    clientName: '',
    status: false
  });

  const fixDate = (date) => {
    return date.slice(0, 10);
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  useEffect(async () => {
    if (id) {
      fetch(url + '/' + id)
        .then((res) => res.json())
        .then((data) =>
          setInputValue({
            name: data.data.name,
            startDate: fixDate(data.data.startDate),
            endDate: fixDate(data.data.endDate),
            description: data.data.description,
            clientName: data.data.clientName,
            status: data.data.status
          })
        );
    }
  }, []);

  useEffect(() => {
    if (request === 'POST' || request === 'PUT') {
      toggleModal(status);
    }
  }, [status]);

  const redirect = () => {
    history.goBack();
  };

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (id) {
      inputValue.status = inputValue.status === 'active';
      dispatch(putProjects(id, inputValue));
    } else {
      dispatch(postProjects(inputValue));
    }
  };

  return (
    <div className={styles.container}>
      <h2>{id ? 'Edit' : 'Create'} Project</h2>
      <Modal
        showModal={showModal.success}
        variant={'successModal'}
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={message}
      ></Modal>
      <Modal
        showModal={showModal.error}
        variant={'errorModal'}
        closeModal={() => toggleModal('error')}
        text={message}
      ></Modal>
      <form className={styles.form}>
        <label>Project Name</label>
        <input
          name="name"
          value={inputValue.name}
          onChange={onChangeInput}
          placeholder="Project Name"
        ></input>
        <label>Description</label>
        <textarea
          name="description"
          value={inputValue.description}
          onChange={onChangeInput}
          placeholder="Description"
        ></textarea>
        <label>Start Date</label>
        <input
          name="startDate"
          type="date"
          value={inputValue.startDate}
          onChange={onChangeInput}
        ></input>
        <label>End Date</label>
        <input
          name="endDate"
          type="date"
          value={inputValue.endDate}
          onChange={onChangeInput}
        ></input>
        <label>Client</label>
        <input
          name="clientName"
          value={inputValue.clientName}
          onChange={onChangeInput}
          placeholder="Client Name"
        ></input>
        {id ? (
          <div>
            <label>Status</label>
            <select
              name="status"
              onChange={onChangeInput}
              value={inputValue.status ? 'active' : 'inactive'}
            >
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
          </div>
        ) : null}
        <div>
          <Button variant={'cancelButton'} text="Back" onClick={redirect} />
          <Button
            variant={id ? 'editButton' : 'addButton'}
            text={id ? 'Edit' : 'Create'}
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
