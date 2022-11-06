import styles from './modal.module.css';

const Modal = ({ project, handleDelete, type, showModal, closeModal }) => {
  if (!showModal) {
    return null;
  }

  if (type === 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.successModal}>
          <h3>Project deleted succesfully</h3>
          <button className={styles.buttonOk} onClick={closeModal}>
            OK
          </button>
        </div>
      </div>
    );
  }

  if (type === 'employees') {
    return (
      <div className={styles.container}>
        <div className={styles.employeeModal}>
          <h3>Employee List</h3>
          {project.employees.length > 0 ? (
            <>
              <tr>
                <td>Rate</td>
                <td>Role</td>
              </tr>
              {project.employees.map((employee) => {
                return (
                  <tr key={employee.employeeId}>
                    <td>{employee.rate}</td>
                    <td>{employee.role}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <h4>There are no employees assigned to this project</h4>
          )}
          <button className={styles.buttonClose} onClick={closeModal}>
            Done
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
};

export default Modal;
