import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins';
import SuperAdminForm from 'Components/SuperAdmins/Form';
import Layout from 'Components/Layout';

const SuperAdmin = () => {
  const routes = [
    {
      name: 'Super admins',
      path: '/super-admins'
    }
  ];
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/super-admins'} component={SuperAdmins} />
        <Route exact path={'/super-admins/delete/:id'} component={SuperAdmins} />
        <Route exact path={'/super-admins/form'} component={SuperAdminForm} />
        <Route exact path={'/super-admins/form/:id'} component={SuperAdminForm} />
      </Switch>
    </Layout>
  );
};

export default SuperAdmin;
