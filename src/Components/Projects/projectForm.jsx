import { useState, useEffect } from 'react';
import styles from './projectForm.module.css';
import Modal from '../Shared/Modal/Modal';
import Button from '../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postProjects, putProjects, getProjectById } from '../../redux/projects/thunks';
import Spinner from '../Shared/Spinner';

const ProjectForm = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { message, list: projectData, isPending } = useSelector((state) => state.projects);
  const id = params.id;
  const [showModal, setShowModal] = useState({ success: false, error: false });
  const [inputValue, setInputValue] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    clientName: '',
    status: false
  });

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id));
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(projectData)) {
      setInputValue({
        name: projectData.name,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        description: projectData.description,
        clientName: projectData.clientName,
        status: false
      });
    }
  }, [projectData]);

  const redirect = () => {
    history.goBack();
  };

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (id) {
      inputValue.status = inputValue.status === 'active';
      const response = await dispatch(putProjects(id, inputValue));
      if (response.type === 'PUT_PROJECTS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_PROJECTS_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postProjects(inputValue));
      if (response.type === 'POST_PROJECTS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'POST_PROJECTS_REJECTED') {
        toggleModal('error');
      }
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
      {isPending ? (
        <Spinner entity="Project" />
      ) : (
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
      )}
    </div>
  );
};

export default ProjectForm;
