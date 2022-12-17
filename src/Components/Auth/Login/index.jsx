import { Input, Button, Modal } from 'Components/Shared';
import { React, useState } from 'react';
import styles from './login.module.css';
import { useForm } from 'react-hook-form';
import { schema } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/thunks';
import { LOGIN_FULFILLED, LOGIN_REJECTED } from 'redux/auth/constants';
import { useHistory } from 'react-router-dom';
import { getUserProfile } from 'redux/auth/thunks';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });
  const [showModal, setShowModal] = useState({
    success: false,
    error: false
  });

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(login(data)).then((data) => {
      if (data.type === LOGIN_FULFILLED) {
        dispatch(getUserProfile());
        if (data.payload === 'SUPER_ADMIN') {
          history.push('/super-admins');
        } else if (data.payload === 'ADMIN') {
          history.push('/admin/employees');
        } else {
          history.push('/employee/home');
        }
      } else if (data.type === LOGIN_REJECTED) {
        toggleModal('error');
      }
    });
  };

  return (
    <div className={styles.container}>
      <Modal
        showModal={showModal.error}
        closeModal={() => toggleModal('error')}
        text={'Wrong email or password'}
        variant={'errorModal'}
      />
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} name="email" placeholder="Email" error={errors.email?.message} />
        <Input
          register={register}
          type="password"
          name="password"
          placeholder="Password"
          error={errors.password?.message}
        />
        <Button variant="addButton" type="submit" text="Sign In" />
      </form>
    </div>
  );
};

export default Login;
