import { useEffect } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';
import Spinner from '../Shared/Spinner';

const Employees = () => {
  const dispatch = useDispatch();
  const { list, isPending, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  if (error) {
    return (
      <div className={styles.container}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      {isPending ? (
        <Spinner entity="Employees" />
      ) : (
        <Table data={list} headers={['name', 'lastName', 'phone', 'email', 'password', 'status']} />
      )}
    </section>
  );
};

export default Employees;
