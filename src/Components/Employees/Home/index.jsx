import { useEffect, useState } from 'react';
import styles from './home.module.css';
import { Table, Spinner } from 'Components/Shared';
import { getByIdEmployees } from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const HomeEmployees = () => {
  // const history = useHistory();
  const { id } = useParams();
  const [employeeProjects, saveProjects] = useState([]);
  const dispatch = useDispatch();
  const { list: employee, isPending } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getByIdEmployees(id));
  }, []);

  useEffect(() => {
    saveProjects(employee?.projects);
  }, [employee]);

  return (
    <div className={styles.container}>
      <h2>Current Projects</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <Table
          headers={['name', 'startDate', 'endDate', 'description', 'clientName']}
          data={employeeProjects}
        />
      )}
    </div>
  );
};

export default HomeEmployees;
