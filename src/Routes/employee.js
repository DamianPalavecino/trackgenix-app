import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees';
import EmployeesForm from 'Components/Employees/Form';
import EmployeesHome from 'Components/Employees/Home';
import EmployeeTimeSheets from 'Components/Employees/Timesheets';
import EmployeeProfile from 'Components/Employees/Profile';
import AddTimesheet from 'Components/Employees/Timesheets/AddTimesheet';
import Layout from 'Components/Layout';

const id = '637e713b92952900f601204e';
const routes = [
  {
    name: 'Projects',
    path: `/employees/${id}/projects`
  },
  {
    name: 'Profile',
    path: `/employees/profile/${id}`
  },
  {
    name: 'Timesheets',
    path: `/employees/timesheets/${id}`
  },
  {
    name: 'Main home',
    path: '/'
  }
];
const Employee = () => {
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/employees'} component={Employees} />
        <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
        <Route exact path={'/employees/:id/projects'} component={Employees} />
        <Route exact path={'/employees/delete/:id'} component={Employees} />
        <Route exact path={'/employees/form'} component={EmployeesForm} />
        <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
        <Route exact path={'/employees/home/:id'} component={EmployeesHome} />
        <Route exact path={'/employees/timesheets/:id'} component={EmployeeTimeSheets} />
        <Route exact path={'/employees/timesheets/:id/create'} component={AddTimesheet} />
        <Route exact path={'/employees/profile/:id'} component={EmployeeProfile} />
      </Switch>
    </Layout>
  );
};

export default Employee;
