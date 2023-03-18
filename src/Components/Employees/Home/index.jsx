import { useSelector } from 'react-redux';
import { Spinner } from 'Components/Shared';
import styles from './home.module.css';

const EmployeeHome = () => {
  const { data: employee, isPending } = useSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      {isPending ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h2>Welcome to your profile!</h2>
          Icon
          <div className={styles.dataContainer}>
            <div className={styles.awesomeData}>
              Icon
              <p className={styles.spaceData}>{employee?.email}</p>
            </div>
            <div className={styles.capitalizeData}>
              Icon
              <p className={styles.spaceData}>
                {employee?.name} {employee?.lastName}
              </p>
            </div>
            <div className={styles.awesomeData}>
              Icon
              <p className={styles.spaceData}>{employee?.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeHome;
