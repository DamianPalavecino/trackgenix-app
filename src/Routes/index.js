import Home from 'Components/Home/index';
import HomeEmployee from 'Components/Employees/Home';
import styles from 'Components/Layout/layout.module.css';
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Spinner } from 'Components/Shared';
import { tokenListener } from 'helpers/firebase';
import PrivateRoute from './privateRoute';

const Admins = lazy(() => import('./admin'));
const SuperAdmins = lazy(() => import('./super-admin'));
const Employees = lazy(() => import('./employee'));
const TimeSheets = lazy(() => import('./timesheet'));
const Tasks = lazy(() => import('./task'));
const Projects = lazy(() => import('./project'));
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
            <PrivateRoute path="/admins" role="SUPER_ADMIN" component={Admins} />
            <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdmins} />
            <PrivateRoute path="/projects" role="EMPLOYEE" component={Projects} />
            <PrivateRoute path="/employees" role="ADMIN" component={Employees} />
            <PrivateRoute path="/employee" role="EMPLOYEE" component={HomeEmployee} />
            <PrivateRoute path="/tasks" role="EMPLOYEE" component={Tasks} />
            <PrivateRoute path="/time-sheets" role="EMPLOYEE" component={TimeSheets} />
            <Route path="/auth" component={AuthRoutes} />
            <Redirect to="/auth" component={AuthRoutes} />
          </Switch>
        </Router>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
