import styles from './modal-delete.module.css';

const Modal = ({ task, closeModal, showModal, handleDelete }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Are you sure?</h3>
        <p>Are you going to delete task {task.description}. Please confirm</p>
        <button className={styles.buttonClose} onClick={closeModal}>
          Cancel
        </button>
        <button
          className={styles.buttonConfirm}
          onClick={() => {
            handleDelete(task._id);
            closeModal;
            setTimeout(function () {
              alert(`${task.description} deleted successfully!`);
            }, 200);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
