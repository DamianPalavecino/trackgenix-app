import { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'Components/Shared';
import styles from './timeSheets.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets } from 'redux/timesheets/thunks';
import { getByIdEmployees } from 'redux/employees/thunks';
import { useHistory, useParams } from 'react-router-dom';

const Timesheets = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [projects, saveProjects] = useState([]);
  const [employeeTimesheets, saveTimesheets] = useState([]);
  const { list: timesheetsList, isPending } = useSelector((state) => state.timeSheets);
  const { list: employee } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getByIdEmployees(id));
    dispatch(getTimesheets());
  }, []);

  useEffect(() => {
    saveProjects(employee?.projects?.map((project) => project._id));
  }, [employee]);

  useEffect(() => {
    saveTimesheets(
      timesheetsList?.filter((timesheet) => projects?.includes(timesheet?.project?._id))
    );
  }, [timesheetsList]);

  return (
    <div className={styles.container}>
      <h2>List of your Timesheets</h2>
      <Button
        text="Add Timesheet +"
        variant="addButton"
        onClick={() => history.push(`/employee/timesheets/${id}/create`)}
      />
      {isPending ? (
        <Spinner entity="Timesheets" />
      ) : (
        <Table
          headers={['date', 'description', 'hours', 'project', 'task']}
          data={employeeTimesheets}
        />
      )}
    </div>
  );
};

export default Timesheets;
