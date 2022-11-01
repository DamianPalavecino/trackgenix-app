import styles from './modal-delete.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Are you sure?</h3>
        <p>Are you going to delete task {props.task.description}. Please confirm</p>
        <button className={styles.buttonClose} onClick={props.closeModal}>
          Cancel
        </button>
        <button
          className={styles.buttonConfirm}
          onClick={() => {
            props.handleDelete(props.task._id);
            props.closeModal;
            setTimeout(function () {
              alert(`${props.task.description} deleted successfully!`);
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
