import styles from './modal.module.css';

function Modal({ project, handleDelete, type, showModal, closeModal }) {
  if (!showModal) {
    return null;
  }

  if (type === 'employees') {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          {project.employees.map((employee) => {
            return (
              <tr key={employee.employeeId}>
                <td>{employee.rate}</td>
                <td>{employee.role}</td>
              </tr>
            );
          })}
          <button className={styles.buttonClose} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (type === 'delete') {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <h3>Are you sure?</h3>
          <p>Are you sure that you want to delete {project.name}?</p>
          <button className={styles.buttonClose} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles.buttonConfirm}
            onClick={() => {
              handleDelete(project._id);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
