import React from 'react';
import styles from 'Components/Layout/layout.module.css';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from 'Components/Shared';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { isPending, role, authenticated } = useSelector((store) => store.auth);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isPending) {
          return (
            <div className={styles.loading}>
              <Spinner />
            </div>
          );
        }
        console.log(rest.role);
        console.log(role);
        console.log(rest.role.includes(role));
        if (rest.role.includes(role)) {
          return <RouteComponent {...routeProps} />;
        }
        return <Redirect to={authenticated ? '/' : '/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
