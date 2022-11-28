import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TimeSheets from 'Components/TimeSheets';
import TimeSheetsForm from 'Components/TimeSheets/Form';
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
const TimeSheet = () => {
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/time-sheets'} component={TimeSheets} />
        <Route exact path={'/time-sheets/delete/:id'} component={TimeSheets} />
        <Route exact path={'/time-sheets/form'} component={TimeSheetsForm} />
        <Route exact path={'/time-sheets/form/:id'} component={TimeSheetsForm} />
      </Switch>
    </Layout>
  );
};

export default TimeSheet;
