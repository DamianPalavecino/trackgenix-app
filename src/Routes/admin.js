import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees/';
import EmployeesForm from 'Components/Employees/Form';
import Projects from 'Components/Projects';
import ProjectsForm from 'Components/Projects/Form';
import Tasks from 'Components/Tasks';
import TaskForm from 'Components/Tasks/Form';
import ProjectForm from 'Components/Projects/Form';
import TimeSheets from 'Components/TimeSheets';
import TimeSheetsForm from 'Components/TimeSheets/Form';
import Layout from 'Components/Layout';

const Admin = () => {
  const routes = [
    {
      name: 'Employees',
      path: '/admin/employees'
    },
    {
      name: 'Projects',
      path: '/admin/projects'
    },
    {
      name: 'Tasks',
      path: '/admin/tasks'
    },
    {
      name: 'TimeSheets',
      path: '/admin/timesheets'
    }
  ];
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/admin/employees'} component={Employees} />
        <Route exact path={'/admin/projects'} component={Projects} />
        <Route exact path={'/admin/projects/form'} component={ProjectsForm} />
        <Route exact path={'/admin/tasks'} component={Tasks} />
        <Route exact path={'/admin/tasks/form'} component={TaskForm} />
        <Route exact path={'/admin/tasks/delete/:id'} component={Tasks} />
        <Route exact path={'/admin/tasks/form/:id'} component={TaskForm} />
        <Route exact path={'/admin/timesheets'} component={TimeSheets} />
        <Route exact path={'/admin/timesheets/form'} component={TimeSheetsForm} />
        <Route exact path={'/admin/timesheets/delete/:id'} component={TimeSheets} />
        <Route exact path={'/admin/timesheets/form/:id'} component={TimeSheetsForm} />
        <Route exact path={'/admin/projects/:id/employees'} component={Projects} />
        <Route exact path={'/admin/projects/delete/:id'} component={Projects} />
        <Route exact path={'/admin/projects/form/:id'} component={ProjectForm} />
        <Route exact path={'/admin/employees/form/:id'} component={EmployeesForm} />
        <Route exact path={'/admin/employees/:id/projects'} component={Employees} />
        <Route exact path={'/admin/employees/delete/:id'} component={Employees} />
        <Route exact path={'/admin/employees/form'} component={EmployeesForm} />
        <Route exact path={'/admin/employees/form/:id'} component={EmployeesForm} />
      </Switch>
    </Layout>
  );
};

export default Admin;
