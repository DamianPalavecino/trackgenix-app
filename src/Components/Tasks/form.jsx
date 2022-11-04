import { useState, useEffect } from 'react';
import styles from './tasks.module.css';

const Form = () => {
  const [inputValue, setInputValue] = useState({
    description: ''
  });

  const params = new URLSearchParams(window.location.search);
  const taskId = params.get('id');

  useEffect(async () => {
    if (taskId !== null) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
        const data = await response.json();
        setInputValue({
          description: data.data.description
        });
      } catch (err) {
        alert('There is no task with id provided');
      }
    }
  }, []);

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    window.location.assign('/tasks');
  };

  const onSubmit = () => {
    if (taskId !== null) {
      const putOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      const url = `${process.env.REACT_APP_API_URL}/tasks/${taskId}`;
      fetch(url, putOptions).then(async (response) => {
        const { message } = await response.json();
        if (response.status !== 200 && response.status !== 201) {
          alert(message);
        } else {
          alert(message);
          redirect();
        }
      });
    } else {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      const url = `${process.env.REACT_APP_API_URL}/tasks`;
      fetch(url, postOptions).then(async (response) => {
        const { message } = await response.json();
        if (response.status !== 200 && response.status !== 201) {
          alert(message);
        } else {
          alert(message);
          redirect();
        }
      });
    }
  };
  return (
    <div className={styles.container}>
      <h3>Tasks</h3>
      <form>
        <div>
          <div>
            <label>Description</label>
          </div>
          <div>
            <input
              className={styles.formInput}
              type="text"
              name="description"
              value={inputValue.description}
              onChange={onChangeInput}
              placeholder="Task name"
            />
          </div>
        </div>
        <div>
          <button type="button" onClick={redirect} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="button" onClick={onSubmit} className={styles.confirmButton}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
