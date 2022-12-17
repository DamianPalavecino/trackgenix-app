import { Switch, Route } from 'react-router-dom';
import EmployeeProjects from 'Components/Employees/Projects';
import EmployeeTimeSheets from 'Components/Employees/Timesheets';
import EmployeeProfile from 'Components/Employees/Profile';
import EmployeeHome from 'Components/Employees/Home';
import AddTimesheet from 'Components/Employees/Timesheets/AddTimesheet';
import Tasks from 'Components/Tasks';
import TasksForm from 'Components/Tasks/Form';
import Layout from 'Components/Layout';
import { useSelector } from 'react-redux';

const LoggedEmployee = () => {
  const { data } = useSelector((store) => {
    return store.auth;
  });
  const projectManagerRoutes = [
    {
      name: 'Projects',
      path: `/employee/home/${data?._id}`
    },
    {
      name: 'Timesheets',
      path: `/employee/timesheets/${data?._id}`
    },
    {
      name: 'Edit Profile',
      path: `/employee/profile/${data?._id}`
    },
    {
      name: 'Tasks',
      path: `/employee/tasks`
    }
  ];

  const employeeRoutes = [
    {
      name: 'Projects',
      path: `/employee/home/${data?._id}`
    },
    {
      name: 'Timesheets',
      path: `/employee/timesheets/${data?._id}`
    },
    {
      name: 'Edit Profile',
      path: `/employee/profile/${data?._id}`
    }
  ];
  return (
    <Layout routes={data?.isProjectManager ? projectManagerRoutes : employeeRoutes}>
      <Switch>
        <Route exact path={'/employee/home'} component={EmployeeHome} />
        <Route exact path={'/employee/home/:id'} component={EmployeeProjects} />
        <Route exact path={'/employee/timesheets/:id'} component={EmployeeTimeSheets} />
        <Route exact path={'/employee/timesheets/:id/create'} component={AddTimesheet} />
        <Route exact path={'/employee/profile/:id'} component={EmployeeProfile} />
        {data?.isProjectManager && (
          <Switch>
            <Route exact path={'/employee/tasks'} component={Tasks} />
            <Route exact path={'/employee/tasks/delete/:id'} component={Tasks} />
            <Route exact path={'/employee/tasks/form'} component={TasksForm} />
            <Route exact path={'/employee/tasks/form/:id'} component={TasksForm} />
          </Switch>
        )}
        ;
      </Switch>
    </Layout>
  );
};

export default LoggedEmployee;
