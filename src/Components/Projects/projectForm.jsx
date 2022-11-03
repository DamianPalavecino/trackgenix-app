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
    employees: []
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
            clientName: data.data.clientName
          })
        );
    }
  }, []);

  const onChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const redirect = () => {
    window.location.assign('/projects');
  };

  const onSubmit = () => {
    if (id) {
      const put = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
      };
      fetch(url + '/' + id, put).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
          const { message } = await response.json();
          alert(message);
        } else {
          alert('Project was successfully edited');
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
      fetch(url, post).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
          const { message } = await response.json();
          alert(message);
        } else {
          alert('Project was created successfully');
          redirect();
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Project</h2>
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
        {id ? (
          <>
            <table className={styles.table}>
              <caption>Employees</caption>
              <tr>
                <th>Rate</th>
                <th>Role</th>
              </tr>
              {/* {inputValue.employees.map((employee) => {
                return (
                  <tr key={employee.employeeId}>
                    <td>{employee.role}</td>
                    <td>{employee.rate}</td>
                  </tr>
                );
              })} */}
            </table>
          </>
        ) : null}
        <div>
          <button className={styles.button} onClick={redirect}>
            Back
          </button>
          <button className={styles.button} onClick={onSubmit}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
