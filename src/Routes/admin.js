import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from 'Components/Admins';
import AdminsForm from 'Components/Admins/form';
import ProjectForm from 'Components/Projects/projectForm';
import EmployeesForm from 'Components/Employees/Form';

const Admin = () => {
  return (
    <Switch>
      <Route exact path={'/admins'} component={Admins} />
      <Route exact path={'/admins/form'} component={AdminsForm} />
      <Route path={'/admins/delete/employees/:id'} component={Admins} />
      <Route path={'/admins/delete/projects/:id'} component={Admins} />
      <Route path={'/projects/form/:id'} component={ProjectForm} />
      <Route path={'/employees/form/:id'} component={EmployeesForm} />
    </Switch>
  );
};

export default Admin;
