import styles from './home.module.css';
import { Table, Spinner } from 'Components/Shared';
import { useSelector } from 'react-redux';

const HomeEmployees = () => {
  const { data: employee } = useSelector((state) => state.auth);
  const { isPending } = useSelector((state) => state.employees);

  return (
    <div className={styles.container}>
      <h2>Welcome Employee</h2>
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

export default HomeEmployees;
