import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import ProjectForm from '../Projects/projectForm';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';
import SuperAdminForm from '../SuperAdmins/Form/Form';
import TasksForm from '../Tasks/form';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdmins />;
      break;
    case '/super-admins/form':
      currentScreen = <SuperAdminForm />;
      break;
    case '/employees':
      currentScreen = <Employees />;
      break;
    case '/projects':
      currentScreen = <Projects />;
      break;
    case '/projects/form':
      currentScreen = <ProjectForm />;
      break;
    case '/time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case '/tasks':
      currentScreen = <Tasks />;
      break;
    case '/tasks/form':
      currentScreen = <TasksForm />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
