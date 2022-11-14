import styles from './spinner.module.css';

const Spinner = ({ entity }) => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
      <h2>Loading {entity}</h2>
    </div>
  );
};

export default Spinner;
