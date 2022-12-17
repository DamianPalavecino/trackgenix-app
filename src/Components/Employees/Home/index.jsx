import { useSelector } from 'react-redux';
import { Spinner } from 'Components/Shared';
import styles from './home.module.css';

const EmployeeHome = () => {
  const { data: employee } = useSelector((state) => state.auth);
  const { isPending } = useSelector((state) => state.employees);

  return (
    <div className={styles.container}>
      {isPending ? (
        <Spinner />
      ) : (
        <div>
          <h2>Welcome {employee.name || 'Employee'}</h2>
        </div>
      )}
    </div>
  );
};

export default EmployeeHome;
