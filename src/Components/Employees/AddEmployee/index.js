import React, { useState } from 'react';

const AddEmployee = () => {
  const url = `${process.env.REACT_APP_API_URL}/employees/`;

  const addEmployee = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userInput)
    };

    fetch((url, options)).then(async (response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      alert('Employee added');
      return response.json();
    });
  };

  const [userInput, setUserInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    projectStatus: 'Inactive'
  });

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEmployee(userInput);
    setUserInput({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      projectStatus: 'Inactive'
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" onChange={onChange} value={userInput.name}></input>
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" type="text" onChange={onChange} value={userInput.lastName}></input>
        <label htmlFor="phone">Phone</label>
        <input name="phone" type="text" onChange={onChange} value={userInput.phone}></input>
        <label htmlFor="email">Email</label>
        <input name="email" type="text" onChange={onChange} value={userInput.email}></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default AddEmployee;
