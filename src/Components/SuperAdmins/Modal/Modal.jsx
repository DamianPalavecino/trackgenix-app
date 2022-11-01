import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Are you sure?</p>
        <p>Do you really want to delete admin: {props.admins.email}</p>
        <p>This process cannot be undone</p>
        <button className={styles.cancel} onClick={props.modalClose}>
          Cancel
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            props.handleDelete(props.admins._id);
            props.modalClose;
            alert(`Admin ${props.admins.email} was successfully deleted`);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
