import { Button } from 'Components/Shared/';
import styles from './home.module.css';
import { useHistory } from 'react-router-dom';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Admins',
    path: '/admins'
  },
  {
    name: 'Timesheets',
    path: '/time-sheets'
  },
  {
    name: 'Tasks',
    path: '/tasks'
  },
  {
    name: 'Employees',
    path: '/employees'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
  {
    name: 'Super admins',
    path: '/super-admins'
  }
];

function Home() {
  const history = useHistory();
  const employeeId = '637e713b92952900f601204e';
  return (
    <Layout routes={routes}>
      <section className={styles.container}>
        <h2>Home</h2>
        <Button
          text="Go to employee home"
          variant="addButton"
          onClick={() => history.push(`/employees/home/${employeeId}`)}
        />
      </section>
    </Layout>
  );
}

export default Home;
