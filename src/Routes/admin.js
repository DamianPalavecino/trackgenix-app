import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employees from 'Components/Employees/';
import Projects from 'Components/Projects';
import ProjectsForm from 'Components/Projects/Form';
import ProjectForm from 'Components/Projects/Form';
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
    }
  ];
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/admin/employees'} component={Employees} />
        <Route exact path={'/admin/projects'} component={Projects} />
        <Route exact path={'/admin/projects/form'} component={ProjectsForm} />
        <Route exact path={'/admin/projects/:id/employees'} component={Projects} />
        <Route exact path={'/admin/projects/delete/:id'} component={Projects} />
        <Route exact path={'/admin/projects/:id/assign'} component={Projects} />
        <Route exact path={'/admin/projects/form/:id'} component={ProjectForm} />
        <Route exact path={'/admin/employees/:id/projects'} component={Employees} />
      </Switch>
    </Layout>
  );
};

export default Admin;
