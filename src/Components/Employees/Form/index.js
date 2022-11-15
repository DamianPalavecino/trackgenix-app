import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal/Modal';
import styles from './form.module.css';
import { editEmployee, postEmployee, getByIdEmployees } from '../../../redux/employees/thunks';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const idEdit = params.id;
  const [showModal, setShowModal] = useState({ success: false, error: false });
  const { message, status, request, list } = useSelector((state) => state.employees);
  const redirect = () => {
    history.goBack();
  };

  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    status: false
  });

  useEffect(async () => {
    if (idEdit) {
      dispatch(getByIdEmployees(idEdit));
    }
  }, []);

  useEffect(() => {
    if (request === 'GETBYID') {
      setUserInput({
        name: list.name,
        lastName: list.lastName,
        email: list.email,
        phone: list.phone,
        password: list.password,
        status: list.status
      });
    }
  }, [list]);

  useEffect(() => {
    if (request === 'POST' || request === 'PUT') {
      toggleModal(status);
    }
  }, [status]);

  const edit = () => {
    userInput.status = userInput.status === 'active';
    dispatch(editEmployee(idEdit, userInput));
  };

  const addEmployee = () => {
    dispatch(postEmployee(userInput));
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const toggleModal = (modal) => {
    setShowModal({
      ...showModal,
      [modal]: !showModal[modal]
    });
  };

  return (
    <div className={styles.container}>
      <h2>{idEdit ? 'Edit' : 'Create'} Employees</h2>
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
              onClick={idEdit ? edit : addEmployee}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
