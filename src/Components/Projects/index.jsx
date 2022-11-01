import { useEffect, useState } from 'react';
import Modal from './modal';
import styles from './projects.module.css';

function Projects() {
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
    saveProjects(projects.filter((projects) => projects._id !== id));
    closeModal();
    setTimeout(() => {
      alert('Project deleted successfully');
    }, '1000');
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
      <button>Add new Project</button>
      {projects === undefined || projects.length === 0 ? (
        <p>There are no projects</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Client</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <Modal
              project={modalObject}
              handleDelete={handleDelete}
              type={modalType}
              showModal={showModal}
              closeModal={closeModal}
            />
            {projects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.status ? 'Active' : 'Inactive'}</td>
                  <td>{project.clientName}</td>
                  <button
                    onClick={() => {
                      openModal(project, 'delete');
                    }}
                  >
                    Delete
                  </button>
                  <button>Edit</button>
                  <button
                    onClick={() => {
                      openModal(project, 'employees');
                    }}
                  >
                    See Employees
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Projects;
