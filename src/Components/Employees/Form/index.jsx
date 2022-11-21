import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import { Spinner, Modal, Button, Input, Select } from '../../Shared';
import { getByIdEmployees, postEmployee, putEmployee } from '../../../redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { schema } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const { message, list: employees, isPending } = useSelector((state) => state.employees);
  const idEdit = params.id;
  const [showModal, setShowModal] = useState({ success: false, error: false });

  useEffect(async () => {
    if (idEdit) {
      dispatch(getByIdEmployees(idEdit));
    }
  }, []);

  useEffect(() => {
    reset({
      name: employees?.name,
      lastName: employees?.lastName,
      phone: employees?.phone,
      email: employees?.email,
      password: employees?.password,
      status: employees?.status
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
    if (idEdit) {
      const response = await dispatch(putEmployee(idEdit, data));
      if (response.type === 'PUT_EMPLOYEES_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_EMPLOYEES_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postEmployee(data));
      if (response.type === 'POST_EMPLOYEES_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'POST_EMPLOYEES_REJECTED') {
        toggleModal('error');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>{idEdit ? 'Edit' : 'Create'} Employees</h2>
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
            {idEdit && (
              <Select register={register} label="Status" registerName="status" selectName="status">
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Select>
            )}
            <div>
              <Button variant={'cancelButton'} text="Back" onClick={redirect} />
              <Button
                variant={idEdit ? 'editButton' : 'addButton'}
                text={idEdit ? 'Edit' : 'Create'}
                type="submit"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
