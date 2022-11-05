import styles from './projectForm.module.css';

const ProjectForm = () => {
  return (
    <div className={styles.container}>
      <h2>Add New Project</h2>
      <form className={styles.form}>
        <label>Project Name</label>
        <input></input>
        <label>Description</label>
        <input></input>
        <label>Start Date</label>
        <input></input>
        <label>End Date</label>
        <input></input>
        <div>
          <button className={styles.button}>Back</button>
          <button className={styles.button}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
