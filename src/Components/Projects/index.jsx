import { useEffect, useState } from 'react';
import Modal from './modal';
import styles from './projects.module.css';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, changeModalType] = useState('');
  const [modalObject, setModalObject] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    saveProjects(projects.filter((project) => project._id !== id));
    closeModal();
    setTimeout(() => {
      openModal({}, 'success');
    }, '500');
  };

  const openModal = (obj, type) => {
    setModalObject(obj);
    changeModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <h2>Projects</h2>
      <a href="/projects/form">
        <button>Add new Project</button>
      </a>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Client</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <Modal
            project={modalObject}
            handleDelete={handleDelete}
            type={modalType}
            showModal={showModal}
            closeModal={closeModal}
          />
          {projects && projects.length > 0 ? (
            projects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.status ? 'Active' : 'Inactive'}</td>
                  <td>{project.clientName}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => {
                        openModal(project, 'employees');
                      }}
                    >
                      Employees
                    </button>
                  </td>
                  <button
                    className={styles.actionsButton}
                    onClick={() => {
                      openModal(project, 'delete');
                    }}
                  >
                    Delete
                  </button>
                  <a href={`projects/form?id=${project._id}`}>
                    <button className={styles.actionsButton}>Edit</button>
                  </a>
                </tr>
              );
            })
          ) : (
            <p>There are no projects</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
