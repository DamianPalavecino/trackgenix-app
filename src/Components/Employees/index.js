import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from './Modal';
import Trash from './Icon-awesome-trash.png';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setModal] = useState(false);
  const [checkedEmployees, setCheckedEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);

  const showSuccesMessage = () => {
    const element = document.getElementById('showSuccess');
    element.innerHTML = 'Employee(s) deleted';
    setTimeout(() => {
      element.innerHTML = '';
    }, 1500);
  };

  const closeModal = () => {
    setModal(false);
  };

  const employeesToDelete = (evt) => {
    if (evt.target.checked == true) {
      setCheckedEmployees((current) => [...current, evt.target.id]);
    } else {
      setCheckedEmployees((current) => current.filter((employee) => employee !== evt.target.id));
    }
  };

  const deleteEmployees = () => {
    setModal(false);

    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };
    setModal(false);
    setEmployees((current) => current.filter((x) => !checkedEmployees.includes(x._id)));

    showSuccesMessage();

    checkedEmployees.forEach((employeeId) => {
      const url = `${process.env.REACT_APP_API_URL}/employees/${employeeId}`;

      fetch(url, options).then(async (response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      });
    });
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <p className={styles.successMessage} id="showSuccess"></p>

      <Modal
        title={'Are you sure you want to delete this?'}
        show={showModal}
        closeModal={closeModal}
        confirmChanges={deleteEmployees}
      ></Modal>

      <div className={styles.employees}>
        <ul className={styles.header}>
          <li>Name</li>
          <li>Last Name</li>
          <li>Phone</li>
          <li>Email</li>
          <li>Projects</li>
          <li>Status</li>
          <li>Actions</li>
        </ul>
        {employees.map((employee) => {
          return (
            <ul className={styles.list} key={employee._id}>
              <input type="checkbox" onChange={employeesToDelete} id={employee._id}></input>
              <li className={styles.item}>{employee.name}</li>
              <li className={styles.item}>{employee.lastName}</li>
              <li className={styles.item}>{employee.phone}</li>
              <li className={styles.item}>{employee.email}</li>
              <li className={styles.item}>
                {employee.projects.map((project, i) => {
                  if (project.projectId !== null) {
                    `${i + 1}.${project.projectId.name}`;
                  }
                })}
              </li>
              <li className={styles.item}>{employee.status ? 'Active' : 'Inactive'}</li>
            </ul>
          );
        })}
      </div>
      <img src={Trash} className={styles.deleteBtn} onClick={() => setModal(true)} />
    </section>
  );
}

export default Employees;
