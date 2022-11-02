import { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    status: ''
  });

  useEffect(async () => {
    const param = new URLSearchParams(window.location.search);
    const idAdmin = param.get('id');
    if (idAdmin !== null) {
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
        setTimeout(() => {
          alert('Admin does not exist');
        }, 10);
      }
    }
  }, []);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    window.location.assign('/super-admins');
  };

  const onSubmit = () => {
    const param = new URLSearchParams(window.location.search);
    const idAdmin = param.get('id');
    if (idAdmin !== null) {
      const put = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      };
      console.log(JSON.stringify(input));
      const url = `${process.env.REACT_APP_API_URL}/admins/${idAdmin}`;
      fetch(url, put).then(async (res) => {
        if (res.status !== 200 && res.status !== 201) {
          const { message } = await res.json();
          alert(message);
        } else {
          alert('Admin was succsessfully edited');
          redirect();
        }
      });
    } else {
      const post = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      };
      const url = `${process.env.REACT_APP_API_URL}/admins`;
      fetch(url, post).then(async (res) => {
        if (res.status !== 200 && res.status !== 201) {
          const { message } = await res.json();
          alert(message);
        } else {
          alert('Admin was created successfully');
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
          <input
            className={styles.input}
            type="text"
            name="status"
            value={false}
            defaultValue={input.status}
            onChange={onChangeInput}
          />
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
