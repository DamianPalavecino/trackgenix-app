import { useEffect, useState } from 'react';
import styles from './projects.module.css';

function Projects() {
  const [projects, saveProjects] = useState([]);

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
  };

  return (
    <div className={styles.container}>
      <h2>Projects</h2>
      <button>Create</button>
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
            {projects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.status ? 'Active' : 'Inactive'}</td>
                  <td>{project.clientName}</td>
                  <button onClick={() => handleDelete(project._id)}>Delete</button>
                  <button>Edit</button>
                  <button>Employees</button>
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
