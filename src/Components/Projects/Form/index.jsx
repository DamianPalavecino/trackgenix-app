import { useEffect, useState } from 'react';
import styles from './projectForm.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById, putProjects, postProjects } from 'redux/projects/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Input, Spinner, Button, Modal, Select } from 'Components/Shared';
import { projectSchema } from './validations';

const ProjectForm = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { message, isPending, list: projectData } = useSelector((state) => state.projects);
  const id = params.id;
  const [showModal, setShowModal] = useState({ success: false, error: false });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(projectSchema)
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
    reset({
      name: projectData?.name,
      description: projectData?.description,
      startDate: projectData?.startDate,
      endDate: projectData?.endDate,
      clientName: projectData?.clientName,
      status: projectData?.status
    });
  }, [projectData]);

  const redirect = () => {
    history.goBack();
  };

  const onSubmit = async (data) => {
    if (id) {
      const response = await dispatch(putProjects(id, data));
      if (response.type === 'PUT_PROJECTS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_PROJECTS_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postProjects(data));
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Project Name"
            register={register}
            label="Project Name"
            name="name"
            type="text"
            error={errors.name?.message}
          />
          <Input
            placeholder="Description"
            register={register}
            label="Description"
            name="description"
            type="text"
            error={errors.description?.message}
          />
          <Input
            register={register}
            label="Start Date"
            name="startDate"
            type="date"
            error={errors.startDate?.message}
          />
          <Input
            register={register}
            label="End Date"
            name="endDate"
            type="date"
            error={errors.endDate?.message}
          />
          <Input
            placeholder="Client Name"
            register={register}
            label="Client Name"
            name="clientName"
            type="text"
            error={errors.clientName?.message}
          />
          {id && (
            <Select label="Status" name="status" optionValue="Status" register={register}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </Select>
          )}
          <div>
            <Button variant={'cancelButton'} text="Back" onClick={redirect} />
            <Button
              type="submit"
              variant={id ? 'editButton' : 'addButton'}
              text={id ? 'Edit' : 'Create'}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectForm;
