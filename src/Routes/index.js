import Header from 'Components/Header/index';
import Sidebar from 'Components/Sidebar/index';
import Footer from 'Components/Footer/index';
import Home from 'Components/Home/index';
import styles from 'Components/Layout/layout.module.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spinner } from 'Components/Shared';
import EmployeeSidebar from 'Components/Employees/Sidebar';

const Admins = lazy(() => import('./admin'));
const SuperAdmins = lazy(() => import('./super-admin'));
const Employees = lazy(() => import('./employee'));
const TimeSheets = lazy(() => import('./timesheet'));
const Tasks = lazy(() => import('./task'));
const Projects = lazy(() => import('./project'));

const Layout = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <div className={styles.container}>
          <div className={styles.head}>
            <Header />
            <Sidebar />
          </div>
          <div className={styles.main}>
            <div className={styles.side}>
              <EmployeeSidebar />
            </div>
            <div className={styles.content}>
              <Switch>
                <Route exact path={'/'} component={Home} />
                <Route path="/admins" component={Admins} />
                <Route path="/super-admins" component={SuperAdmins} />
                <Route path="/projects" component={Projects} />
                <Route path="/employees" component={Employees} />
                <Route path="/tasks" component={Tasks} />
                <Route path={'/time-sheets'} component={TimeSheets} />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
          <div className={styles.foot}>
            <Footer />
          </div>
        </div>
      </Router>
    </Suspense>
  );
};

export default Layout;
