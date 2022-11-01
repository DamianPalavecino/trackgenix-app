import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Are you sure?</p>
        <p>Do you really want to delete admin: {props.admin.email}</p>
        <p>This process cannot be undone</p>
        <button className={styles.cancel} onClick={props.modalClose}>
          Cancel
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            props.handleDelete(props.admin._id);
            props.modalClose;
            alert(`Admin ${props.admin.email} was successfully deleted`);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;

// onClick={() => handleDelete(admin._id)}
