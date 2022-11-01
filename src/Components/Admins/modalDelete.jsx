import React from 'react';
import styles from './modal-delete.module.css';

const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.confirmationModal}>
        <h3>Confirm delete</h3>
        <p>Are you sure you want to delete?</p>
        <button className={styles.buttonClose} onClick={props.closeModal}>
          Cancel
        </button>
        <button
          className={styles.buttonConfirm}
          onClick={() => {
            props.deleteAdmin(props.admin._id);
            props.closeModal;
            alert('Deleted successfully!');
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
