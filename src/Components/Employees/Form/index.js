import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal/Modal';
import styles from './form.module.css';

const AddEmployee = () => {
  const params = useParams();
  const history = useHistory();
  const idEdit = params.id;
  const url = `${process.env.REACT_APP_API_URL}/employees/`;
  const [showModal, setShowModal] = useState({ success: false, error: false });
  const [message, setMessage] = useState('');

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

  if (idEdit) {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${idEdit}`)
        .then((response) => response.json())
        .then((response) => {
          setUserInput({
            name: response.data.name,
            lastName: response.data.lastName,
            email: response.data.email,
            phone: response.data.phone,
            password: response.data.password,
            status: response.data.status
          });
        });
    }, []);
  }

  const editEmployee = async () => {
    const urlEdit = `${process.env.REACT_APP_API_URL}/employees/${idEdit}`;
    userInput.status = userInput.status === 'active';
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };
    try {
      const response = await fetch(urlEdit, options);
      const { message, error } = await response.json();
      setMessage(message);
      if (!error) {
        toggleModal('success');
      } else {
        toggleModal('error');
      }
    } catch (error) {
      alert('Error');
    }
  };

  const addEmployee = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };
    try {
      const response = await fetch(url, options);
      const { message, error } = await response.json();
      setMessage(message);
      if (!error) {
        toggleModal('success');
      } else {
        toggleModal('error');
      }
    } catch (error) {
      alert('Error');
    }
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
              onClick={idEdit ? editEmployee : addEmployee}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
