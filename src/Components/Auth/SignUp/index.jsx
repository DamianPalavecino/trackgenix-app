import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Input } from 'Components/Shared';
import { postEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { schema } from './validations';
import styles from './signup.module.css';
import Layout from 'Components/Layout';
import { joiResolver } from '@hookform/resolvers/joi';

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState({ success: false, error: false });

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = async (data) => {
    const response = await dispatch(postEmployee(data));
    if (response.type === 'POST_EMPLOYEES_FULFILLED') {
      toggleModal('success');
    } else if (response.type === 'POST_EMPLOYEES_REJECTED') {
      toggleModal('error');
    }
  };

  const redirect = () => {
    history.goBack();
  };

  return (
    <Layout
      routes={[
        { name: 'Login', path: '/auth/login' },
        { name: 'Home', path: '/' }
      ]}
    >
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <Modal
          showModal={showModal.success}
          variant="successModal"
          closeModal={() => {
            toggleModal('success');
            redirect();
          }}
          text={'You have signed up successfully'}
        ></Modal>
        <Modal
          showModal={showModal.error}
          closeModal={() => toggleModal('error')}
          text={message}
          variant="errorModal"
        ></Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button variant="cancelButton" text="Back" onClick={redirect} />
            <Button variant="addButton" text="Sign Up" type="submit" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
