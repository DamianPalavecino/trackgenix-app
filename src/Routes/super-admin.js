import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins';
import SuperAdminForm from 'Components/SuperAdmins/Form';
import Layout from 'Components/Layout';
const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Admins',
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
const SuperAdmin = () => {
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/super-admins'} component={SuperAdmins} />
        <Route exact path={'/super-admins/delete/:id'} component={SuperAdmins} />
        <Route exact path={'/super-admins/form'} component={SuperAdminForm} />
        <Route exact path={'/super-admins/form/:id'} component={SuperAdminForm} />
      </Switch>
    </Layout>
  );
};

export default SuperAdmin;
