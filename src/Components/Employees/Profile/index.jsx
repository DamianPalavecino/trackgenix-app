import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { Spinner, Modal, Button, Input } from 'Components/Shared';
import { getByIdEmployees, putEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
// import { joiResolver } from '@hookform/resolvers/joi';

const Profile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange'
  });

  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { message, list: employees, isPending } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState({ success: false, error: false });

  useEffect(async () => {
    if (id) {
      dispatch(getByIdEmployees(id));
    }
  }, []);

  useEffect(() => {
    reset({
      name: employees?.name,
      lastName: employees?.lastName,
      phone: employees?.phone,
      email: employees?.email,
      password: employees?.password
    });
  }, [employees]);

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
    const response = await dispatch(putEmployee(id, data));
    if (response.type === 'PUT_EMPLOYEES_FULFILLED') {
      toggleModal('success');
    } else if (response.type === 'PUT_EMPLOYEES_REJECTED') {
      toggleModal('error');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <Modal
        showModal={showModal.success}
        variant="successModal"
        closeModal={() => {
          toggleModal('success');
          redirect();
        }}
        text={message}
      ></Modal>
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={message}
        variant="errorModal"
      ></Modal>
      {isPending ? (
        <Spinner />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.div}>
            <Input
              name="name"
              type="text"
              register={register}
              label="Name"
              error={errors.name?.message}
            />
            <Input
              name="lastName"
              type="text"
              register={register}
              label="Last Name"
              error={errors.lastName?.message}
            />
            <Input
              name="phone"
              type="text"
              register={register}
              label="Phone"
              error={errors.phone?.message}
            />
            <Input
              name="email"
              type="text"
              register={register}
              label="Email"
              error={errors.email?.message}
            />
            <Input
              name="password"
              type="password"
              register={register}
              label="Password"
              error={errors.password?.message}
            />
            <div>
              <Button variant={'cancelButton'} text="Back" onClick={redirect} />
              <Button variant="editButton" text="Edit" type="submit" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
