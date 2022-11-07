import styles from './modal.module.css';

const Modal = ({ children, variant = 'modal', showModal, closeModal, text, title }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles[variant]}>
        <button className={styles.closeButton} onClick={closeModal}>
          X
        </button>
        {title ? <h3>{title}</h3> : null}
        <p>{text}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
