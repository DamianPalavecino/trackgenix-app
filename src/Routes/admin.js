import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from 'Components/Admins';
import AdminsForm from 'Components/Admins/form';

const Admin = () => {
  return (
    <Switch>
      <Route exact path={'/admins'} component={Admins} />
      <Route exact path={'/admins/form'} component={AdminsForm} />
      <Route exact path={'/admins/delete/:id'} component={Admins} />
    </Switch>
  );
};

export default Admin;
