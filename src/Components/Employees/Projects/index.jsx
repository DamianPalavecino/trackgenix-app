import styles from './projects.module.css';
import { Table, Spinner } from 'Components/Shared';
import { useSelector } from 'react-redux';

const EmployeeProjects = () => {
  const { data: employee } = useSelector((state) => state.auth);
  const { isPending } = useSelector((state) => state.employees);

  return (
    <div className={styles.container}>
      <h2>Current Projects</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <Table
          headers={['name', 'startDate', 'endDate', 'description', 'clientName']}
          data={employee?.projects}
        />
      )}
    </div>
  );
};

export default EmployeeProjects;
