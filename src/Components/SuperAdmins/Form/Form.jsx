import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    status: ''
  });

  const history = useHistory();
  const params = useParams();
  const idAdmin = params.id;

  useEffect(async () => {
    if (idAdmin) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admins/${idAdmin}`);
        const data = await res.json();
        setInput({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password,
          status: data.data.status
        });
      } catch (error) {
        alert('Admin does not exist');
      }
    }
  }, []);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    history.push('/super-admins');
  };

  const onSubmit = () => {
    if (idAdmin) {
      input.status = input.status === 'active' ? true : false;
      const put = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins/${idAdmin}`;
      fetch(url, put).then(async (res) => {
        const { message } = await res.json();
        if (res.status !== 200 && res.status !== 201) {
          alert(message);
        } else {
          alert(message);
          redirect();
        }
      });
    } else {
      input.status = false;
      const post = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins`;
      fetch(url, post).then(async (res) => {
        const { message } = await res.json();
        if (res.status !== 200 && res.status !== 201) {
          alert(message);
        } else {
          alert(message);
          redirect();
        }
      });
    }
  };

  return (
    <section>
      <h2>Edit Admin</h2>
      <form className={styles.form}>
        <div className={styles.div}>
          <label>First Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            defaultValue={input.name}
            onChange={onChangeInput}
          />
          <label>Last Name</label>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            defaultValue={input.lastName}
            onChange={onChangeInput}
          />
          <label>Email</label>
          <input
            className={styles.input}
            type="text"
            name="email"
            defaultValue={input.email}
            onChange={onChangeInput}
          />
          <label>Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            defaultValue={input.password}
            onChange={onChangeInput}
          />
          <label>Status</label>
          {idAdmin ? (
            <select name="status" onChange={onChangeInput}>
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
          ) : (
            <select name="status" onChange={onChangeInput}>
              <option value="inactive">Inactive</option>
            </select>
          )}
          <div>
            <button type="button" onClick={redirect} className={styles.cancel}>
              cancel
            </button>
            <button type="button" onClick={onSubmit} className={styles.save}>
              save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
