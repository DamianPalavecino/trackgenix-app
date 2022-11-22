import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees';
import EmployeesForm from 'Components/Employees/Form';
import EmployeesHome from 'Components/Employees/Home';
import EmployeeTimeSheets from 'Components/Employees/Timesheets';
import EmployeeProfile from 'Components/Employees/Profile';

const Employee = () => {
  return (
    <Switch>
      <Route exact path={'/employees'} component={Employees} />
      <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
      <Route exact path={'/employees/:id/projects'} component={Employees} />
      <Route exact path={'/employees/delete/:id'} component={Employees} />
      <Route exact path={'/employees/form'} component={EmployeesForm} />
      <Route exact path={'/employees/form/:id'} component={EmployeesForm} />
      <Route exact path={'/employees/home'} component={EmployeesHome} />
      <Route exact path={'/employees/timesheets'} component={EmployeeTimeSheets} />
      <Route exact path={'/employees/profile'} component={EmployeeProfile} />
    </Switch>
  );
};

export default Employee;
