import React, { useState, useEffect } from 'react';
import style from '../employees.module.css';

const AddEmployee = () => {
  const url = `${process.env.REACT_APP_API_URL}/employees/`;

  const redirect = () => {
    window.location.assign('/employees');
  };

  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    status: false
  });
  const params = new URLSearchParams(document.location.search);
  const idEdit = params.get('id');

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
    userInput.status = userInput.status === 'active' ? true : false;
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };
    try {
      const response = await fetch(urlEdit, options);
      const data = await response.json();
      alert('Employee edited', data.message);
      redirect();
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
      const data = await response.json();
      alert('Employee added', data.message);
      redirect();
    } catch (error) {
      alert('Error');
    }
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.containerForm}>
      <form className={style.items}>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" onChange={onChange} value={userInput.name || ''}></input>
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          type="text"
          onChange={onChange}
          value={userInput.lastName || ''}
        ></input>
        <label htmlFor="phone">Phone</label>
        <input name="phone" type="text" onChange={onChange} value={userInput.phone || ''}></input>
        <label htmlFor="email">Email</label>
        <input name="email" type="text" onChange={onChange} value={userInput.email || ''}></input>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          onChange={onChange}
          value={userInput.password || ''}
        ></input>
        <label htmlFor="status">Status</label>
        {idEdit ? (
          <select name="status" onChange={onChange}>
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
          </select>
        ) : (
          <select>
            <option name="inactive">Inactive</option>
          </select>
        )}
        <button
          className={style.doneBtn}
          type="button"
          value="Submit"
          onClick={idEdit ? editEmployee : addEmployee}
        >
          Done
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
