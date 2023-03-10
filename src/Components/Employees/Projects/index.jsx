import styles from './projects.module.css';
import { useEffect } from 'react';
import { Table, Spinner } from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getByIdEmployees } from 'redux/employees/thunks';

const EmployeeProjects = () => {
  const history = useHistory();
  const { list: employee, isPending } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getByIdEmployees(id));
  }, []);

  const editRow = (id) => {
    history.push(`/employee/projects/edit/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>Current Projects</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <Table
          headers={[
            'name',
            'role',
            'startDate',
            'endDate',
            'description',
            'clientName',
            'status',
            'action'
          ]}
          data={employee?.projects}
          editItem={editRow}
        />
      )}
    </div>
  );
};

export default EmployeeProjects;
