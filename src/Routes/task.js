import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tasks from 'Components/Tasks';
import TasksForm from 'Components/Tasks/form';

const Task = () => {
  return (
    <Switch>
      <Route exact path={'/tasks'} component={Tasks} />
      <Route exact path={'/tasks/delete/:id'} component={Tasks} />
      <Route exact path={'/tasks/form'} component={TasksForm} />
      <Route exact path={'/tasks/form/:id'} component={TasksForm} />
    </Switch>
  );
};

export default Task;
