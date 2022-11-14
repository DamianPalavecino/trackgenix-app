import { useEffect } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';

const Employees = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <Table data={list} headers={['name', 'lastName', 'phone', 'email', 'password', 'status']} />
    </section>
  );
};

export default Employees;
