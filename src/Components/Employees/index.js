import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Modal from './Modal';
import Trash from './Icon-awesome-trash.png';
import Edit from './Icon-edit-employee.png';
import Add from './Icon-add-employee.png';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setModal] = useState(false);
  const [showModalEdit, setModalEdit] = useState(false);
  const [showModalToAdd, setModalAdd] = useState(false);
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
    setModalEdit(false);
    setModalAdd(false);
  };

  const employeesToDelete = (evt) => {
    if (evt.target.checked === true) {
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
    setEmployees((current) =>
      current.filter((checkedEmployee) => !checkedEmployees.includes(checkedEmployee._id))
    );

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
      <div className={styles.addBtn}>
        <p>Add employee</p>
        <img
          src={Add}
          onClick={() => {
            setModalAdd(true);
          }}
        />
      </div>
      <p className={styles.successMessage} id="showSuccess"></p>

      <Modal
        title={'Are you sure you want to delete this?'}
        show={showModal}
        closeModal={closeModal}
        confirmChanges={deleteEmployees}
      ></Modal>

      <Modal
        title={'Edit employee'}
        show={showModalEdit}
        confirmChanges={closeModal}
        closeModal={closeModal}
      ></Modal>

      <Modal
        title={'Add employee'}
        show={showModalToAdd}
        confirmChanges={closeModal}
        closeModal={closeModal}
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
              <input
                className={styles.inputCheckbox}
                type="checkbox"
                onChange={employeesToDelete}
                id={employee._id}
              ></input>
              <li className={styles.item}>{employee.name}</li>
              <li className={styles.item}>{employee.lastName}</li>
              <li className={styles.item}>{employee.phone}</li>
              <li className={styles.item}>{employee.email}</li>
              <li className={styles.item}>
                {employee.projects.map((project, i) => {
                  if (project.projectId) {
                    `${i + 1}.${project.projectId.name}`;
                  }
                })}
              </li>
              <li className={styles.item}>{employee.status ? 'Active' : 'Inactive'}</li>
              <img className={styles.editBtn} src={Edit} onClick={() => setModalEdit(true)}></img>
            </ul>
          );
        })}
      </div>
      <img src={Trash} className={styles.deleteBtn} onClick={() => setModal(true)} />
    </section>
  );
}

export default Employees;
