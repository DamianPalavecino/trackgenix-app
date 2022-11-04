import { useState, useEffect } from 'react';
import styles from './admins.module.css';

const params = new URLSearchParams(window.location.search);
const adminId = params.get('id');

const AdminsForm = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    status: false
  });

  useEffect(async () => {
    if (adminId !== null) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`);
        const data = await response.json();
        setInputValue({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password,
          status: data.data.status
        });
      } catch (err) {
        alert('Admin not found');
      }
    }
  }, []);

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    window.location.assign('/admins');
  };

  const onSubmit = () => {
    if (adminId !== null) {
      inputValue.status = inputValue.status === 'active' ? true : false;
      const putOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins/${adminId}`;
      fetch(url, putOptions).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
          const { message } = await response.json();
          alert(message);
        } else {
          alert('Admin updated successfully');
          redirect();
        }
      });
    } else {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputValue.name,
          lastName: inputValue.lastName,
          email: inputValue.email,
          password: inputValue.password,
          status: false
        })
      };
      const url = `${process.env.REACT_APP_API_URL}/admins`;
      fetch(url, postOptions).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
          const { message } = await response.json();
          alert(message);
        } else {
          alert('Admin created successfully');
          redirect();
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <h3>Admin</h3>
      <form>
        <div>
          <div>
            <label>Name</label>
          </div>
          <div>
            <input
              className={styles.formInput}
              type="text"
              name="name"
              value={inputValue.name}
              onChange={onChangeInput}
              placeholder="Name"
            />
          </div>
          <div>
            <label>Last Name</label>
          </div>
          <div>
            <input
              className={styles.formInput}
              type="text"
              name="lastName"
              value={inputValue.lastName}
              onChange={onChangeInput}
              placeholder="Last Name"
            />
          </div>
          <div>
            <label>Email</label>
          </div>
          <div>
            <input
              className={styles.formInput}
              type="text"
              name="email"
              value={inputValue.email}
              onChange={onChangeInput}
              placeholder="Email"
            />
          </div>
          <div>
            <label>Password</label>
          </div>
          <div>
            <input
              className={styles.formInput}
              type="password"
              name="password"
              value={inputValue.password}
              onChange={onChangeInput}
              placeholder="Password"
            />
          </div>
          <div>
            <label>Status</label>
            {adminId ? (
              <select
                name="status"
                onChange={onChangeInput}
                defaultValue={inputValue.status ? 'active' : 'inactive'}
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
              </select>
            ) : (
              <select name="status" onChange={onChangeInput}>
                <option value="inactive">Inactive</option>
              </select>
            )}
          </div>
        </div>
        <div>
          <button type="button" onClick={redirect} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="button" onClick={onSubmit} className={styles.confirmButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminsForm;
