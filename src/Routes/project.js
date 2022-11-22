import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Projects from 'Components/Projects';
import ProjectForm from 'Components/Projects/Form';

const Project = () => {
  return (
    <Switch>
      <Route exact path={'/projects'} component={Projects} />
      <Route exact path={'/projects/:id/employees'} component={Projects} />
      <Route exact path={'/projects/delete/:id'} component={Projects} />
      <Route exact path={'/projects/form'} component={ProjectForm} />
      <Route exact path={'/projects/form/:id'} component={ProjectForm} />
    </Switch>
  );
};

export default Project;
