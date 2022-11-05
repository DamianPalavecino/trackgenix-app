import { useState, useEffect } from 'react';
import styles from './projectForm.module.css';

const ProjectForm = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const url = `${process.env.REACT_APP_API_URL}/projects`;
  const [inputValue, setInputValue] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    clientName: '',
    status: false
  });

  const fixDate = (date) => {
    return date.slice(0, 10);
  };

  useEffect(async () => {
    if (id) {
      fetch(url + '/' + id)
        .then((res) => res.json())
        .then((data) =>
          setInputValue({
            name: data.data.name,
            startDate: fixDate(data.data.startDate),
            endDate: fixDate(data.data.endDate),
            description: data.data.description,
            clientName: data.data.clientName,
            status: data.data.status
          })
        );
    }
  }, []);

  const redirect = () => {
    window.location.assign('/projects');
  };

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (id) {
      inputValue.status = inputValue.status === 'active';
      const put = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      fetch(url + '/' + id, put).then(async (response) => {
        const { message } = await response.json();
        if (response.status !== 200 && response.status !== 201) {
          alert(message);
        } else {
          alert(message);
          redirect();
        }
      });
    } else {
      const post = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      fetch(`${process.env.REACT_APP_API_URL}/projects`, post).then(async (response) => {
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
      <form className={styles.form}>
        <label>Project Name</label>
        <input name="name" defaultValue={inputValue.name} onChange={onChangeInput}></input>
        <label>Description</label>
        <textarea
          name="description"
          defaultValue={inputValue.description}
          onChange={onChangeInput}
        ></textarea>
        <label>Start Date</label>
        <input
          name="startDate"
          type="date"
          defaultValue={inputValue.startDate}
          onChange={onChangeInput}
        ></input>
        <label>End Date</label>
        <input
          name="endDate"
          type="date"
          defaultValue={inputValue.endDate}
          onChange={onChangeInput}
        ></input>
        <label>Client</label>
        <input
          name="clientName"
          defaultValue={inputValue.clientName}
          onChange={onChangeInput}
        ></input>
        <label>Status</label>
        {id ? (
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
            <option selected value="inactive">
              Inactive
            </option>
          </select>
        )}
        <div>
          <button type="button" className={styles.button} onClick={redirect}>
            Back
          </button>
          <button type="button" className={styles.button} onClick={onSubmit}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
