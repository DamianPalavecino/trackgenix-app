import { useState, useEffect } from 'react';
import styles from '../super-admins.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Spinner, Input, Select } from 'Components/Shared';
import { useForm } from 'react-hook-form';
import { superAdminSchema } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { getAdminsById, postAdmins, putAdmins } from 'redux/super-admins/thunks';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(superAdminSchema)
  });

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { message, list: admins, isPending } = useSelector((state) => state.superAdmins);
  const idAdmin = params.id;
  const [showModal, setShowModal] = useState({ error: false, success: false });

  useEffect(async () => {
    if (idAdmin) {
      dispatch(getAdminsById(idAdmin));
    }
  }, []);

  useEffect(() => {
    reset({
      name: admins?.name,
      lastName: admins?.lastName,
      email: admins?.email,
      password: admins?.password,
      status: admins?.status
    });
  }, [admins]);

  const redirect = () => {
    history.push('/super-admins');
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = async (data) => {
    if (idAdmin) {
      const response = await dispatch(putAdmins(idAdmin, data));
      if (response.type === 'PUT_ADMINS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_ADMINS_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postAdmins(data));
      if (response.type === 'POST_ADMINS_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'POST_ADMINS_REJECTED') {
        toggleModal('error');
      }
    }
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={message}
        variant="errorModal"
      />
      <Modal
        showModal={showModal.success}
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={message}
        variant="successModal"
      />
      <h2>{idAdmin ? 'Edit' : 'Create'} Admin</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Name"
            register={register}
            error={errors.name?.message}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Last Name"
            register={register}
            error={errors.lastName?.message}
          />
          <Input
            label="Email"
            type="text"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />
          {idAdmin && (
            <Select label="Status" name="status" register={register} optionValue="Status">
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </Select>
          )}
          <div>
            <Button text="Back" onClick={redirect} />
            <Button
              type="submit"
              variant={idAdmin ? 'editButton' : 'addButton'}
              text={idAdmin ? 'Edit' : 'Create'}
            />
          </div>
        </form>
      )}
    </section>
  );
};

export default Form;
