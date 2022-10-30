import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <button onClick={props.closeModal}>Close</button>
        <button
          onClick={() => {
            props.handleDelete(props.tasks[0]._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
