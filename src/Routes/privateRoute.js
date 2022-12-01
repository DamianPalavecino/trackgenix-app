import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isPending, role, authenticated } = useSelector((store) => {
    return store.auth;
  });

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isPending) {
          return <></>;
        }
        if (rest.role.includes(role?.role)) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={authenticated ? '/' : '/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
