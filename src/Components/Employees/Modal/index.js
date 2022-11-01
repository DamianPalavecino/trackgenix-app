import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Modal</h3>
        <p>{props.title}</p>
        <button onClick={props.confirmChanges}>Yes</button>
        <button onClick={props.closeModal}>No</button>
      </div>
    </div>
  );
}

export default Modal;
