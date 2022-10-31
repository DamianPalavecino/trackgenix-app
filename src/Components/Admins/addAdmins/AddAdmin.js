import React, { useState } from 'react';
import styles from './AddAdmin.module.css';

const AddAdmin = ({ addAdmin }) => {
  const [adminInput, setAdminInput] = useState({
    name: '',
    username: '',
    email: '',
    phone: ''
  });

  // eslint-disable-next-line no-unused-vars
  const onChange = (e) => {
    setAdminInput({ ...adminInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addAdmin(adminInput);
    setAdminInput({
      name: '',
      username: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add new Admin</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="Name" value={adminInput.name} onChange={onChange} />
          <label>Last Name</label>
          <input type="text" name="Last Name" value={adminInput.lastName} onChange={onChange} />
          <label>Email</label>
          <input type="text" name="Email" value={adminInput.email} onChange={onChange} />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
