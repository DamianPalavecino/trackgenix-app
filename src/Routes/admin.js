import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins';
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
    name: 'Logout',
    path: '/admins'
  }
];
const Admin = () => {
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/admins'} component={SuperAdmins} />
        <Route exact path={'/admins/form'} component={AdminsForm} />
        <Route exact path={'/admins/delete/employees/:id'} component={SuperAdmins} />
        <Route exact path={'/admins/delete/projects/:id'} component={SuperAdmins} />
        <Route exact path={'/projects/form/:id'} component={ProjectForm} />
        <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
      </Switch>
    </Layout>
  );
};

export default Admin;
