import { useEffect } from 'react';
import styles from './home.module.css';
import { Table, Spinner } from 'Components/Shared';
import { getByIdEmployees } from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const HomeEmployees = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { list: employee, isPending } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getByIdEmployees(id));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Current Projects</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <Table
          headers={['name', 'startDate', 'endDate', 'description', 'clientName']}
          data={employee.projects}
        />
      )}
    </div>
  );
};

export default HomeEmployees;
