import { useEffect, useState } from 'react';
import styles from './employees.module.css';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        {employees.map((employee) => {
          return <div key={employee._id}>{employee.name}</div>;
        })}
      </div>
    </section>
  );
}

export default Employees;
