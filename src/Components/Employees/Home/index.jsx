import { useSelector } from 'react-redux';
import { Spinner } from 'Components/Shared';
import styles from './home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';

const EmployeeHome = () => {
  const { data: employee, isPending } = useSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      {isPending ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h2>Welcome to your profile!</h2>
          <FontAwesomeIcon icon={faUser} className={styles.awesomeIcon} />
          <div className={styles.dataContainer}>
            <div className={styles.awesomeData}>
              <FontAwesomeIcon icon={faEnvelope} />
              <p className={styles.spaceData}>{employee?.email}</p>
            </div>
            <div className={styles.capitalizeData}>
              <FontAwesomeIcon icon={faUser} />
              <p className={styles.spaceData}>
                {employee?.name} {employee?.lastName}
              </p>
            </div>
            <div className={styles.awesomeData}>
              <FontAwesomeIcon icon={faPhone} />
              <p className={styles.spaceData}>{employee?.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeHome;
