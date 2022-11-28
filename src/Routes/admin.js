import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from 'Components/Admins';
import AdminsForm from 'Components/Admins/form';
import ProjectForm from 'Components/Projects/Form';
import EmployeesForm from 'Components/Employees/Form';
import Layout from 'Components/Layout';
const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Admis',
    path: '/admins'
  },
  {
    name: 'Timesheets',
    path: '/time-sheets'
  },
  {
    name: 'Tasks',
    path: '/tasks'
  },
  {
    name: 'Employees',
    path: '/employees'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
  {
    name: 'Super admins',
    path: '/super-admins'
  }
];
const Admin = () => {
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/admins'} component={Admins} />
        <Route exact path={'/admins/form'} component={AdminsForm} />
        <Route path={'/admins/delete/employees/:id'} component={Admins} />
        <Route path={'/admins/delete/projects/:id'} component={Admins} />
        <Route path={'/projects/form/:id'} component={ProjectForm} />
        <Route path={'/employees/form/:id'} component={EmployeesForm} />
      </Switch>
    </Layout>
  );
};

export default Admin;
