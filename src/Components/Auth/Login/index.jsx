import { Input, Button } from 'Components/Shared';
import { React } from 'react';
import styles from './login.module.css';
import { useForm } from 'react-hook-form';
import { schema } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { login, getUserProfile } from 'redux/auth/thunks';
import { LOGIN_FULFILLED } from 'redux/auth/constants';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { error } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  // const { data: userData } = useSelector((store) => store.auth);

  // useEffect(() => {
  //   if (userData?._id) {
  //     history.push(`/employee/profile/${userData?._id}`);
  //   }
  // }, [userData]);

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (Object.values(errors).length === 0) {
      dispatch(login(data)).then((data) => {
        if (data.type === LOGIN_FULFILLED) {
          dispatch(getUserProfile());
          if (data.payload.role === 'SUPER_ADMIN') {
            history.push('/super-admins');
          } else if (data.payload.role === 'ADMIN') {
            history.push('/admin/employees');
          } else {
            history.push('/employee/home');
          }
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {error && <div className={styles.errorContainer}>{error}</div>}
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
