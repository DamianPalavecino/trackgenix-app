import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Projects from 'Components/Projects';
import ProjectForm from 'Components/Projects/Form';
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
const Project = () => {
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/projects'} component={Projects} />
        <Route exact path={'/projects/:id/employees'} component={Projects} />
        <Route exact path={'/projects/:id/assign'} component={Projects} />
        <Route exact path={'/projects/delete/:id'} component={Projects} />
        <Route exact path={'/projects/form'} component={ProjectForm} />
        <Route exact path={'/projects/form/:id'} component={ProjectForm} />
      </Switch>
    </Layout>
  );
};

export default Project;
