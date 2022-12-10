import Home from 'Components/Home/index';
import styles from 'Components/Layout/layout.module.css';
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Spinner } from 'Components/Shared';
import { tokenListener } from 'helpers/firebase';
import PrivateRoute from './privateRoute';
import { useSelector } from 'react-redux';

const SuperAdmins = lazy(() => import('./super-admin'));
const Admins = lazy(() => import('./admin'));
const LoggedEmployee = lazy(() => import('./employee'));
const AuthRoutes = lazy(() => import('./auth'));

const Routes = () => {
  const { authenticated } = useSelector((state) => state.auth);
  useEffect(() => tokenListener(), []);
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className={styles.loading}>
            <Spinner />
          </div>
        }
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/super-admins" role={['SUPER_ADMIN']} component={SuperAdmins} />
            <PrivateRoute path="/admin" role={['ADMIN', 'SUPER_ADMIN']} component={Admins} />
            <PrivateRoute
              path="/employee"
              role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
              component={LoggedEmployee}
            />
            {!authenticated && <Route path="/auth" component={AuthRoutes} />}
            <Redirect to="/" component={Home} />
          </Switch>
        </Router>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
