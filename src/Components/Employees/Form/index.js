import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal/Modal';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import { putEmployee, postEmployee, getByIdEmployees } from '../../../redux/employees/thunks';

const AddEmployee = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    status: false
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
    if (!Array.isArray(employees)) {
      setUserInput({
        name: employees.name,
        lastName: employees.lastName,
        email: employees.email,
        phone: employees.phone,
        password: employees.password,
        status: employees.status
      });
    }
  }, [employees]);

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.push('/employees');
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  const onSubmit = async () => {
    if (idEdit) {
      userInput.status = userInput.status === 'active';
      const response = await dispatch(putEmployee(idEdit, userInput));
      if (response.type === 'PUT_EMPLOYEES_FULFILLED') {
        toggleModal('success');
      } else if (response.type === 'PUT_EMPLOYEES_REJECTED') {
        toggleModal('error');
      }
    } else {
      const response = await dispatch(postEmployee(userInput));
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
        <form className={styles.form}>
          <div className={styles.div}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.input}
              name="name"
              type="text"
              onChange={onChange}
              value={userInput.name || ''}
            ></input>
            <label className={styles.label} htmlFor="lastName">
              Last Name
            </label>
            <input
              className={styles.input}
              name="lastName"
              type="text"
              onChange={onChange}
              value={userInput.lastName || ''}
            ></input>
            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              className={styles.input}
              name="phone"
              type="text"
              onChange={onChange}
              value={userInput.phone || ''}
            ></input>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              name="email"
              type="text"
              onChange={onChange}
              value={userInput.email || ''}
            ></input>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              name="password"
              type="password"
              onChange={onChange}
              value={userInput.password || ''}
            ></input>
            {idEdit ? (
              <>
                <label className={styles.label} htmlFor="status">
                  Status
                </label>
                <select className={styles.select} name="status" onChange={onChange}>
                  <option value="inactive">Inactive</option>
                  <option value="active">Active</option>
                </select>
              </>
            ) : null}
            <div>
              <Button variant={'cancelButton'} text="Back" onClick={redirect} />
              <Button
                variant={idEdit ? 'editButton' : 'addButton'}
                text={idEdit ? 'Edit' : 'Create'}
                onClick={onSubmit}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEmployee;
