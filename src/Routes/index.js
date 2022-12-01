import Home from 'Components/Home/index';
import styles from 'Components/Layout/layout.module.css';
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Spinner } from 'Components/Shared';
import { tokenListener } from 'helpers/firebase';
import PrivateRoute from './privateRoute';

const SuperAdmins = lazy(() => import('./super-admin'));
const Admins = lazy(() => import('./admin'));
// const Employees = lazy(() => import('./employees'));
const LoggedEmployee = lazy(() => import('./employee'));
// const TimeSheets = lazy(() => import('./timesheet'));
// const Tasks = lazy(() => import('./task'));
// const Projects = lazy(() => import('./project'));
const AuthRoutes = lazy(() => import('./auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);
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
            <Route exact path={'/'} component={Home} />
            <PrivateRoute path="/super-admins" role={['SUPER_ADMIN']} component={SuperAdmins} />
            {/* <PrivateRoute path="/projects" role={['ADMIN', 'SUPER_ADMIN']} component={Projects} /> */}
            <PrivateRoute path="/admin" role={['ADMIN', 'SUPER_ADMIN']} component={Admins} />
            <PrivateRoute
              path="/employee"
              role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
              component={LoggedEmployee}
            />
            {/* <PrivateRoute
              path="/tasks"
              role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
              component={Tasks}
            />
            <PrivateRoute
              path="/time-sheets"
              role={['EMPLOYEE', 'ADMIN', 'SUPER_ADMIN']}
              component={TimeSheets}
            /> */}
            <Route path="/auth" component={AuthRoutes} />
            <Redirect to="/auth" component={AuthRoutes} />
          </Switch>
        </Router>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
