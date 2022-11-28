import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tasks from 'Components/Tasks';
import TasksForm from 'Components/Tasks/Form';
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
const Task = () => {
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/tasks'} component={Tasks} />
        <Route exact path={'/tasks/delete/:id'} component={Tasks} />
        <Route exact path={'/tasks/form'} component={TasksForm} />
        <Route exact path={'/tasks/form/:id'} component={TasksForm} />
      </Switch>
    </Layout>
  );
};

export default Task;
