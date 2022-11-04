import styles from './modal.module.css';

const Modal = ({ showModal, admins, modalClose, handleDelete }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>Are you sure?</p>
        <p>Do you really want to delete admin: {admins.email}</p>
        <p>This process cannot be undone</p>
        <button className={styles.cancel} onClick={modalClose}>
          Cancel
        </button>
        <button
          className={styles.delete}
          onClick={() => {
            handleDelete(admins._id);
            modalClose;
            alert(`Admin ${admins.email} was successfully deleted`);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Modal;
